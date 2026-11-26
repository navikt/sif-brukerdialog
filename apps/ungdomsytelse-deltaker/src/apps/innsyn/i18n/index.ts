import { sifSoknadUiMessages } from '@sif/soknad-ui/i18n';
import { ungInnsynMessages } from '@sif/ung-innsyn/i18n';

import { innsynMessages_nb } from './messages/nb';
import { innsynMessages_nn } from './messages/nn';

const nb = {
    ...sifSoknadUiMessages.nb,
    ...ungInnsynMessages.nb,
    ...innsynMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
    ...sifSoknadUiMessages.nn,
    ...ungInnsynMessages.nn,
    ...innsynMessages_nn,
};
export const innsynMessages = {
    nb,
    nn,
};
