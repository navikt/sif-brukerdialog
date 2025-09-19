import { innsynMessages_nb } from './nb';

export const innsynMessages_nn: typeof innsynMessages_nb = {
    'innsyn.sidetittel': 'Din ungdomsprogramytelse',

    'ytelse.SYKEPENGER': 'Sjukepengar',
    'ytelse.OMSORGSPENGER': 'Omsorgspengar',
    'ytelse.PLEIEPENGER_SYKT_BARN': 'Pleiepengar for sjukt barn',
    'ytelse.PLEIEPENGER_LIVETS_SLUTTFASE': 'Pleiepengar i livets sluttfase',
    'ytelse.OPPLAERINGSPENGER': 'Opplæringspengar',

    'oppgavestatus.LØST': 'Løyst',
    'oppgavestatus.ULØST': 'Uløyst',
    'oppgavestatus.AVBRUTT': 'Avbroten',
    'oppgavestatus.UTLØPT': 'Utgått',
    'oppgavestatus.LUKKET': 'Lukka',

    'oppgavetype.BEKREFT_ENDRET_STARTDATO.sidetittel': 'Ny startdato i ungdomsprogrammet',
    'oppgavetype.BEKREFT_ENDRET_STARTDATO.oppgavetittel': 'Sjå og gi tilbakemelding på ny startdato',
    'oppgavetype.BEKREFT_ENDRET_STARTDATO.info':
        'Rettleiaren din har endra datoen for når du starta i ungdomsprogrammet.',
    'oppgavetype.BEKREFT_ENDRET_STARTDATO.harTilbakemeldingSpørsmål': 'Har du ei tilbakemelding på startdatoen?',
    'oppgavetype.BEKREFT_ENDRET_STARTDATO.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    'oppgavetype.BEKREFT_ENDRET_STARTDATO.kvitteringTekst': 'Du vil om kort tid få eit oppdatert vedtak.',

    'oppgavetype.BEKREFT_ENDRET_SLUTTDATO.sidetittel': 'Ny sluttdato i ungdomsprogrammet',
    'oppgavetype.BEKREFT_ENDRET_SLUTTDATO.oppgavetittel': 'Sjå og gi tilbakemelding på sluttdato',
    'oppgavetype.BEKREFT_ENDRET_SLUTTDATO.info':
        'Rettleiaren din har sett ein dato for når du sluttar i ungdomsprogrammet.',
    'oppgavetype.BEKREFT_ENDRET_SLUTTDATO.harTilbakemeldingSpørsmål': 'Har du ei tilbakemelding på sluttdatoen?',
    'oppgavetype.BEKREFT_ENDRET_SLUTTDATO.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    'oppgavetype.BEKREFT_ENDRET_SLUTTDATO.kvitteringTekst': 'Du vil om kort tid få eit oppdatert vedtak.',

    'oppgavetype.BEKREFT_NY_SLUTTDATO.sidetittel': 'Sluttdato i ungdomsprogrammet',
    'oppgavetype.BEKREFT_NY_SLUTTDATO.oppgavetittel': 'Sjå og gi tilbakemelding på ny sluttdato',
    'oppgavetype.BEKREFT_NY_SLUTTDATO.info': 'Rettleiaren din har endra datoen for når du sluttar i ungdomsprogrammet.',
    'oppgavetype.BEKREFT_NY_SLUTTDATO.harTilbakemeldingSpørsmål': 'Har du ei tilbakemelding på sluttdatoen?',
    'oppgavetype.BEKREFT_NY_SLUTTDATO.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    'oppgavetype.BEKREFT_NY_SLUTTDATO.kvitteringTekst': 'Du vil om kort tid få eit oppdatert vedtak.',

    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.sidetittel': 'Tilbakemelding på løn i {måned}',
    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.oppgavetittel': 'Sjekk løn i {måned}',
    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.info':
        'Sjekk at opplysningane våre om løna du fekk i {måned} er riktig. Send oss eit svar når du har sjekka.',
    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.harTilbakemeldingSpørsmål':
        'Har du ei tilbakemelding på løna frå {antallArbeidsgivere, plural, one {arbeidsgjevar} other {arbeidsgjevarane}}?',
    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.tilbakemeldingFritekstLabel': 'Tilbakemelding',
    'oppgavetype.BEKREFT_AVVIK_REGISTERINNTEKT.kvitteringTekst':
        'Me brukar tilbakemeldinga di når me vurderer kor mykje penger du skal få i {utbetalingsmåned}. Du får eit vedtaksbrev om dette.',

    'oppgavetype.RAPPORTER_INNTEKT.sidetittel': 'Rapporter inntekt',
    'oppgavetype.RAPPORTER_INNTEKT.oppgavetittel': 'Meld frå om du fekk utbetalt løn i {månedOgÅr}',
    'oppgavetype.RAPPORTER_INNTEKT.info':
        'Meld frå om du fekk utbetalt løn i {måned}. Viss du ikkje fekk utbetalt løn, treng du ikkje gjere noko.',

    'oppgavetype.SØK_YTELSE.sidetittel': 'Søknad for ungdomsprogramytelsen',
    'oppgavetype.SØK_YTELSE.oppgavetittel': 'Søknad for ungdoms\u00ADprogram\u00ADytelsen',
    'oppgavetype.SØK_YTELSE.info': 'Du er meldt inn i ungdomsprogrammet. No kan du søkje om ungdomsprogramytelsen.',

    'inntektForm.validation.harLønn.yesOrNoIsUnanswered': 'Du må svare på om du fekk utbetalt løn.',

    'inntektForm.validation.lønn.numberHasNoValue': 'Du må oppgje kor mykje løn du fekk før skatt',
    'inntektForm.validation.lønn.numberHasInvalidFormat':
        'Oppgjeve løn har ikkje gyldig format. Eit gyldig tal inneheld kun siffer.',
    'inntektForm.validation.lønn.numberIsTooSmall': 'Oppgjeve løn kan ikkje vere mindre enn 0.',
    'inntektForm.validation.lønn.numberHasDecimals': 'Du må oppgje løna i uten desimalar',

    'uttalelseForm.validation.harTilbakemelding.yesOrNoIsUnanswered': 'Du må svare på om du har en tilbakemelding.',
    'uttalelseForm.validation.begrunnelse.stringHasNoValue': 'Du må fylle ut tilbakemeldingsfeltet.',
    'uttalelseForm.validation.begrunnelse.stringIsTooShort':
        'Du har brukt for få tegn i tilbakemeldingen din. Teksten må minst inneholde {min} tegn.',
    'uttalelseForm.validation.begrunnelse.stringIsTooLong':
        'Du har brukt for mange tegn i tilbakemeldingen din. Teksten kan ikke inneholde flere enn {maks} tegn.',
};
