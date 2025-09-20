import { endretSluttdatoMessages_nb } from '../modules/oppgaver/endret-sluttdato/i18n/nb';
import { innsynMessages_nb } from './messages/nb';
import { innsynMessages_nn } from './messages/nn';

const nb = {
    ...innsynMessages_nb,
    ...endretSluttdatoMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
    ...innsynMessages_nn,
};
export const innsynMessages = {
    nb,
    nn,
};
