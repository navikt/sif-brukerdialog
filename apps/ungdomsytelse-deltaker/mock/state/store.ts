import { memoryStore } from './memoryStore';
import { localStorageStore } from './localStorageStore';

export const store = typeof window === 'undefined' ? memoryStore : localStorageStore;
