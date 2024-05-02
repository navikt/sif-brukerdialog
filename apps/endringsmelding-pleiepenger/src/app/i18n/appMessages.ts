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

    'arbeidsaktivitetBlockHeader.nyttArbeidsforhold': 'Nytt arbeidsforhold',
    'arbeidsaktivitetBlockHeader.arbeidsgiver.orgnummer': 'Organisasjonsnummer: {orgnr}',
    'arbeidsaktivitetBlockHeader.arbeidsgiver.ansattFom': 'Ansatt: {dato}.',
    'arbeidsaktivitetBlockHeader.arbeidsgiver.ansattTom': ' Sluttdato: {dato}.',

    'ikkeAnsattMelding.tekst':
        'Er du feilregistrert eller du har sluttet i dette arbeidsforholdet før perioden du søkte pleiepenger, må du be arbeidsgiveren om å sende en ny A-melding med sluttdato. Dette gjør de enten via eget lønns- og personalsystem, eller via Altinn.',

    'startPåNyttDialog.tekst.1': 'Du har trykket deg tilbake til startsiden.',
    'startPåNyttDialog.tekst.2': 'Vil du starte utfyllingen på nytt eller fortsette der du var?',

    'tags.kortUke': 'Kort uke',
    'tags.nytt': 'Nytt',
    'tags.endret': 'Endret',

    'aaRegisteret.kort': 'Aa-registeret',
    'aaRegisteret.lang': 'Arbeidsgiver- og arbeidstakerregisteret',

    'arbeidsaktiviteterMedUkjentArbeidsgiver.tittel': 'Avsluttet arbeidsforhold',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.orgnummer': 'Org.nr. {orgnr}',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.aaRegisteret':
        'Du har arbeidsforhold i din pleiepengeperiode som er registrert som avsluttet av arbeidsgiver i <AAregisteret></AAregisteret>. Dette kan være hvis du har sluttet i en jobb, byttet avdeling eller lignende.',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.kanIkkeEndreNoe':
        'Du kan ikke lenger endre arbeidstid for dette arbeidsforholdet.',
    'arbeidsaktiviteterMedUkjentArbeidsgiver.kanIkkeEndreAlle':
        'Du kan ikke lenger endre arbeidstid for {antallUkjente, plural, one {dette arbeidsforholdet} other {disse arbeidsforholdene}}, men du kan fortsatt melde inn endringer for andre arbeidsforhold under.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const appMessages = {
    nb,
    nn,
};
