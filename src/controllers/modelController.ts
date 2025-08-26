// src/controllers/modelController.ts
import { Request, Response } from 'express';
import * as modelService from '../services/modelService';

export const createModel = (req: Request, res: Response) => {
  try {
    const model = modelService.createModel(req.body);
    res.status(201).json(model);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getModels = (req: Request, res: Response) => {
  const query = {
    ownerId: req.query.ownerId as string,
    search: req.query.search as string,
    sortBy: req.query.sortBy as 'name' | 'createdAt',
    sortOrder: req.query.sortOrder as 'asc' | 'desc',
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 10,
  };
  const { models, total } = modelService.getAllModels(query);
  res.json({ models, total, page: query.page, limit: query.limit });
};

export const getModelById = (req: Request, res: Response) => {
  try {
    const model = modelService.getModel(req.params.id);
    res.json(model);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateModel = (req: Request, res: Response) => {
  try {
    const model = modelService.updateModelById(req.params.id, req.body);
    res.json(model);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};