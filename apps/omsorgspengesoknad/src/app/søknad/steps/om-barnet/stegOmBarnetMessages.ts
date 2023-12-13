import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

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
        'steg.omBarnet.veileder.samværsavtale': 'Senere i søknaden laster du opp avtale om delt bosted for barnet.',
        'steg.omBarnet.spm.sammeAdresse': 'Er du folkeregistrert på samme adresse som barnet?',
        'steg.omBarnet.spm.kroniskEllerFunksjonshemmende':
            'Har barnet kronisk sykdom, funksjonshemning eller langvarig sykdom?',
        'steg.omBarnet.alert.barnet18ÅrKanIkkeFortsette': 'Det gis ikke omsorgsdager til barn over 18 år.',
        'steg.omBarnet.alert.ikkeKroniskSykdom':
            'Søknad om ekstra omsorgsdager gjelder kun for de som har barn med kronisk sykdom, funksjonshemning eller langvarig sykdom.',
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
        'validation.barnetsNavn.stringIsTooLong': 'Navnet på barnet kan ikke inneholde flere enn {maks}.',
        'validation.søkersRelasjonTilBarnet.noValue': 'Du må velge din relasjon til barnet.',
        'validation.sammeAdresse.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om du er folkeregistrert på samme adresse som barnet.',
        'validation.kroniskEllerFunksjonshemming.yesOrNoIsUnanswered':
            'Du må svare ja eller nei på om barnet har en en kronisk sykdom eller funksjonshemning.',
    },
};
