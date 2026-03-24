import { velkommenPageMessages_nb } from '../../pages/velkommen/i18n/nb';
import { barnStegMessages_nb } from '../../steps/barn/i18n/nb';
import { bostedStegMessages_nb } from '../../steps/bosted/i18n/nb';
import { bostedUtlandStegMessages_nb } from '../../steps/bosted-utland/i18n/nb';
import { kontonummerStegMessages_nb } from '../../steps/kontonummer/i18n/nb';
import { oppsummeringStegMessages_nb } from '../../steps/oppsummering/i18n/nb';
import { startdatoOgAndreYtelserStegMessages_nb } from '../../steps/startdato-og-andre-ytelser/i18n/nb';

export const appMessages_nb = {
    ...barnStegMessages_nb,
    ...bostedStegMessages_nb,
    ...bostedUtlandStegMessages_nb,
    ...kontonummerStegMessages_nb,
    ...oppsummeringStegMessages_nb,
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
