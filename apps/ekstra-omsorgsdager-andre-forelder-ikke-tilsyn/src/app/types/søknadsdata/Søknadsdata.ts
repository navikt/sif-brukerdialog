import { StepId } from '../StepId';
import { AnnenForelderenSituasjonSøknadsdata } from './AnnenForelderenSituasjonSøknadsdata';
import { OmAnnenForelderSøknadsdata } from './OmAnnenForelderSøknadsdata';
import { OmBarnaSøknadsdata } from './OmBarnaSøknadsdata';

export * from './OmAnnenForelderSøknadsdata';
export * from './AnnenForelderenSituasjonSøknadsdata';
export * from './OmBarnaSøknadsdata';

export interface Søknadsdata {
    id: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.OM_ANNEN_FORELDER]?: OmAnnenForelderSøknadsdata;
    [StepId.ANNEN_FORELDER_SITUASJON]?: AnnenForelderenSituasjonSøknadsdata;
    [StepId.OM_BARNA]?: OmBarnaSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.KVITTERING]?: undefined;
}
