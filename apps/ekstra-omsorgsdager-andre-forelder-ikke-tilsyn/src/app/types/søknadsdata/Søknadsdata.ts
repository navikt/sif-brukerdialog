import { AnnenForelderenSituasjonSøknadsdata } from './AnnenForelderenSituasjonSøknadsdata';
import { DeresFellesBarnSøknadsdata } from './DeresFellesBarnSøknadsdata';

export * from './AnnenForelderenSituasjonSøknadsdata';
export * from './DeresFellesBarnSøknadsdata';
export interface Søknadsdata {
    id?: string;
    harForståttRettigheterOgPlikter?: boolean;
    annenForelderenSituasjonData?: AnnenForelderenSituasjonSøknadsdata;
    deresFellesBarnData?: DeresFellesBarnSøknadsdata;
    harBekreftetOpplysninger?: boolean;
}
