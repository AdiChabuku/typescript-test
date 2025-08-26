// src/services/modelService.ts
import { v4 as uuidv4 } from 'uuid';
import { ContentModel, CreateModelInput, UpdateModelInput, ModelQueryParams, Field } from '../types';
import { getModels, getModelById, addModel, updateModel, getModelsByOwner, getUserById } from '../storage';

// Valid field types to enforce type safety
const VALID_FIELD_TYPES = ['text', 'number', 'boolean', 'date', 'email', 'url', 'rich-text'] as const;

// Validate field types
const validateFields = (fields: Field[]): void => {
  fields.forEach(field => {
    if (!VALID_FIELD_TYPES.includes(field.type)) {
      throw new Error(`Invalid field type: ${field.type}. Must be one of ${VALID_FIELD_TYPES.join(', ')}`);
    }
  });
};

export const createModel = (input: CreateModelInput): ContentModel => {
  if (!input.name || !input.ownerId || !input.fields || input.fields.length === 0) {
    throw new Error('Name, ownerId, and at least one field are required');
  }
  if (!getUserById(input.ownerId)) {
    throw new Error('Owner user not found');
  }
  // Validate field types
  validateFields(input.fields);
  const model: ContentModel = {
    id: uuidv4(),
    ...input,
    createdAt: new Date(),
  };
  addModel(model);
  return model;
};

export const getAllModels = (query: ModelQueryParams): { models: ContentModel[]; total: number } => {
  let filtered = getModels();

  if (query.ownerId) {
    filtered = filtered.filter(m => m.ownerId === query.ownerId);
  }

  if (query.search) {
    const searchLower = query.search.toLowerCase();
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(searchLower) ||
      m.fields.some(f => f.name.toLowerCase().includes(searchLower))
    );
  }

  if (query.sortBy) {
    filtered.sort((a, b) => {
      const key = query.sortBy as keyof ContentModel;
      const valA = a[key];
      const valB = b[key];
      if (valA < valB) return query.sortOrder === 'desc' ? 1 : -1;
      if (valA > valB) return query.sortOrder === 'desc' ? -1 : 1;
      return 0;
    });
  } else {
    filtered.sort((a, b) => a.createdAt < b.createdAt ? -1 : a.createdAt > b.createdAt ? 1 : 0);
  }

  const page = query.page || 1;
  const limit = query.limit || 10;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return { models: paginated, total: filtered.length };
};

export const getModel = (id: string): ContentModel => {
  const model = getModelById(id);
  if (!model) {
    throw new Error('Model not found');
  }
  return model;
};

export const updateModelById = (id: string, input: UpdateModelInput): ContentModel => {
  const existing = getModelById(id);
  if (!existing) {
    throw new Error('Model not found');
  }
  if (input.fields && input.fields.length === 0) {
    throw new Error('At least one field is required');
  }
  if (input.fields) {
    validateFields(input.fields);
  }
  const updated = updateModel(id, input);
  return updated!;
};

export const getModelsByUser = (userId: string): ContentModel[] => {
  if (!getUserById(userId)) {
    throw new Error('User not found');
  }
  return getModelsByOwner(userId);
};