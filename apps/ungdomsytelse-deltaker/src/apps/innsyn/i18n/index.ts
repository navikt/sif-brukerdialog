import { ungUiMessages } from '@sif/ung-ui/i18n';

import { innsynMessages_nb } from './messages/nb';
import { innsynMessages_nn } from './messages/nn';

const nb = {
    ...innsynMessages_nb,
    ...ungUiMessages.nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
    ...innsynMessages_nn,
};
export const innsynMessages = {
    nb,
    nn,
};
