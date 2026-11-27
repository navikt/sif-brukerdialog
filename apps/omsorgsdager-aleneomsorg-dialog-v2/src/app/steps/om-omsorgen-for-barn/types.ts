import { YesOrNo } from '@sif/rhf';
import type { AnnetBarn } from '@sif/soknad-forms';

export interface OmOmsorgenForBarnFormValues {
    annetBarn?: AnnetBarn[];
    harAleneomsorgFor: string[];
    avtaleOmDeltBosted: YesOrNo;
}
