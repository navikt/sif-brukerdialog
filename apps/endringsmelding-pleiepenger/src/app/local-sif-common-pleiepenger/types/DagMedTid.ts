import { Duration } from '@navikt/sif-common-utils';

export interface DagMedTid {
    dato: Date;
    tid: Duration;
    normaltid?: Duration;
}
