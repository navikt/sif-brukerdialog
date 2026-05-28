import { automatiskOpphorMessages_nb } from '../modules/oppgavepaneler/opphor-ved-maksdato/i18n/nb';
import { avvikRegisterinntektMessages_nb } from '../modules/oppgavepaneler/avvik-registerinntekt/i18n/nb';
import { bostedVilkårMessages_nb } from '../modules/oppgavepaneler/bostedsvilkar/i18n/nb';
import { endretSluttdatoMessages_nb } from '../modules/oppgavepaneler/endret-sluttdato/i18n/nb';
import { endretStartOgSluttdatoMessages_nb } from '../modules/oppgavepaneler/endret-start-og-sluttdato/i18n/nb';
import { endretStartdatoMessages_nb } from '../modules/oppgavepaneler/endret-startdato/i18n/nb';
import { fjernetPeriodeMessages_nb } from '../modules/oppgavepaneler/fjernet-periode/i18n/nb';
import { meldtUtMessages_nb } from '../modules/oppgavepaneler/meldt-ut/i18n/nb';
import { rapporterInntektMessages_nb } from '../modules/oppgavepaneler/rapporter-inntekt/i18n/nb';
import { søkYtelseOppgaveMessages_nb } from '../modules/oppgavepaneler/sok-ytelse/i18n/nb';

