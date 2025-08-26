// src/controllers/userController.ts
import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const createUser = (req: Request, res: Response) => {
  try {
    const user = userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUsers = (req: Request, res: Response) => {
  const users = userService.getAllUsers();
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  try {
    const user = userService.getUser(req.params.id);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateUser = (req: Request, res: Response) => {
  try {
    const user = userService.updateUserById(req.params.id, req.body);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserModels = (req: Request, res: Response) => {
  try {
    const models = require('../services/modelService').getModelsByUser(req.params.id);
    res.json(models);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserEntries = (req: Request, res: Response) => {
  try {
    const entries = require('../services/entryService').getEntriesByUser(req.params.id);
    res.json(entries);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};