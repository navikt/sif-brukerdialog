import { avvikRegisterinntektMessages_nb } from '../modules/oppgaver/avvik-registerinntekt/i18n/nb';
import { endretSluttdatoMessages_nb } from '../modules/oppgaver/endret-sluttdato/i18n/nb';
import { endretStartOgSluttdatoMessages_nb } from '../modules/oppgaver/endret-start-og-sluttdato/i18n/nb';
import { endretStartdatoMessages_nb } from '../modules/oppgaver/endret-startdato/i18n/nb';
import { fjernetPeriodeMessages_nb } from '../modules/oppgaver/fjernet-periode/i18n/nb';
import { meldtUtMessages_nb } from '../modules/oppgaver/meldt-ut/i18n/nb';
import { rapporterInntektMessages_nb } from '../modules/oppgaver/rapporter-inntekt/i18n/nb';
import { søkYtelseOppgaveMessages_nb } from '../modules/oppgaver/sok-ytelse/i18n/nb';

export const ungUi_messages_nb = {
    ...avvikRegisterinntektMessages_nb,
    ...endretStartOgSluttdatoMessages_nb,
    ...endretSluttdatoMessages_nb,
    ...endretStartdatoMessages_nb,
    ...fjernetPeriodeMessages_nb,
    ...meldtUtMessages_nb,
    ...rapporterInntektMessages_nb,
    ...søkYtelseOppgaveMessages_nb,

    '@ungUi.Ja': 'Ja',
    '@ungUi.Nei': 'Nei',

    '@ungUi.oppgaveStatusInfo.utløptEllerAvbrutt': 'Denne oppgaven gjelder ikke lenger, du trenger ikke gjøre noe.',

    '@ungUi.forsideLenkeButton.tekst': 'Tilbake til oversikten',

    '@ungUi.ytelse.DAGPENGER': 'Dagpenger',
    '@ungUi.ytelse.SYKEPENGER': 'Sykepenger',
    '@ungUi.ytelse.FORELDREPENGER': 'Foreldrepenger',
    '@ungUi.ytelse.OMSORGSPENGER': 'Omsorgspenger',
    '@ungUi.ytelse.PLEIEPENGER': 'Pleiepenger',
    '@ungUi.ytelse.OPPLÆRINGSPENGER': 'Opplæringspenger',
    '@ungUi.ytelse.AAP': 'Arbeidsavklaringspenger',
    '@ungUi.ytelse.ANNET': 'Annet',

    '@ungUi.pageLayout.main.ariaLabel': 'Hovedinnhold',

    '@ungUi.oppgaveIkkeFunnetPage.dokumentTittel': 'Oppgave ikke funnet',
    '@ungUi.oppgaveIkkeFunnetPage.tittel': 'Oppgave ikke funnet',
    '@ungUi.oppgaveIkkeFunnetPage.utenId': 'Vi kunne ikke finne oppgaven - referansen mangler.',
    '@ungUi.oppgaveIkkeFunnetPage.medId': 'Vi kunne ikke finne oppgaven med referanse {oppgaveReferanse}.',

    '@ungUi.oppgaveOgTilbakemelding.header': 'Beskjed og ditt svar',
    '@ungUi.oppgaveOgTilbakemelding.beskjedFraNav': 'Beskjed fra Nav',
    '@ungUi.oppgaveOgTilbakemelding.tilbakemeldingLabel': 'Tilbakemelding',

    '@ungUi.oppgavebekreftelse.ubesvart.tittel': 'Hei {navn}',
    '@ungUi.oppgavebekreftelse.kvittering.tittel': 'Svaret ditt er sendt inn',
    '@ungUi.oppgavebekreftelse.besvart.svarMangler': 'Informasjon om hva du svarte er ikke tilgjengelig enda.',

    '@ungUi.oppgavebekreftelse.oppgavetekst.ariaLabel': 'Oppgaveinformasjon',
    '@ungUi.oppgavebekreftelse.uttalelseform.ariaLabel': 'Svarskjema',

    /** OppgaveMessages */
    '@ungUi.oppgavestatus.LØST': 'Løst',
    '@ungUi.oppgavestatus.ULØST': 'Uløst',
    '@ungUi.oppgavestatus.AVBRUTT': 'Avbrutt',
    '@ungUi.oppgavestatus.UTLØPT': 'Utløpt',
    '@ungUi.oppgavestatus.LUKKET': 'Lukket',

    '@ungUi.oppgavetype.BEKREFT_ENDRET_STARTDATO.paneltittel': 'Se og gi tilbakemelding på endret startdato',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_STARTDATO.oppgavetittel': 'Tilbakemelding på endret startdato',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_STARTDATO.info':
        'Veilederen din har endret datoen for når du startet i ungdomsprogrammet.',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_STARTDATO.harTilbakemeldingSpørsmål': 'Har du en tilbakemelding på startdatoen?',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_STARTDATO.harIkkeUttalelseLabel': 'Nei',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_STARTDATO.harUttalelseLabel': 'Ja',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_STARTDATO.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_STARTDATO.kvitteringTekst': 'Du vil om kort tid motta et oppdatert vedtak.',

    '@ungUi.oppgavetype.BEKREFT_MELDT_UT.paneltittel': 'Se og gi tilbakemelding på sluttdato',
    '@ungUi.oppgavetype.BEKREFT_MELDT_UT.oppgavetittel': 'Tilbakemelding på sluttdato',
    '@ungUi.oppgavetype.BEKREFT_MELDT_UT.info':
        'Veilederen din har satt en dato for når du slutter i ungdomsprogrammet.',
    '@ungUi.oppgavetype.BEKREFT_MELDT_UT.harTilbakemeldingSpørsmål': 'Har du en tilbakemelding på sluttdatoen?',
    '@ungUi.oppgavetype.BEKREFT_MELDT_UT.harIkkeUttalelseLabel': 'Nei',
    '@ungUi.oppgavetype.BEKREFT_MELDT_UT.harUttalelseLabel': 'Ja',
    '@ungUi.oppgavetype.BEKREFT_MELDT_UT.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungUi.oppgavetype.BEKREFT_MELDT_UT.kvitteringTekst': 'Du vil om kort tid motta et oppdatert vedtak.',

    '@ungUi.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.paneltittel': 'Se og gi tilbakemelding på endret sluttdato',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.oppgavetittel': 'Tilbakemelding på endret sluttdato',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.info':
        'Veilederen din har endret datoen for når du slutter i ungdomsprogrammet.',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.harTilbakemeldingSpørsmål': 'Har du en tilbakemelding på sluttdatoen?',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.harIkkeUttalelseLabel': 'Nei',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.harUttalelseLabel': 'Ja',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.kvitteringTekst': 'Du vil om kort tid motta et oppdatert vedtak.',

    '@ungUi.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.paneltittel':
        'Se og gi tilbakemelding på ny start- og sluttdato',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.oppgavetittel':
        'Tilbakemelding på ny start- og sluttdato for ungdoms\u00ADprogram\u00ADytelsen',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.info':
        'Veilederen din har endret start- og sluttdatoen din i ungdomsprogrammet.',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.harTilbakemeldingSpørsmål':
        'Har du en tilbakemelding på ny start- og sluttdato?',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.harIkkeUttalelseLabel': 'Nei',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.harUttalelseLabel': 'Ja',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungUi.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.kvitteringTekst':
        'Du vil om kort tid motta et oppdatert vedtak.',

    '@ungUi.oppgavetype.BEKREFT_FJERNET_PERIODE.paneltittel':
        'Se og gi tilbakemelding på stans av ungdoms\u00ADprogram\u00ADytelsen',
    '@ungUi.oppgavetype.BEKREFT_FJERNET_PERIODE.oppgavetittel':
        'Tilbakemelding på stans av ungdoms\u00ADprogram\u00ADytelsen',
    '@ungUi.oppgavetype.BEKREFT_FJERNET_PERIODE.info':
        'Veilederen din har meldt deg ut av ungdomsprogrammet fordi du ikke skal delta i programmet likevel.',
    '@ungUi.oppgavetype.BEKREFT_FJERNET_PERIODE.harTilbakemeldingSpørsmål': 'Har du en tilbakemelding?',
    '@ungUi.oppgavetype.BEKREFT_FJERNET_PERIODE.harIkkeUttalelseLabel': 'Nei',
    '@ungUi.oppgavetype.BEKREFT_FJERNET_PERIODE.harUttalelseLabel': 'Ja',
    '@ungUi.oppgavetype.BEKREFT_FJERNET_PERIODE.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungUi.oppgavetype.BEKREFT_FJERNET_PERIODE.kvitteringTekst': 'Du vil om kort tid motta et oppdatert vedtak.',

    '@ungUi.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.paneltittel': 'Sjekk inntekten din i {månedOgÅr}',
    '@ungUi.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.oppgavetittel': 'Tilbakemelding på inntekt i {månedOgÅr}',
    '@ungUi.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.info':
        'Sjekk at opplysningene våre om inntekten du fikk fra arbeidsgiver i {måned} er riktige. Send oss et svar når du har sjekket.',
    '@ungUi.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.harTilbakemeldingSpørsmål':
        'Stemmer inntekten vi har fått oppgitt?',
    '@ungUi.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.harIkkeUttalelseLabel': 'Ja, inntekten stemmer',
    '@ungUi.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.harUttalelseLabel':
        'Nei, inntekten stemmer ikke. Jeg har en tilbakemelding.',
    '@ungUi.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungUi.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.kvitteringTekst':
        'Vi bruker tilbakemeldingen din når vi vurderer hvor mye penger du skal få i {utbetalingsmåned}. Du får et vedtaksbrev om dette.',

    '@ungUi.oppgavetype.RAPPORTER_INNTEKT.paneltittel': 'Meld fra om du hadde inntekt i {månedOgÅr}',
    '@ungUi.oppgavetype.RAPPORTER_INNTEKT.oppgavetittel': 'Inntekt i {månedOgÅr}',
    '@ungUi.oppgavetype.RAPPORTER_INNTEKT.info': 'Hvis du ikke hadde inntekt, trenger du ikke gjøre noe.',

    '@ungUi.oppgavetype.SØK_YTELSE.paneltittel': 'Søknad for ungdoms\u00ADprogram\u00ADytelsen',
    '@ungUi.oppgavetype.SØK_YTELSE.oppgavetittel': 'Søknad for ungdoms\u00ADprogram\u00ADytelsen',
    '@ungUi.oppgavetype.SØK_YTELSE.info':
        'Du er meldt inn i ungdomsprogrammet. Nå kan du søke om ungdomsprogramytelsen.',

    /** InntektForm */
    '@ungUi.inntektForm.validation.harInntekt.yesOrNoIsUnanswered': 'Du må svare på om du hadde inntekt.',
    '@ungUi.inntektForm.submitLabel': 'Send inn svaret ditt',
    '@ungUi.inntektForm.cancelLabel': 'Avbryt',
    '@ungUi.inntektForm.utbetaltInntektLegend': 'Hadde du inntekt i {måned}?',
    '@ungUi.inntektForm.inntektLabel': 'Hvor mye hadde du i inntekt før skatt?',
    '@ungUi.inntektForm.inntektDescription':
        'Se på lønnsslippen din hva inntekten din var før det ble trukket skatt av den. Du skal ikke ta med ungdomsprogramytelsen som en del av inntekten din. ',

    '@ungUi.inntektForm.hvordanFinnerDuUtInntekt.tittel': 'Hvor finner jeg inntekten min før skatt?',
    '@ungUi.inntektForm.hvordanFinnerDuUtInntektBeskrivelse.tekst.1':
        'Når du jobber og har en inntekt, får du alltid en lønnsslipp fra arbeidsgiveren din. På lønnsslippen står det hva inntekten din er før det blir trukket skatt av den.',
    '@ungUi.inntektForm.hvordanFinnerDuUtInntektBeskrivelse.tekst.2':
        'Spør arbeidsgiveren din hvis du er usikker på hvor du finner lønnsslippen.',

    '@ungUi.inntektForm.feilInntekt.tittel': 'Hva skjer hvis jeg melder inn feil inntekt?',
    '@ungUi.inntektForm.feilInntekt.tekst.1':
        'Vi sjekker alltid hva arbeidsgiveren din har registrert at du fikk i inntekt. Arbeidsgivere registrerer inntekt i et system som heter A-ordningen, og som blant annet Nav og Skatteetaten har tilgang til.',
    '@ungUi.inntektForm.feilInntekt.tekst.2':
        'Hvis det er forskjell på inntekten din i A-ordningen, og inntekten du har sendt inn til oss, får du beskjed om det.',

    '@ungUi.inntektForm.hentUtBeløpFeil':
        'Du har oppgitt at du hadde inntekt, men vi klarer ikke hente ut beløpet. Vennligst kontroller feltet for inntekt og prøv på nytt.',

    '@ungUi.inntektForm.validation.inntekt.numberHasNoValue': 'Du må oppgi hva du hadde i inntekt før skatt',
    '@ungUi.inntektForm.validation.inntekt.numberHasInvalidFormat':
        'Oppgitt inntekt har ikke gyldig format. Et gyldig tall inneholder kun siffer.',
    '@ungUi.inntektForm.validation.inntekt.numberIsTooSmall':
        'Oppgitt inntekt må være mer enn 0. Hvis du ikke hadde inntekt, velger du "Nei" på spørsmålet over.',
    '@ungUi.inntektForm.validation.inntekt.numberHasDecimals': 'Du må oppgi inntekt uten desimaler.',

    /** UtalelseForm */
    '@ungUi.uttalelseForm.submitButtonLabel': 'Send inn svaret ditt',
    '@ungUi.uttalelseForm.cancelButtonLabel': 'Avbryt',
    '@ungUi.uttalelseForm.defaultDescription':
        'Du må ikke oppgi sensitive informasjon (personopplysninger) om deg selv eller andre, for eksempel helseopplysninger.',

    '@ungUi.uttalelseForm.validation.harUttalelse.yesOrNoIsUnanswered': 'Du må svare på om du har en tilbakemelding.',
    '@ungUi.uttalelseForm.validation.uttalelse.stringHasNoValue': 'Du må fylle ut tilbakemeldingsfeltet.',
    '@ungUi.uttalelseForm.validation.uttalelse.stringIsTooShort':
        'Du har brukt for få tegn i tilbakemeldingen din. Teksten må minst inneholde {min} tegn.',
    '@ungUi.uttalelseForm.validation.uttalelse.stringIsTooLong':
        'Du har brukt for mange tegn i tilbakemeldingen din. Teksten kan ikke inneholde flere enn {maks} tegn.',
    '@ungUi.uttalelseForm.validation.uttalelse.stringHasInvalidCharacters':
        // eslint-disable-next-line max-len
        'Tilbakemeldingen inneholder ugyldige tegn. Ugyldige tegn kan for eksempel være emojier, spesialtegn som « », §, @, eller skjulte formateringstegn som innrykk, tabulatorer og listeformatering. Dette kan blant annet oppstå dersom tekst kopieres fra andre steder. Du kan prøve å skrive inn teksten på nytt direkte i feltet.',
};
