// src/storage.ts
import { User, ContentModel, Entry } from './types';

let users: User[] = [];
let models: ContentModel[] = [];
let entries: Entry[] = [];

export const getUsers = (): User[] => users;
export const getUserById = (id: string): User | undefined => users.find(u => u.id === id);
export const addUser = (user: User): void => { users.push(user); };
export const updateUser = (id: string, updates: Partial<User>): User | undefined => {
  const user = getUserById(id);
  if (user) {
    Object.assign(user, updates);
    return user;
  }
  return undefined;
};

export const getModels = (): ContentModel[] => models;
export const getModelById = (id: string): ContentModel | undefined => models.find(m => m.id === id);
export const getModelByName = (name: string): ContentModel | undefined => models.find(m => m.name === name);
export const addModel = (model: ContentModel): void => { models.push(model); };
export const updateModel = (id: string, updates: Partial<ContentModel>): ContentModel | undefined => {
  const model = getModelById(id);
  if (model) {
    Object.assign(model, updates);
    return model;
  }
  return undefined;
};
export const getModelsByOwner = (ownerId: string): ContentModel[] => models.filter(m => m.ownerId === ownerId);

export const getEntries = (): Entry[] => entries;
export const getEntryById = (id: string): Entry | undefined => entries.find(e => e.id === id);
export const addEntry = (entry: Entry): void => { entries.push(entry); };
export const updateEntry = (id: string, updates: Partial<Entry>): Entry | undefined => {
  const entry = getEntryById(id);
  if (entry) {
    Object.assign(entry, updates);
    return entry;
  }
  return undefined;
};
export const getEntriesByOwner = (ownerId: string): Entry[] => entries.filter(e => e.ownerId === ownerId);

export const resetStorage = () => {
  users = [];
  models = [];
  entries = [];
};