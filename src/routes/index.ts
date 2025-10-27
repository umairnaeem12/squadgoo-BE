import { Router } from 'express';
import UserAuthRouter from './auth.routes';

const AppRouter = Router();
AppRouter.get('/', (req, res) => {
    res.send('Hit App route');
});

AppRouter.use('/auth', UserAuthRouter);

export default AppRouter;
