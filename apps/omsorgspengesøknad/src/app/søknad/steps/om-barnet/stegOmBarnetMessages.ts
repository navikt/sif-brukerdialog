import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const omBarnetMessages: MessageFileFormat = {
    nb: {
        'relasjonTilBarnet.mor': 'Mor',
        'relasjonTilBarnet.far': 'Far',
        'relasjonTilBarnet.adoptivforelder': 'Adoptivforelder',
        'relasjonTilBarnet.fosterforelder': 'Fosterforelder',

        'steg.omBarnet.pageTitle': 'Omsorgspengesøknad - opplysninger om barnet',
        'steg.omBarnet.stepTitle': 'Barn',
        'steg.omBarnet.hvilketBarn.spm': 'Hvilket barn gjelder søknaden?',
        'steg.omBarnet.hvilketBarn.registrerteBarn': 'Barn registrert på deg:',
        'steg.omBarnet.hvilketBarn.info': 'Hvis du skal søke for flere barn, må du sende én søknad for hvert barn.',
        'steg.omBarnet.hvilketBarn.født': 'Født {dato}',
        'steg.omBarnet.gjelderAnnetBarn': 'Søknaden gjelder et annet barn',
        'steg.omBarnet.fnr.spm': 'Barnets fødselsnummer/D-nummer',
        'steg.omBarnet.navn': 'Barnets navn',
        'steg.omBarnet.relasjon': 'Min relasjon til barnet',
        'steg.omBarnet.veileder.samværsavtale': 'Senere i søknaden laster du opp avtale om delt bosted for barnet.',
        'steg.omBarnet.spm.sammeAdresse': 'Er du folkeregistrert på samme adresse som barnet?',
        'steg.omBarnet.spm.kroniskEllerFunksjonshemmende': 'Har barnet en kronisk sykdom eller funksjonshemming?',
        'steg.omBarnet.alert.ikkeKroniskSykdom':
            'Søknad om ekstra omsorgsdager gjelder kun for de som har kronisk sykt eller funksjonshemmet barn.',
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
        'validation.barnetsNavn.stringHasNoValue': 'Skriv inn barnets navn.',
        'validation.barnetsNavn.stringIsTooLong': 'Navnet på barnet kan ikke inneholde flere enn {maks}.',
        'validation.søkersRelasjonTilBarnet.noValue': 'Du må velge din relasjon til barnet.',
    },
};
