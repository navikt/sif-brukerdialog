import { MessageFileFormat } from '@navikt/sif-common-core-ds/src/types/MessageFileFormat';

export const fraværFraMessages: MessageFileFormat = {
    nb: {
        'step.fravaerFra.dag.spm': 'Hvilket arbeid hadde du fravær fra {dato}?',
        'step.fravaerFra.info':
            'Du har opplyst at du er både selvstendig næringsdrivende og frilanser. Nå trenger vi å vite hvilket arbeid du hadde fravær fra i dagene du brukte omsorgsdager.',

        'aktivitetFravær.SELVSTENDIG_VIRKSOMHET': 'selvstendig næringsdrivende',
        'aktivitetFravær.FRILANSER': 'frilanser',
    },
};
