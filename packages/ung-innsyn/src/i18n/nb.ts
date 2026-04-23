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

    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_STARTDATO.paneltittel': 'Se og gi tilbakemelding på endret startdato',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_STARTDATO.oppgavetittel': 'Tilbakemelding på endret startdato',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_STARTDATO.info':
        'Veilederen din har endret datoen for når du startet i ungdomsprogrammet.',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_STARTDATO.harTilbakemeldingSpørsmål':
        'Har du en tilbakemelding på startdatoen?',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_STARTDATO.harIkkeUttalelseLabel': 'Nei',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_STARTDATO.harUttalelseLabel': 'Ja',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_STARTDATO.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_STARTDATO.kvitteringTekst': 'Du vil om kort tid motta et oppdatert vedtak.',

    '@ungInnsyn.oppgavetype.BEKREFT_MELDT_UT.paneltittel': 'Se og gi tilbakemelding på sluttdato',
    '@ungInnsyn.oppgavetype.BEKREFT_MELDT_UT.oppgavetittel': 'Tilbakemelding på sluttdato',
    '@ungInnsyn.oppgavetype.BEKREFT_MELDT_UT.info':
        'Veilederen din har satt en dato for når du slutter i ungdomsprogrammet.',
    '@ungInnsyn.oppgavetype.BEKREFT_MELDT_UT.harTilbakemeldingSpørsmål': 'Har du en tilbakemelding på sluttdatoen?',
    '@ungInnsyn.oppgavetype.BEKREFT_MELDT_UT.harIkkeUttalelseLabel': 'Nei',
    '@ungInnsyn.oppgavetype.BEKREFT_MELDT_UT.harUttalelseLabel': 'Ja',
    '@ungInnsyn.oppgavetype.BEKREFT_MELDT_UT.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungInnsyn.oppgavetype.BEKREFT_MELDT_UT.kvitteringTekst': 'Du vil om kort tid motta et oppdatert vedtak.',

    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.paneltittel': 'Se og gi tilbakemelding på endret sluttdato',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.oppgavetittel': 'Tilbakemelding på endret sluttdato',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.info':
        'Veilederen din har endret datoen for når du slutter i ungdomsprogrammet.',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.harTilbakemeldingSpørsmål':
        'Har du en tilbakemelding på sluttdatoen?',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.harIkkeUttalelseLabel': 'Nei',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.harUttalelseLabel': 'Ja',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_SLUTTDATO.kvitteringTekst': 'Du vil om kort tid motta et oppdatert vedtak.',

    '@ungInnsyn.oppgavetype.BEKREFT_BOSTED.paneltittel': 'Se og gi tilbakemelding på bostedsvilkåret',
    '@ungInnsyn.oppgavetype.BEKREFT_BOSTED.oppgavetittel': 'Tilbakemelding på bostedsvilkåret',
    '@ungInnsyn.oppgavetype.BEKREFT_BOSTED.info': 'Veilederen din har meldt fra om at du ikke lenger bor i Trondheim.',
    '@ungInnsyn.oppgavetype.BEKREFT_BOSTED.harTilbakemeldingSpørsmål': 'Har du en tilbakemelding på bostedsvilkåret?',
    '@ungInnsyn.oppgavetype.BEKREFT_BOSTED.harIkkeUttalelseLabel': 'Nei',
    '@ungInnsyn.oppgavetype.BEKREFT_BOSTED.harUttalelseLabel': 'Ja',
    '@ungInnsyn.oppgavetype.BEKREFT_BOSTED.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungInnsyn.oppgavetype.BEKREFT_BOSTED.kvitteringTekst': 'Du vil om kort tid motta et oppdatert vedtak.',

    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.paneltittel':
        'Se og gi tilbakemelding på ny start- og sluttdato',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.oppgavetittel':
        'Tilbakemelding på ny start- og sluttdato for ungdoms\u00ADprogram\u00ADytelsen',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.info':
        'Veilederen din har endret start- og sluttdatoen din i ungdomsprogrammet.',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.harTilbakemeldingSpørsmål':
        'Har du en tilbakemelding på ny start- og sluttdato?',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.harIkkeUttalelseLabel': 'Nei',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.harUttalelseLabel': 'Ja',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungInnsyn.oppgavetype.BEKREFT_ENDRET_START_OG_SLUTTDATO.kvitteringTekst':
        'Du vil om kort tid motta et oppdatert vedtak.',

    '@ungInnsyn.oppgavetype.BEKREFT_FJERNET_PERIODE.paneltittel':
        'Se og gi tilbakemelding på stans av ungdoms\u00ADprogram\u00ADytelsen',
    '@ungInnsyn.oppgavetype.BEKREFT_FJERNET_PERIODE.oppgavetittel':
        'Tilbakemelding på stans av ungdoms\u00ADprogram\u00ADytelsen',
    '@ungInnsyn.oppgavetype.BEKREFT_FJERNET_PERIODE.info':
        'Veilederen din har meldt deg ut av ungdomsprogrammet fordi du ikke skal delta i programmet likevel.',
    '@ungInnsyn.oppgavetype.BEKREFT_FJERNET_PERIODE.harTilbakemeldingSpørsmål': 'Har du en tilbakemelding?',
    '@ungInnsyn.oppgavetype.BEKREFT_FJERNET_PERIODE.harIkkeUttalelseLabel': 'Nei',
    '@ungInnsyn.oppgavetype.BEKREFT_FJERNET_PERIODE.harUttalelseLabel': 'Ja',
    '@ungInnsyn.oppgavetype.BEKREFT_FJERNET_PERIODE.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungInnsyn.oppgavetype.BEKREFT_FJERNET_PERIODE.kvitteringTekst': 'Du vil om kort tid motta et oppdatert vedtak.',

    '@ungInnsyn.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.paneltittel': 'Sjekk inntekten din i {månedOgÅr}',
    '@ungInnsyn.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.oppgavetittel': 'Tilbakemelding på inntekt i {månedOgÅr}',
    '@ungInnsyn.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.info':
        'Sjekk at opplysningene våre om inntekten du fikk fra arbeidsgiver i {måned} er riktige. Send oss et svar når du har sjekket.',
    '@ungInnsyn.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.harTilbakemeldingSpørsmål':
        'Stemmer inntekten vi har fått oppgitt?',
    '@ungInnsyn.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.harIkkeUttalelseLabel': 'Ja, inntekten stemmer',
    '@ungInnsyn.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.harUttalelseLabel':
        'Nei, inntekten stemmer ikke. Jeg har en tilbakemelding.',
    '@ungInnsyn.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    '@ungInnsyn.oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.kvitteringTekst':
        'Vi bruker tilbakemeldingen din når vi vurderer hvor mye penger du skal få i {utbetalingsmåned}. Du får et vedtaksbrev om dette.',

    '@ungInnsyn.oppgavetype.RAPPORTER_INNTEKT.paneltittel': 'Meld fra om du hadde inntekt i {månedOgÅr}',
    '@ungInnsyn.oppgavetype.RAPPORTER_INNTEKT.oppgavetittel': 'Inntekt i {månedOgÅr}',
    '@ungInnsyn.oppgavetype.RAPPORTER_INNTEKT.info': 'Hvis du ikke hadde inntekt, trenger du ikke gjøre noe.',

    '@ungInnsyn.oppgavetype.SØK_YTELSE.paneltittel': 'Søknad for ungdoms\u00ADprogram\u00ADytelsen',
    '@ungInnsyn.oppgavetype.SØK_YTELSE.oppgavetittel': 'Søknad for ungdoms\u00ADprogram\u00ADytelsen',
    '@ungInnsyn.oppgavetype.SØK_YTELSE.info':
        'Du er meldt inn i ungdomsprogrammet. Nå kan du søke om ungdomsprogramytelsen.',

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
        'Du må ikke oppgi sensitive informasjon (personopplysninger) om deg selv eller andre, for eksempel helseopplysninger.',

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
