// src/services/userService.ts
import { v4 as uuidv4 } from 'uuid';
import { User, CreateUserInput, UpdateUserInput } from '../types';
import { getUsers, getUserById, addUser, updateUser } from '../storage';

export const createUser = (input: CreateUserInput): User => {
  if (!input.email || !input.name) {
    throw new Error('Email and name are required');
  }
  if (getUsers().some(u => u.email === input.email)) {
    throw new Error('Email already exists');
  }
  const user: User = {
    id: uuidv4(),
    ...input,
    createdAt: new Date(),
  };
  addUser(user);
  return user;
};

export const getAllUsers = (): User[] => getUsers();

export const getUser = (id: string): User => {
  const user = getUserById(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateUserById = (id: string, input: UpdateUserInput): User => {
  if (input.email && getUsers().some(u => u.email === input.email && u.id !== id)) {
    throw new Error('Email already exists');
  }
  const updated = updateUser(id, input);
  if (!updated) {
    throw new Error('User not found');
  }
  return updated;
};