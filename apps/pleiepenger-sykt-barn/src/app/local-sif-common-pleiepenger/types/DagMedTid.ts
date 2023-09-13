import { Duration } from '@navikt/sif-common-utils/lib';

export interface DagMedTid {
    dato: Date;
    tid: Duration;
    normaltid?: Duration;
}
