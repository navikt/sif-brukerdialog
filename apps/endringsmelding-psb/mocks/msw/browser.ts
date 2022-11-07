import { setupWorker, rest } from 'msw';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.msw = {
    worker,
    rest,
};
