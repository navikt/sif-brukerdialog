import { YesOrNo } from '@sif/rhf';
import { BostedUtland } from '@sif/soknad-forms';

export enum BostedUtlandFormFields {
    harBoddINorge = 'harBoddINorge',
    harJobbetSammenhengendeINorge = 'harJobbetSammenhengendeINorge',
    harJobbetIUtlandet = 'harJobbetIUtlandet',
    bosteder = 'bosteder',
    arbeidssteder = 'arbeidssteder',
}

export interface BostedUtlandFormValues {
    [BostedUtlandFormFields.harBoddINorge]?: YesOrNo;
    [BostedUtlandFormFields.bosteder]?: BostedUtland[];
    [BostedUtlandFormFields.harJobbetIUtlandet]?: YesOrNo;
    [BostedUtlandFormFields.arbeidssteder]?: BostedUtland[];
}
