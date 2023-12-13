import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const omBarnetMessages: MessageFileFormat = {
    nb: {
        'relasjonTilBarnet.mor': 'Mor',
        'relasjonTilBarnet.far': 'Far',
        'relasjonTilBarnet.adoptivforelder': 'Adoptivforelder',
        'relasjonTilBarnet.fosterforelder': 'Fosterforelder',

        'steg.omBarnet.hvilketBarn.spm': 'Hvilket barn gjelder søknaden?',
        'steg.omBarnet.hvilketBarn.registrerteBarn': 'Barn registrert på deg:',
        'steg.omBarnet.hvilketBarn.info': 'Hvis du skal søke for flere barn, må du sende én søknad for hvert barn.',
        'steg.omBarnet.hvilketBarn.født': 'Født {dato}',
        'steg.omBarnet.gjelderAnnetBarn': 'Søknaden gjelder et annet barn',
        'steg.omBarnet.fnr.spm': 'Barnets fødselsnummer/D-nummer',
        'step.omBarnet.fødselsdato': 'Barnets fødselsdato',
        'step.omBarnet.fødselsdato.info': 'Barn må være født etter {minFødselsdato}',
        'steg.omBarnet.navn': 'Barnets navn',
        'steg.omBarnet.relasjon': 'Min relasjon til barnet',
        'steg.omBarnet.veileder.samværsavtale':
            'Senere i søknaden laster du opp avtale om delt fast bosted for barnet.',
        'steg.omBarnet.spm.sammeAdresse': 'Bor du sammen med barnet?',
        'steg.omBarnet.spm.sammeAdresse.ja': 'Ja',
        'steg.omBarnet.spm.sammeAdresse.jaDeltBosted': 'Ja, barnet har delt fast bosted',
        'steg.omBarnet.spm.sammeAdresse.nei': 'Nei',
        'steg.omBarnet.spm.sammeAdresse.hvaBetyrDette': 'Hva er delt fast bosted?',
        'steg.omBarnet.spm.sammeAdresse.hvaBetyrDette.info':
            'Hvis foreldrene til barnet ikke bor sammen, kan de inngå en avtale om delt fast bosted etter barneloven §36. Barnet bor da fast med begge sine foreldre.',
        'steg.omBarnet.spm.sammeAdresse.neiAlert':
            'Det er kun foreldre som bor sammen med barnet som kan få ekstra omsorgsdager fra NAV. Forelderen som bor sammen med barnet kan i noen tilfeller dele sine omsorgsdager.',
        'steg.omBarnet.spm.kroniskEllerFunksjonshemmende':
            'Har barnet kronisk/langvarig sykdom eller funksjonshemning?',
        'steg.omBarnet.spm.høyereRisikoForFravær':
            'Har du høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning? ',
        'steg.omBarnet.spm.høyereRisikoForFraværBeskrivelse.tittel':
            'Nå trenger vi en beskrivelse fra deg på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb:',
        'steg.omBarnet.spm.høyereRisikoForFravær.alert':
            'For å ha rett til ekstra omsorgsdager på grunn av sykdom eller funksjonshemning, må det være en sammenheng mellom barnets sykdom/funksjonshemning og risikoen for høyere fravær fra jobb.',
        'steg.omBarnet.alert.barnet18ÅrKanIkkeFortsette': 'Det gis ikke omsorgsdager til barn over 18 år.',
        'steg.omBarnet.alert.ikkeKroniskSykdom':
            'Denne søknaden om ekstra omsorgsdager gjelder kun for de som har barn med kronisk/langvarig sykdom eller funksjonshemning.',
        'steg.omBarnet.annetBarn.tittel': 'Annet barn',

        'validation.barnetSøknadenGjelder.noValue':
            'Du må velge hvilket barn søknaden gjelder, eller velge at søknaden gjelder et annet barn.',
        'validation.barnetsFødselsnummer.fødselsnummerHasNoValue': 'Skriv inn barnets fødselsnummer.',
        'validation.barnetsFødselsnummer.fødselsnummerIsInvalid':
            'Du har oppgitt et ugyldig fødselsnummer. Kontroller at du har tastet inn riktig.',
        'validation.barnetsFødselsnummer.fødselsnummerIsNot11Chars':
            'Du har oppgitt et ugyldig fødselsnummer. Et gyldig fødselsnummer består av 11 siffer.',
        'validation.barnetsFødselsnummer.fødselsnummerIsNotAllowed':
            'Du har oppgitt ditt eget fødselsnummer som barnets fødselsnummer. Skriv inn barnets fødselsnummer.',
        'validation.barnetsFødselsnummer.fødselsnummerAsHnrIsNotAllowed':
            'Du har oppgitt et fødselsnummer som ikke er tillatt.',
        'validation.barnetsFødselsdato.dateHasNoValue': 'Skriv inn barnets fødselsdato.',
        'validation.barnetsFødselsdato.dateHasInvalidFormat':
            'Barnets fødselsdatoen er ugyldig. Gyldig format er dd.mm.åååå.',
        'validation.barnetsFødselsdato.dateIsAfterMax':
            'Fødselsdatoen kan ikke være etter dagens dato. Skriv inn eller velg dato fra datovelgeren.',
        'validation.barnetsFødselsdato.barnOver18år': 'Det gis ikke omsorgsdager til barn over 18 år.',
        'validation.barnetsNavn.stringHasNoValue': 'Skriv inn barnets navn.',
        'validation.barnetsNavn.stringIsTooLong': 'Navnet på barnet kan ikke inneholde flere enn {maks} tegn.',
        'validation.søkersRelasjonTilBarnet.noValue': 'Du må velge din relasjon til barnet.',
        'validation.sammeAdresse.noValue': 'Du må svare ja eller nei på om du bor sammen med barnet.',
        'validation.kroniskEllerFunksjonshemming.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om barnet har en en kronisk sykdom eller funksjonshemning.',
        'validation.høyereRisikoForFravær.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du har høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning.',
        'validation.høyereRisikoForFraværBeskrivelse.stringHasNoValue':
            'Skriv inn en beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb.',
        'validation.høyereRisikoForFraværBeskrivelse.stringIsTooLong':
            'Beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb kan ikke inneholde flere enn 2000 tegn.',
        'validation.høyereRisikoForFraværBeskrivelse.stringIsTooShort':
            'Beskrivelse på hvordan barnets sykdom eller funksjonshemning gir høyere risiko for fravær fra jobb må være på minst 5 tegn.',
    },
};
