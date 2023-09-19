import { AnnetBarn } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';

interface DineBarnHarAnnetBarn {
    type: 'dineBarnHarAnnetBarn';
    andreBarn: AnnetBarn[];
}
interface DineBarnHarIkkeAnnetBarn {
    type: 'dineBarnHarIkkeAnnetBarn';
}

export type DineBarnSøknadsdata = DineBarnHarAnnetBarn | DineBarnHarIkkeAnnetBarn;
