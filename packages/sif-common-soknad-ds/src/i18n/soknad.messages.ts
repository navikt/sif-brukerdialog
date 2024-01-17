import { avbrytSøknadDialogMessages } from '../components/avbrytSøknadDialog/avbrytSøknadDialog.messages';
import { fortsettSøknadSenereDialogMessages } from '../components/fortsettSøknadSenereDialog/fortsettSøknadSenereDialog.messages';
import soknadErrorMessages from '../components/soknad-error-messages/soknadError.messages';
import { samtykkeFormMessages } from '../modules/samtykke-form/samtykkeForm.messages';

const nb = {
    'application.title': 'Applikasjonen', // Overstyres i hver app
    'scs.tilbakeLenke': 'Tilbake til {title}',
    'scs.loadingPage.henterInformasjon': 'Henter informasjon',
    'scs.steg.footer.avbryt': 'Avbryt og slett søknad',
    'scs.steg.footer.fortsettSenere': 'Avslutt og fortsett senere',
    'scs.jaNeiSvar.Ja': 'ja',
    'scs.jaNeiSvar.Nei': 'nei',
    ...samtykkeFormMessages.nb,
    ...soknadErrorMessages.nb,
    ...avbrytSøknadDialogMessages.nb,
    ...fortsettSøknadSenereDialogMessages.nb,
};

const nn: SoknadMessagesType = {
    'application.title': 'Applikasjonen',
    'scs.tilbakeLenke': 'Tilbake til {title}',
    'scs.loadingPage.henterInformasjon': 'Hentar informasjon',
    'scs.steg.footer.avbryt': 'Avbryt og slett søknad',
    'scs.steg.footer.fortsettSenere': 'Avslutt og fortsett senere',
    'scs.jaNeiSvar.Ja': 'Ja',
    'scs.jaNeiSvar.Nei': 'Nei',
    ...samtykkeFormMessages.nn,
    ...soknadErrorMessages.nn,
    ...avbrytSøknadDialogMessages.nn,
    ...fortsettSøknadSenereDialogMessages.nn,
};

export type SoknadMessageKeys = keyof typeof nb;

export type SoknadMessagesType = Record<SoknadMessageKeys, string>;

export const soknadMessages = {
    nb,
    nn,
};
