import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';

interface OmOmsorgenForBarUtenDeltBosted {
    type: 'omOmsorgenForBarnUtenDeltBosted';
    annetBarn: AnnetBarn[];
    harAleneomsorgFor: string[];
    avtaleOmDeltBosted: YesOrNo.NO;
}

interface OmOmsorgenForBarMedDeltBosted {
    type: 'omOmsorgenForBarnMedDeltBosted';
    annetBarn: AnnetBarn[];
    harAleneomsorgFor: string[];
    avtaleOmDeltBosted: YesOrNo.YES;
    harAvtaleOmDeltBostedFor: string[];
}

export type OmOmsorgenForBarnSøknadsdata = OmOmsorgenForBarUtenDeltBosted | OmOmsorgenForBarMedDeltBosted;
