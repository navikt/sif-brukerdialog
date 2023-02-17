import { AnnenForelderenSituasjonSøknadsdata } from './AnnenForelderenSituasjonSøknadsdata';
import { OmBarnaSøknadsdata } from './OmBarnaSøknadsdata';
import { OmAnnenForelderSøknadsdata } from './OmAnnenForelderSøknadsdata';

export * from './OmAnnenForelderSøknadsdata';
export * from './AnnenForelderenSituasjonSøknadsdata';
export * from './OmBarnaSøknadsdata';
export interface Søknadsdata {
    id?: string;
    harForståttRettigheterOgPlikter?: boolean;
    omAnnenForelderData?: OmAnnenForelderSøknadsdata;
    annenForelderenSituasjonData?: AnnenForelderenSituasjonSøknadsdata;
    omBarnaData?: OmBarnaSøknadsdata;
    harBekreftetOpplysninger?: boolean;
}
