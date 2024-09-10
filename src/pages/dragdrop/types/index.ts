import { UniqueIdentifier } from '@dnd-kit/core';

export interface DDType {
  id: UniqueIdentifier
}

export interface DDCategory<T>{
  value: T;
  label: string;
}