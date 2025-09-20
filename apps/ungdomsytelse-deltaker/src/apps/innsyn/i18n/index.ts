import { endretSluttdatoMessages_nb } from '../modules/oppgaver/endret-sluttdato/i18n/nb';
import { endretStartdatoMessages_nb } from '../modules/oppgaver/endret-startdato/i18n/nb';
import { søkYtelseOppgaveMessages_nb } from '../modules/oppgaver/søk-ytelse/i18n/nb';
import { innsynMessages_nb } from './messages/nb';
import { innsynMessages_nn } from './messages/nn';

const nb = {
    ...innsynMessages_nb,
    ...endretSluttdatoMessages_nb,
    ...endretStartdatoMessages_nb,
    ...søkYtelseOppgaveMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
    ...innsynMessages_nn,
};
export const innsynMessages = {
    nb,
    nn,
};
