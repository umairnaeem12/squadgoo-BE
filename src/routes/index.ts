import { Router } from 'express';
import AuthRouter from './auth.routes';
import ProfileRouter from './profile.routes';
import JobSeekerProfileRouter from './jobSeekerProfile.routes';

const AppRouter = Router();
AppRouter.get('/', (req, res) => {
    res.send('Hit App route');
});

AppRouter.use('/auth', AuthRouter);
AppRouter.use('/profile', ProfileRouter);
AppRouter.use('/recruiter', JobSeekerProfileRouter);

export default AppRouter;
