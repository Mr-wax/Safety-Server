import express from 'express';
import { createAlert, getAllAlerts } from '../../Controllers/AlertController.js';
import  {protectRoute} from '../../Middlewares/ProtectRoute.js';
import { authorizeRoles } from '../../Middlewares/ProtectRoute.js';

const router = express.Router();

router.post('/createAlert', protectRoute, createAlert);
router.get('/', protectRoute, authorizeRoles('admin','security'), getAllAlerts);

export default router;
