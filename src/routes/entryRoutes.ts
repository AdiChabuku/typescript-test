// src/routes/entryRoutes.ts
import { Router } from 'express';
import * as entryController from '../controllers/entryController';

const router = Router();

router.post('/', entryController.createEntry);
router.get('/', entryController.getEntries);
router.get('/:id', entryController.getEntryById);
router.put('/:id', entryController.updateEntry);

export default router;