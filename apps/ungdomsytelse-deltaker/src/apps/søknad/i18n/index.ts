import { ungSoknadMessages_nb } from './messages/nb';
import { ungSoknadMessages_nn } from './messages/nn';

const nb = {
    ...ungSoknadMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...ungSoknadMessages_nn,
};
export const ungSoknadMessages = {
    nb,
    nn,
};
