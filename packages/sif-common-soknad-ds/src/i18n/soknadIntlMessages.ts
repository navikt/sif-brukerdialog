import { avbrytSøknadDialogMessages } from '../components/avbrytSøknadDialog/avbrytSøknadDialogMessages';
import { fortsettSøknadSenereDialogMessages } from '../components/fortsettSøknadSenereDialog/fortsettSøknadSenereDialogMessages';
import { samtykkeFormMessages } from '../modules/samtykke-form/samtykkeFormMessages';
import soknadErrorIntlMessages from './soknadErrorIntlMessages';

const nb = {
    'application.title': 'Applikasjonen', // Overstyres i hver app
    'scs.tilbakeLenke': 'Tilbake til {title}',
    'scs.loadingPage.henterInformasjon': 'Henter informasjon',
    ...samtykkeFormMessages.nb,
    ...soknadErrorIntlMessages.nb,
    ...avbrytSøknadDialogMessages.nb,
    ...fortsettSøknadSenereDialogMessages.nb,
};

export type SoknadIntlMessageKeys = keyof typeof nb;

export type SoknadIntlMessagesType = Record<SoknadIntlMessageKeys, string>;

const nn: SoknadIntlMessagesType = {
    'application.title': 'Applikasjonen',
    'scs.tilbakeLenke': 'Tilbake til {title}',
    'scs.loadingPage.henterInformasjon': 'Hentar informasjon',
    ...samtykkeFormMessages.nn,
    ...soknadErrorIntlMessages.nn,
    ...avbrytSøknadDialogMessages.nn,
    ...fortsettSøknadSenereDialogMessages.nn,
};

const soknadIntlMessages = {
    nb,
    nn,
};

export default soknadIntlMessages;
