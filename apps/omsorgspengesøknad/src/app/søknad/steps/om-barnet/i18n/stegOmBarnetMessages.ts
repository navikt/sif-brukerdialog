import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const omBarnetStegMessages: MessageFileFormat = {
    nb: {
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
    },
};
