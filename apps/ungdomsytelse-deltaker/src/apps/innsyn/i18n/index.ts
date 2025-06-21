import { innsynMessages_nb } from './messages/nb';
import { innsynMessages_nn } from './messages/nn';
import { oppgaveMessages } from './oppgaveMessages';

const nb = {
    ...innsynMessages_nb,
    ...oppgaveMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...innsynMessages_nn,
    ...nb,
};
export const innsynMessages = {
    nb,
    nn,
};
