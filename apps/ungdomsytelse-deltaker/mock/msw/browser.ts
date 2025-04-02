import { setupWorker } from 'msw/browser';
import { getHandlers } from './handlers/handlers';

export const worker = setupWorker(...getHandlers());
