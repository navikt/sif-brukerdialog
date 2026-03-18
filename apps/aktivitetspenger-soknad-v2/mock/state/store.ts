import { localStorageStore } from './localStorageStore';
import { memoryStore } from './memoryStore';

export const store = typeof window === 'undefined' ? memoryStore : localStorageStore;
