import { Router } from 'express';
import sheetController from '../../controller/sheet/sheetController';
const router = Router();

router.get('/sheets/:userID', sheetController.getAllSheet);
router.post('/sheets', sheetController.createNewSheet);
router.delete('/sheets', sheetController.deleteSheetByID);
router.patch('/sheets', sheetController.updateSheetNameByID);

export default router;

