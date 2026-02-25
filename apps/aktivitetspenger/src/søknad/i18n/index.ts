import { soknadMessages_nb } from './messages/nb';
import { soknadMessages_nn } from './messages/nn';

const nb = {
    ...soknadMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...soknadMessages_nn,
};
export const ungSoknadMessages = {
    nb,
    nn,
};
