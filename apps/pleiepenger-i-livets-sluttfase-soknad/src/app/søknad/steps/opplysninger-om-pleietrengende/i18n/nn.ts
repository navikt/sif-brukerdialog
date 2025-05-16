import { opplysningerOmPleietrengendeMessages_nb } from './nb';

export const opplysningerOmPleietrengendeMessages_nn: Record<
    keyof typeof opplysningerOmPleietrengendeMessages_nb,
    string
> = {
    'step.opplysningerOmPleietrengende.pageTitle': 'Om personen du pleier',
    'step.opplysningerOmPleietrengende.stepTitle': 'Om personen du pleier',
    'step.opplysningerOmPleietrengende.stepIndicatorLabel': 'Om personen du pleier',
    'step.opplysningerOmPleietrengende.nextButtonLabel': 'Fortset',
    'step.opplysningerOmPleietrengende.counsellorPanel.info':
        'Her gir du opplysningar om personen du skal gi pleie til, og om det er fleire som skal dele på å gi pleie.',

    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.spm':
        'Skal du pleie personen heime i dei dagane du søkjer for?',
    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.alert':
        'Du kan berre søkje for dagar du pleier personen heime.',
    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.info.tittel': 'Kva betyr dette?',
    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.info.1':
        'For å ha rett til pleiepengar må du pleie den som treng pleie heime i ein privat heim. Som oftast skjer det heime hos deg, eller heime hos den du pleier.',
    'steg.opplysningerOmPleietrengende.pleierDuDenSykeHjemme.info.2':
        'Det er ikkje rett til pleiepengar i denne situasjonen dersom den pleietrengande er på sjukehus eller ein annan institusjon.',

    'step.opplysningerOmPleietrengende.spm.navn': 'Namn på den du skal pleie',
    'step.opplysningerOmPleietrengende.spm.fnr': 'Fødselsnummer/D-nummer',
    'step.opplysningerOmPleietrengende.årsakManglerIdentitetsnummer.spm':
        'Kvifor har ikkje personen fødselsnummer eller D-nummer?',
    'step.opplysningerOmPleietrengende.årsakManglerIdentitetsnummer.BOR_I_UTLANDET': 'Personen bur i utlandet',
    'step.opplysningerOmPleietrengende.årsakManglerIdentitetsnummer.ANNET': 'Anna',
    'step.opplysningerOmPleietrengende.id.tittel': 'ID for personen du pleier',
    'step.opplysningerOmPleietrengende.id.info':
        'Når personen du pleier ikkje har fødselsnummer eller D-nummer, må du leggje ved ei kopi av ID for personen. Godkjend ID kan vere fødselsattest, dødsattest, førarkort, ID-kort eller pass.',
    'step.opplysningerOmPleietrengende.id.uploadButtonLabel': 'Last opp ID',
    'vedleggsliste.ingenDokumenter': 'Ingen dokument er lasta opp',

    'step.opplysningerOmPleietrengende.fnr.harIkkeFnr': 'Personen har ikkje fødselsnummer/D-nummer',
    'step.opplysningerOmPleietrengende.fødselsdato': 'Fødselsdato',

    'validation.navn.stringHasNoValue': 'Du må skrive inn namnet til den du pleier.',
    'validation.norskIdentitetsnummer.fødselsnummerHasNoValue':
        'Du må skrive inn fødselsnummeret til personen du pleier. Eit fødselsnummer består av 11 siffer.',
    'validation.norskIdentitetsnummer.fødselsnummerIsInvalid':
        'Du har oppgitt eit ugyldig fødselsnummer. Kontroller at du har tasta inn riktig.',
    'validation.norskIdentitetsnummer.fødselsnummerIsNot11Chars':
        'Du har oppgitt eit ugyldig fødselsnummer. Eit gyldig fødselsnummer består av 11 siffer.',
    'validation.norskIdentitetsnummer.fødselsnummerIsNotAllowed':
        'Du har oppgitt ditt eige fødselsnummer. Du må skrive inn fødselsnummeret til personen du pleier.',
    'validation.norskIdentitetsnummer.fødselsnummerAsHnrIsNotAllowed':
        'Fødselsnummeret/D-nummeret du har tasta inn er ikkje eit gyldig norsk fødselsnummer. Kontroller at du har tasta inn riktig.',
    'validation.fødselsdato.dateHasNoValue':
        'Du må oppgi fødselsdatoen til personen du pleier. Skriv inn, eller vel dato frå datoveljaren.',
    'validation.fødselsdato.dateIsAfterMax': 'Fødselsdatoen kan ikkje vere etter dagens dato.',
    'validation.fødselsdato.dateHasInvalidFormat':
        'Du må oppgi fødselsdatoen i eit gyldig format. Gyldig format er dd.mm.åååå.',
    'validation.årsakManglerIdentitetsnummer.noValue':
        'Du må svare på kvifor den du pleier ikkje har fødselsnummer eller D-nummer.',
};
