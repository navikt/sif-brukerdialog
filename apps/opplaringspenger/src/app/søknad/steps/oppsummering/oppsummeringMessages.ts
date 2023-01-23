import { MessageFileFormat } from '@navikt/sif-common-core-ds/lib/types/MessageFileFormat';

export const oppsummeringMessages: MessageFileFormat = {
    nb: {
        'steg.oppsummering.info':
            'Les gjennom oppsummeringen før du sender inn søknaden. Hvis du vil gjøre endringer, kan du gå tilbake.',
        'steg.oppsummering.søker.header': 'Om deg',
        'steg.oppsummering.søker.fnr': 'Fødselsnummer: {fødselsnummer}',

        'steg.oppsummering.bekrefterOpplysninger':
            'Jeg bekrefter at opplysningene jeg har gitt er riktige, og at jeg ikke har holdt tilbake opplysninger som har betydning for min rett til opplaringspenger.',
        'validation.harBekreftetOpplysninger.notChecked': 'Du må bekrefte opplysningene.',
    },
};
