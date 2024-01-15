import { Fosterbarn } from '@navikt/sif-common-forms-ds/lib/forms/fosterbarn/types';

interface DineBarnHarFosterbarn {
    type: 'dineBarnHarFosterbarn';
    fosterbarn: Fosterbarn[];
}
interface DineBarnHarIkkeFosterbarn {
    type: 'dineBarnHarIkkeFosterbarn';
}

export type DineBarnSøknadsdata = DineBarnHarFosterbarn | DineBarnHarIkkeFosterbarn;
