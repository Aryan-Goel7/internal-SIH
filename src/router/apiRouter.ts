import { Router } from 'express';
import apiController from '../controller/apiController';
import userRouter from './user/userRouter';
import sheetRouter from './sheet/sheetRouter';
const router = Router();

router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health);
router.use(userRouter);
router.use(sheetRouter);
export default router;

