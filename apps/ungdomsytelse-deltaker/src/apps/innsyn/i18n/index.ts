import { avvikRegisterinntektMessages_nb } from '../modules/oppgaver/avvik-registerinntekt/i18n/nb';
import { endretSluttdatoMessages_nb } from '../modules/oppgaver/endret-sluttdato/i18n/nb';
import { endretStartdatoMessages_nb } from '../modules/oppgaver/endret-startdato/i18n/nb';
import { fjernetPeriodeMessages_nb } from '../modules/oppgaver/fjernet-periode/i18n/nb';
import { meldtUtMessages_nb } from '../modules/oppgaver/meldt-ut/i18n/nb';
import { rapporterInntektMessages_nb } from '../modules/oppgaver/rapporter-inntekt/i18n/nb';
import { søkYtelseOppgaveMessages_nb } from '../modules/oppgaver/søk-ytelse/i18n/nb';
import { innsynMessages_nb } from './messages/nb';
import { innsynMessages_nn } from './messages/nn';

const nb = {
    ...innsynMessages_nb,
    ...endretSluttdatoMessages_nb,
    ...endretStartdatoMessages_nb,
    ...meldtUtMessages_nb,
    ...fjernetPeriodeMessages_nb,
    ...søkYtelseOppgaveMessages_nb,
    ...avvikRegisterinntektMessages_nb,
    ...rapporterInntektMessages_nb,
};

const nn: Record<keyof typeof nb, string> = {
    ...nb,
    ...innsynMessages_nn,
};
export const innsynMessages = {
    nb,
    nn,
};
