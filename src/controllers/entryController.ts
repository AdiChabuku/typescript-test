// src/controllers/entryController.ts
import { Request, Response } from 'express';
import * as entryService from '../services/entryService';

export const createEntry = (req: Request, res: Response) => {
  try {
    const entry = entryService.createEntry(req.body);
    res.status(201).json(entry);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getEntries = (req: Request, res: Response) => {
  const query = {
    ownerId: req.query.ownerId as string,
    schema: req.query.schema as string,
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 10,
  };
  const { entries, total } = entryService.getAllEntries(query);
  res.json({ entries, total, page: query.page, limit: query.limit });
};

export const getEntryById = (req: Request, res: Response) => {
  try {
    const entry = entryService.getEntry(req.params.id);
    res.json(entry);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateEntry = (req: Request, res: Response) => {
  try {
    const entry = entryService.updateEntryById(req.params.id, req.body);
    res.json(entry);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};