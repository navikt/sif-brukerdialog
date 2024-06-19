const nb = {
    'step.opplysningerOmPleietrengende.pageTitle': 'Om personen du pleier',
    'step.opplysningerOmPleietrengende.stepTitle': 'Om personen du pleier',
    'step.opplysningerOmPleietrengende.stepIndicatorLabel': 'Om personen du pleier',
    'step.opplysningerOmPleietrengende.nextButtonLabel': 'Fortsett',
    'step.opplysningerOmPleietrengende.counsellorPanel.info':
        'Her gir du opplysninger om personen du skal gi pleie til, og om det er flere som skal dele på å gi pleie.',

    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.spm':
        'Skal du pleie personen hjemme i de dagene du søker for?',
    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.alert':
        'Du kan bare søke for dager du pleier personen hjemme.',
    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.info.tittel': 'Hva betyr dette?',
    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.info.1':
        'For å ha rett til pleiepenger må du pleie den som trenger pleie hjemme i et privat hjem. Som oftest skjer det hjemme hos deg, eller hjemme hos den du pleier.',
    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.info.2':
        'Det er ikke rett til pleiepenger i denne situasjonen hvis den pleietrengende er på sykehus eller en annen institusjon.',

    'step.opplysningerOmPleietrengende.spm.navn': 'Navn på den du skal pleie',
    'step.opplysningerOmPleietrengende.spm.fnr': 'Fødselsnummer/D-nummer',
    'step.opplysningerOmPleietrengende.årsakManglerIdentitetsnummer.spm':
        'Hvorfor har ikke personen fødselsnummer eller D-nummer?',
    'step.opplysningerOmPleietrengende.årsakManglerIdentitetsnummer.BOR_I_UTLANDET': 'Personen bor i utlandet',
    'step.opplysningerOmPleietrengende.årsakManglerIdentitetsnummer.ANNET': 'Annet',
    'step.opplysningerOmPleietrengende.id.tittel': 'ID for personen du pleier',
    'step.opplysningerOmPleietrengende.id.info':
        'Når personen du pleier ikke har fødselsnummer eller D-nummer, må du legge ved en kopi av ID for personen. Godkjent ID kan være fødselsattest, dødsattest, førerkort, id-kort eller pass.',
    'step.opplysningerOmPleietrengende.id.uploadButtonLabel': 'Last opp ID',
    'vedleggsliste.ingenDokumenter': 'Ingen dokumenter er lastet opp',

    'step.opplysningerOmPleietrengende.fnr.harIkkeFnr': 'Personen har ikke fødselsnummer/D-nummer',
    'step.opplysningerOmPleietrengende.fødselsdato': 'Fødselsdato',

    'validation.navn.stringHasNoValue': 'Du må skrive inn navnet til den du  pleier.',
    'validation.norskIdentitetsnummer.fødselsnummerHasNoValue':
        'Du må skrive inn fødselsnummeret til personen du  pleier. Et fødselsnummer består av 11 siffer.',
    'validation.norskIdentitetsnummer.fødselsnummerIsInvalid':
        ' Du har oppgitt et ugyldig fødselsnummer. Kontroller at du har tastet inn riktig.',
    'validation.norskIdentitetsnummer.fødselsnummerIsNot11Chars':
        'Du har oppgitt et ugyldig fødselsnummer. Et gyldig fødselsnummer består av 11 siffer.',
    'validation.norskIdentitetsnummer.fødselsnummerIsNotAllowed':
        'Du har oppgitt ditt eget fødselsnummer. Du må skrive inn fødselsnummeret til personen du pleier.',
    'validation.norskIdentitetsnummer.fødselsnummerAsHnrIsNotAllowed':
        'Fødselsnummeret/D-nummeret du har tastet inn er ikke et gyldig norsk fødselsnummer. Kontroller at du har tastet inn riktig.',
    'validation.fødselsdato.dateHasNoValue':
        'Du må oppgi fødselsdatoen til personen du  pleier. Skriv inn, eller velg dato fra datovelgeren.',
    'validation.fødselsdato.dateIsAfterMax': 'Fødselsdatoen kan ikke være etter dagens dato.',
    'validation.fødselsdato.dateHasInvalidFormat':
        'Du må oppgi fødselsdatoen i et gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.årsakManglerIdentitetsnummer.noValue':
        'Du må svare på hvorfor den du pleier ikke har fødselsnummer eller D-nummer.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const opplysningerOmPleietrengendeMessages = { nb, nn };
