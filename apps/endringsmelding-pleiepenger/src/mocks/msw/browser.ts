import { setupWorker, rest } from 'msw';
import { getHandlers } from './handlers';

export const worker = setupWorker(...getHandlers());

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.msw = {
    worker,
    rest,
};
