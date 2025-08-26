import { v4 as uuidv4 } from 'uuid';
import { Entry, CreateEntryInput, UpdateEntryInput, EntryQueryParams } from '../types';
import { getEntries, getEntryById, addEntry, updateEntry, getEntriesByOwner, getModelByName, getUserById } from '../storage';

export const createEntry = (input: CreateEntryInput): Entry => {
  if (!input.schema || !input.ownerId || !input.data) {
    throw new Error('Schema, ownerId, and data are required');
  }
  if (!getUserById(input.ownerId)) {
    throw new Error('Owner user not found');
  }
  const model = getModelByName(input.schema);
  if (!model) {
    throw new Error('Schema not found');
  }
  for (const field of model.fields) {
    if (field.required && !(field.name in input.data)) {
      throw new Error(`Missing required field: ${field.name}`);
    }
  }
  const entry: Entry = {
    id: uuidv4(),
    ...input,
    createdAt: new Date(),
  };
  addEntry(entry);
  return entry;
};

export const getAllEntries = (query: EntryQueryParams): { entries: Entry[]; total: number } => {
  let filtered = getEntries();

  if (query.ownerId) {
    filtered = filtered.filter(e => e.ownerId === query.ownerId);
  }

  if (query.schema) {
    filtered = filtered.filter(e => e.schema === query.schema);
  }

  const page = query.page || 1;
  const limit = query.limit || 10;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return { entries: paginated, total: filtered.length };
};

export const getEntry = (id: string): Entry => {
  const entry = getEntryById(id);
  if (!entry) {
    throw new Error('Entry not found');
  }
  return entry;
};

export const updateEntryById = (id: string, input: UpdateEntryInput): Entry => {
  const existing = getEntryById(id);
  if (!existing) {
    throw new Error('Entry not found');
  }
  const model = getModelByName(existing.schema);
  if (!model) {
    throw new Error('Schema not found');
  }
  if (input.data) {
    for (const field of model.fields) {
      if (field.required && !(field.name in input.data)) {
        throw new Error(`Missing required field: ${field.name}`);
      }
    }
  }
  const updated = updateEntry(id, input);
  return updated!;
};

export const getEntriesByUser = (userId: string): Entry[] => {
  if (!getUserById(userId)) {
    throw new Error('User not found');
  }
  return getEntriesByOwner(userId);
};