import { OmBarnetSøknadsdata } from './OmBarnetSøknadsdata';

export * from './OmBarnetSøknadsdata';

export interface Søknadsdata {
    id?: string;
    harForståttRettigheterOgPlikter?: boolean;
    omBarnet?: OmBarnetSøknadsdata;
    harBekreftetOpplysninger?: boolean;
}
