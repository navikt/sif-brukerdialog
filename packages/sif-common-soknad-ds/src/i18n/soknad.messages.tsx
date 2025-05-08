import { FormattedMessage, IntlShape } from 'react-intl';
import { avbrytSøknadDialogMessages } from '../components/avbrytSøknadDialog/avbrytSøknadDialog.messages';
import { fortsettSøknadSenereDialogMessages } from '../components/fortsettSøknadSenereDialog/fortsettSøknadSenereDialog.messages';
import { soknadErrorMessages } from '../components/soknad-error-messages/soknadError.messages';
import { samtykkeFormMessages } from '../modules/samtykke-form/samtykkeForm.messages';
import { typedIntlHelper } from '@navikt/sif-common-core-ds/src/utils/intlUtils';

const nb = {
    'application.title': 'Applikasjonen', // Kun fallback - skal overstyres i hver app
    '@soknad.stepConfig.previousStepLinkText': 'Tilbake til {title}',
    '@soknad.loadingPage.henterInformasjon': 'Henter informasjon',
    '@soknad.stepFooter.avbryt': 'Slett søknaden',
    '@soknad.stepFooter.fortsettSenere': 'Fortsett senere',
    '@soknad.velkommenGuide.tittel': 'Hei, {navn}',
    ...samtykkeFormMessages.nb,
    ...soknadErrorMessages.nb,
    ...avbrytSøknadDialogMessages.nb,
    ...fortsettSøknadSenereDialogMessages.nb,
};

const nn: SoknadMessagesType = {
    'application.title': 'Applikasjonen', // Kun fallback - skal overstyres i hver app
    '@soknad.stepConfig.previousStepLinkText': 'Tilbake til {title}',
    '@soknad.loadingPage.henterInformasjon': 'Hentar informasjon',
    '@soknad.stepFooter.avbryt': 'Slett søknaden',
    '@soknad.stepFooter.fortsettSenere': 'Fortset seinare',
    '@soknad.velkommenGuide.tittel': 'Hei, {navn}',

    ...samtykkeFormMessages.nn,
    ...soknadErrorMessages.nn,
    ...avbrytSøknadDialogMessages.nn,
    ...fortsettSøknadSenereDialogMessages.nn,
};

type SoknadMessageKeys = keyof typeof nb;

export type SoknadMessagesType = Record<SoknadMessageKeys, string>;

export const getSoknadIntl = (intl: IntlShape) => {
    return typedIntlHelper<SoknadMessageKeys>(intl);
};

export const SoknadText = (props: { id: SoknadMessageKeys; values?: any }) => {
    return <FormattedMessage {...props} />;
};

export const soknadMessages = {
    nb,
    nn,
};
