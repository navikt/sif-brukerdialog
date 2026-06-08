import { StepFormValues } from '@sif/soknad/types';

export enum BarnFormFields {
    barnetSøknadenGjelder = 'barnetSøknadenGjelder',
}

export interface BarnFormValues extends StepFormValues {
    [BarnFormFields.barnetSøknadenGjelder]?: string;
}