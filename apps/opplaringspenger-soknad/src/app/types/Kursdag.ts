import { NumberDuration } from '@navikt/sif-common-utils';

export interface Kursdag {
    id: string;
    dato: Date;
    tidKurs: NumberDuration;
    tidReise?: NumberDuration;
}
