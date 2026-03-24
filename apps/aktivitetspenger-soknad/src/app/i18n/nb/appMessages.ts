import { velkommenPageMessages_nb } from '../../pages/velkommen/i18n/nb';
import { barnStegMessages_nb } from '../../steps/barn/i18n/nb';
import { startdatoOgAndreYtelserStegMessages_nb } from '../../steps/startdato-og-andre-ytelser/i18n/nb';

export const appMessages_nb = {
    ...barnStegMessages_nb,
    ...startdatoOgAndreYtelserStegMessages_nb,
    ...velkommenPageMessages_nb,
    'application.title': 'Søknad om aktivitetspenger',
    'step.startdatoOgAndreYtelser.title': 'Startdato og andre ytelser',
    'step.kontonummer.title': 'Kontonummer',
    'step.bosted.title': 'Bosted',
    'step.bostedUtland.title': 'Bosted i utlandet',
    'step.barn.title': 'Barn',
    'step.oppsummering.title': 'Oppsummering',
};
