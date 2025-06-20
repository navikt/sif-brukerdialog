import { ungSoknadMessages_nb } from './messages/nb';
import { ungSoknadMessages_nn } from './messages/nn';

const nb = {
    ...ungSoknadMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...ungSoknadMessages_nn,
    ...ungSoknadMessages_nb, // TODO - fjerne når all tekst er oversatt
};
export const ungSoknadMessages = {
    nb,
    nn,
};
