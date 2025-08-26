// src/routes/modelRoutes.ts
import { Router } from 'express';
import * as modelController from '../controllers/modelController';

const router = Router();

router.post('/', modelController.createModel);
router.get('/', modelController.getModels);
router.get('/:id', modelController.getModelById);
router.put('/:id', modelController.updateModel);

export default router;