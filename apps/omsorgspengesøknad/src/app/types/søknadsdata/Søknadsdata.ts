import { DeltBostedSøknadsdata } from './DeltBostedSøknadsdata';
import { LegeerklæringSøknadsdata } from './LegeerklæringSøknadsdata';
import { OmBarnetSøknadsdata } from './OmBarnetSøknadsdata';

export * from './DeltBostedSøknadsdata';
export * from './OmBarnetSøknadsdata';
export * from './LegeerklæringSøknadsdata';

export interface Søknadsdata {
    id?: string;
    harForståttRettigheterOgPlikter?: boolean;
    harBekreftetOpplysninger?: boolean;
    deltBosted?: DeltBostedSøknadsdata;
    omBarnet?: OmBarnetSøknadsdata;
    legeerklæring?: LegeerklæringSøknadsdata;
}
