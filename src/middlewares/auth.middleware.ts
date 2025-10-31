import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories";
import { RoleEnum } from "../enums/Role.enums";

interface TokenPayload extends JwtPayload {
  userId: number;
  role: RoleEnum;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: RoleEnum;
      };
    }
  }
}

/**
 * 🔹 Universal authentication middleware
 * Verifies JWT, attaches user to request
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await UserRepository.findOne({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Unauthorized or invalid token" });
  }
};

/**
 * 🔹 Recruiter-only route protection
 */
export const recruiterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  await authMiddleware(req, res, async (authError?: any) => {
    if (authError) return res.status(401).json({ message: "Unauthorized" });

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized. Please login first." });
    }

    if (user.role !== RoleEnum.RECRUITER) {
      return res.status(403).json({ message: "Access denied. Recruiter only route." });
    }

    next();
  });
};

/**
 * 🔹 JobSeeker-only route protection
 */
export const jobSeekerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  await authMiddleware(req, res, async (authError?: any) => {
    if (authError) return res.status(401).json({ message: "Unauthorized" });

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized. Please login first." });
    }

    if (user.role !== RoleEnum.JOBSEEKER) {
      return res.status(403).json({ message: "Access denied. JobSeeker only route." });
    }

    next();
  });
};
