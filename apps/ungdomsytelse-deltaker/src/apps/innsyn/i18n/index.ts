import { innsynMessages_nb } from './messages/nb';
import { innsynMessages_nn } from './messages/nn';

const nb = {
    ...innsynMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...innsynMessages_nn,
};
export const innsynMessages = {
    nb,
    nn,
};
