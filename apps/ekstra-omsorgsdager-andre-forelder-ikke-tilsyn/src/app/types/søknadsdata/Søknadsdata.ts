import { AnnenForelderenSituasjonSøknadsdata } from './AnnenForelderenSituasjonSøknadsdata';

export * from './AnnenForelderenSituasjonSøknadsdata';
export interface Søknadsdata {
    id?: string;
    harForståttRettigheterOgPlikter?: boolean;
    annenForelderenSituasjonData?: AnnenForelderenSituasjonSøknadsdata;
    harBekreftetOpplysninger?: boolean;
}