export const ungUi_messages_nb = {
    ...avvikRegisterinntektMessages_nb,
    ...endretStartOgSluttdatoMessages_nb,
    ...endretSluttdatoMessages_nb,
    ...endretStartdatoMessages_nb,
    ...fjernetPeriodeMessages_nb,
    ...meldtUtMessages_nb,
    ...rapporterInntektMessages_nb,
    ...søkYtelseOppgaveMessages_nb,
    ...bostedVilkårMessages_nb,
    ...automatiskOpphorMessages_nb,

    '@ungInnsyn.Ja': 'Ja',
    '@ungInnsyn.Nei': 'Nei',

    '@ungInnsyn.loading': 'Laster...',
    '@ungInnsyn.errorPage': 'Det oppstod en feil',
    '@ungInnsyn.defaultErrorMessage.heading': 'Oops, noe gikk galt',
    '@ungInnsyn.defaultErrorMessage.message': 'Det oppstod en feil. Vennligst prøv igjen senere.',

    '@ungInnsyn.oppgaveStatusInfo.utløptEllerAvbrutt': 'Denne oppgaven gjelder ikke lenger, du trenger ikke gjøre noe.',

    '@ungInnsyn.forsideLenkeButton.tekst': 'Tilbake til oversikten',

    '@ungInnsyn.ytelse.DAGPENGER': 'Dagpenger',
    '@ungInnsyn.ytelse.SYKEPENGER': 'Sykepenger',
    '@ungInnsyn.ytelse.FORELDREPENGER': 'Foreldrepenger',
    '@ungInnsyn.ytelse.OMSORGSPENGER': 'Omsorgspenger',
    '@ungInnsyn.ytelse.PLEIEPENGER': 'Pleiepenger',
    '@ungInnsyn.ytelse.OPPLÆRINGSPENGER': 'Opplæringspenger',
    '@ungInnsyn.ytelse.AAP': 'Arbeidsavklaringspenger',
    '@ungInnsyn.ytelse.ANNET': 'Annet',

    '@ungInnsyn.pageLayout.main.ariaLabel': 'Hovedinnhold',

    '@ungInnsyn.oppgaveIkkeFunnetPage.dokumentTittel': 'Oppgave ikke funnet',
    '@ungInnsyn.oppgaveIkkeFunnetPage.tittel': 'Oppgave ikke funnet',
    '@ungInnsyn.oppgaveIkkeFunnetPage.utenId': 'Vi kunne ikke finne oppgaven - referansen mangler.',
    '@ungInnsyn.oppgaveIkkeFunnetPage.medId': 'Vi kunne ikke finne oppgaven med referanse {oppgaveReferanse}.',

    '@ungInnsyn.oppgaveOgTilbakemelding.header': 'Beskjed og ditt svar',
    '@ungInnsyn.oppgaveOgTilbakemelding.beskjedFraNav': 'Beskjed fra Nav',
    '@ungInnsyn.oppgaveOgTilbakemelding.tilbakemeldingLabel': 'Tilbakemelding',

    '@ungInnsyn.oppgavebekreftelse.ubesvart.tittel': 'Hei {navn}',
    '@ungInnsyn.oppgavebekreftelse.kvittering.tittel': 'Svaret ditt er sendt inn',
    '@ungInnsyn.oppgavebekreftelse.besvart.svarMangler': 'Informasjon om hva du svarte er ikke tilgjengelig enda.',

    '@ungInnsyn.oppgavebekreftelse.oppgavetekst.ariaLabel': 'Oppgaveinformasjon',
    '@ungInnsyn.oppgavebekreftelse.uttalelseform.ariaLabel': 'Svarskjema',

    /** OppgaveMessages */
    '@ungInnsyn.oppgavestatus.LØST': 'Løst',
    '@ungInnsyn.oppgavestatus.ULØST': 'Uløst',
    '@ungInnsyn.oppgavestatus.AVBRUTT': 'Avbrutt',
    '@ungInnsyn.oppgavestatus.UTLØPT': 'Utløpt',
    '@ungInnsyn.oppgavestatus.LUKKET': 'Lukket',

    /** InntektForm */
    '@ungInnsyn.inntektForm.validation.harInntekt.yesOrNoIsUnanswered': 'Du må svare på om du hadde inntekt.',
    '@ungInnsyn.inntektForm.submitLabel': 'Send inn svaret ditt',
    '@ungInnsyn.inntektForm.cancelLabel': 'Avbryt',
    '@ungInnsyn.inntektForm.utbetaltInntektLegend': 'Hadde du inntekt i {måned}?',
    '@ungInnsyn.inntektForm.inntektLabel': 'Hvor mye hadde du i inntekt før skatt?',
    '@ungInnsyn.inntektForm.inntektDescription':
        'Se på lønnsslippen din hva inntekten din var før det ble trukket skatt av den. Du skal ikke ta med ungdomsprogramytelsen som en del av inntekten din. ',

    '@ungInnsyn.inntektForm.hvordanFinnerDuUtInntekt.tittel': 'Hvor finner jeg inntekten min før skatt?',
    '@ungInnsyn.inntektForm.hvordanFinnerDuUtInntektBeskrivelse.tekst.1':
        'Når du jobber og har en inntekt, får du alltid en lønnsslipp fra arbeidsgiveren din. På lønnsslippen står det hva inntekten din er før det blir trukket skatt av den.',
    '@ungInnsyn.inntektForm.hvordanFinnerDuUtInntektBeskrivelse.tekst.2':
        'Spør arbeidsgiveren din hvis du er usikker på hvor du finner lønnsslippen.',

    '@ungInnsyn.inntektForm.feilInntekt.tittel': 'Hva skjer hvis jeg melder inn feil inntekt?',
    '@ungInnsyn.inntektForm.feilInntekt.tekst.1':
        'Vi sjekker alltid hva arbeidsgiveren din har registrert at du fikk i inntekt. Arbeidsgivere registrerer inntekt i et system som heter A-ordningen, og som blant annet Nav og Skatteetaten har tilgang til.',
    '@ungInnsyn.inntektForm.feilInntekt.tekst.2':
        'Hvis det er forskjell på inntekten din i A-ordningen, og inntekten du har sendt inn til oss, får du beskjed om det.',

    '@ungInnsyn.inntektForm.hentUtBeløpFeil':
        'Du har oppgitt at du hadde inntekt, men vi klarer ikke hente ut beløpet. Vennligst kontroller feltet for inntekt og prøv på nytt.',

    '@ungInnsyn.inntektForm.validation.inntekt.numberHasNoValue': 'Du må oppgi hva du hadde i inntekt før skatt',
    '@ungInnsyn.inntektForm.validation.inntekt.numberHasInvalidFormat':
        'Oppgitt inntekt har ikke gyldig format. Et gyldig tall inneholder kun siffer.',
    '@ungInnsyn.inntektForm.validation.inntekt.numberIsTooSmall':
        'Oppgitt inntekt må være mer enn 0. Hvis du ikke hadde inntekt, velger du "Nei" på spørsmålet over.',
    '@ungInnsyn.inntektForm.validation.inntekt.numberHasDecimals': 'Du må oppgi inntekt uten desimaler.',

    /** UtalelseForm */
    '@ungInnsyn.uttalelseForm.submitButtonLabel': 'Send inn svaret ditt',
    '@ungInnsyn.uttalelseForm.cancelButtonLabel': 'Avbryt',
    '@ungInnsyn.uttalelseForm.defaultDescription':
        'Du må ikke oppgi sensitiv informasjon (personopplysninger) om deg selv eller andre, for eksempel helseopplysninger.',

    '@ungInnsyn.uttalelseForm.validation.harUttalelse.yesOrNoIsUnanswered':
        'Du må svare på om du har en tilbakemelding.',
    '@ungInnsyn.uttalelseForm.validation.uttalelse.stringHasNoValue': 'Du må fylle ut tilbakemeldingsfeltet.',
    '@ungInnsyn.uttalelseForm.validation.uttalelse.stringIsTooShort':
        'Du har brukt for få tegn i tilbakemeldingen din. Teksten må minst inneholde {min} tegn.',
    '@ungInnsyn.uttalelseForm.validation.uttalelse.stringIsTooLong':
        'Du har brukt for mange tegn i tilbakemeldingen din. Teksten kan ikke inneholde flere enn {maks} tegn.',
    '@ungInnsyn.uttalelseForm.validation.uttalelse.stringHasInvalidCharacters':
        // eslint-disable-next-line max-len
        'Tilbakemeldingen inneholder ugyldige tegn. Ugyldige tegn kan for eksempel være emojier, spesialtegn som « », §, @, eller skjulte formateringstegn som innrykk, tabulatorer og listeformatering. Dette kan blant annet oppstå dersom tekst kopieres fra andre steder. Du kan prøve å skrive inn teksten på nytt direkte i feltet.',
};
