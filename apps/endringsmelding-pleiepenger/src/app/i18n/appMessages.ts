import { infoNormalarbeidstid } from '../components/info-normalarbeidstid/infoNormalarbeidstid.messages';
import { endreArbeidstidMessages } from '../modules/endre-arbeidstid-form/endreArbeidstidMessages';
import { personalOpplysningerMessages } from '../pages/velkommen/personalopplysninger/personalopplysninger.messages';
import { velkommenPageMessages } from '../pages/velkommen/velkommenPageMessages';
import { arbeidstidStepMessages } from '../søknad/steps/arbeidstid/arbeidstidStepMessages';
import { oppsummeringStepMessages } from '../søknad/steps/oppsummering/oppsummeringStepMessages';
import { ukjentArbeidsforholdFormMessages } from '../søknad/steps/ukjent-arbeidsforhold/ukjentArbeidsforholdFormMessages';
import { samtykkeFormOverrideMessages } from './samtykkeFormOverrideMessages';
import { sifCommonSoknadOverrideMessages } from './sifCommonSoknadOverrideMessages';

const nb = {
    ...arbeidstidStepMessages.nb,
    ...endreArbeidstidMessages.nb,
    ...infoNormalarbeidstid.nb,
    ...personalOpplysningerMessages.nb,
    ...samtykkeFormOverrideMessages.nb,
    ...ukjentArbeidsforholdFormMessages.nb,
    ...velkommenPageMessages.nb,
    ...oppsummeringStepMessages.nb,
    ...sifCommonSoknadOverrideMessages.nb,

    'application.title': 'Endringsmelding for pleiepenger sykt barn',
    'step.ukjentArbeidsforhold.pageTitle': 'Nytt arbeidsforhold',
    'step.ukjentArbeidsforhold.stepTitle': 'Nytt arbeidsforhold',
    'step.aktivitet.stepTitle': 'Velg arbeidsforhold',
    'step.arbeidstid.stepTitle': 'Jobb i pleiepengeperioden',
    'step.lovbestemtFerie.stepTitle': 'Ferie i pleiepengeperioden',
    'step.oppsummering.stepTitle': 'Oppsummering',
    'steg.footer.avbryt': 'Avbryt og slett melding om endring',
    'steg.footer.fortsettSenere': 'Avslutt og fortsett senere',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const appMessages = {
    nb,
    nn,
};
