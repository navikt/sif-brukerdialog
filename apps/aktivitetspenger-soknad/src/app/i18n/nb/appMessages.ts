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
    'bostedForm.validation.borITrondheim.yesOrNoIsUnanswered': 'Du må svare på om du bor i Trondheim',
    'bostedUtlandForm.validation.harBoddIUtlandetSiste5år.yesOrNoIsUnanswered':
        'Du må svare på om du har bodd i utlandet de siste 5 årene',
    'bostedUtlandForm.validation.bosteder.listIsEmpty': 'Du må legge til minst ett bosted i utlandet',
    'bostedUtlandForm.validation.bosteder.listHasTooFewItems': 'Du må legge til minst ett bosted i utlandet',
    'kontonummerForm.validation.kontonummerErRiktig.yesOrNoIsUnanswered': 'Du må svare på om kontonummeret stemmer',
    'oppsummeringForm.validation.bekrefterOpplysninger.notChecked': 'Du må bekrefte at opplysningene er riktige',
};
