import { AnnenForelderenSituasjonSøknadsdata } from './AnnenForelderenSituasjonSøknadsdata';
import { DeresFellesBarnSøknadsdata } from './DeresFellesBarnSøknadsdata';
import { OmAnnenForelderSøknadsdata } from './OmAnnenForelderSøknadsdata';

export * from './OmAnnenForelderSøknadsdata';
export * from './AnnenForelderenSituasjonSøknadsdata';
export * from './DeresFellesBarnSøknadsdata';
export interface Søknadsdata {
    id?: string;
    harForståttRettigheterOgPlikter?: boolean;
    omAnnenForelderData?: OmAnnenForelderSøknadsdata;
    annenForelderenSituasjonData?: AnnenForelderenSituasjonSøknadsdata;
    deresFellesBarnData?: DeresFellesBarnSøknadsdata;
    harBekreftetOpplysninger?: boolean;
}
