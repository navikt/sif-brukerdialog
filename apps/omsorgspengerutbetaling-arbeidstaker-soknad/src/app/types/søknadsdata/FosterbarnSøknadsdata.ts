import { Fosterbarn } from '@navikt/sif-common-forms-ds/lib/forms/fosterbarn/types';

interface harFosterbarn {
    type: 'harFosterbarn';
    fosterbarn: Fosterbarn[];
}
interface harIkkeFosterbarn {
    type: 'harIkkeFosterbarn';
}

export type FosterbarnSøknadsdata = harFosterbarn | harIkkeFosterbarn;
