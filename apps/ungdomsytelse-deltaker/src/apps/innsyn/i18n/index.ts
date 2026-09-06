import { ungInnsynMessages } from '@sif/ung-innsyn/i18n';

import { innsynMessages_nb } from './messages/nb';
import { innsynMessages_nn } from './messages/nn';

const nb = {
    ...ungInnsynMessages.nb,
    ...innsynMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
    ...ungInnsynMessages.nn,
    ...innsynMessages_nn,
};
export const innsynMessages = {
    nb,
    nn,
};
