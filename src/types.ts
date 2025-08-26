// src/types.ts
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
  }
  
  export interface Field {
    name: string;
    type: 'text' | 'number' | 'boolean' | 'date' | 'email' | 'url' | 'rich-text';
    required: boolean;
  }
  
  export interface ContentModel {
    id: string;
    name: string;
    ownerId: string;
    fields: Field[];
    createdAt: Date;
  }
  
  export interface Entry {
    id: string;
    schema: string;
    ownerId: string;
    data: Record<string, string | number | boolean>;
    createdAt: Date;
  }
  
  export interface CreateUserInput {
    email: string;
    name: string;
  }
  
  export interface UpdateUserInput {
    email?: string;
    name?: string;
  }
  
  export interface CreateModelInput {
    name: string;
    ownerId: string;
    fields: Field[];
  }
  
  export interface UpdateModelInput {
    name?: string;
    fields?: Field[];
  }
  
  export interface CreateEntryInput {
    schema: string;
    ownerId: string;
    data: Record<string, string | number | boolean>;
  }
  
  export interface UpdateEntryInput {
    data?: Record<string, string | number | boolean>;
  }
  
  export interface ModelQueryParams {
    ownerId?: string;
    search?: string;
    sortBy?: 'name' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }
  
  export interface EntryQueryParams {
    ownerId?: string;
    schema?: string;
    page?: number;
    limit?: number;
  }