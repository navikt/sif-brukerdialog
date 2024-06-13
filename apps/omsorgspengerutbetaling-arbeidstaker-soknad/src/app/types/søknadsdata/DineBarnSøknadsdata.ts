import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';

export interface DineBarnSøknadsdata {
    andreBarn: AnnetBarn[];
    harDeltBosted: boolean;
}
