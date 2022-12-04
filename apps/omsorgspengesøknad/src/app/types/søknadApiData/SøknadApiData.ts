import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import { SøkersRelasjonTilBarnet } from '../SøkersRelasjonTilBarnet';

export interface OmBarnetApiData {
    barn: BarnToSendToApi;
    relasjonTilBarnet?: SøkersRelasjonTilBarnet;
    kroniskEllerFunksjonshemming: boolean;
    sammeAdresse?: boolean;
}
export interface BarnToSendToApi {
    navn: string | null;
    norskIdentifikator: string | null;
    aktørId: string | null;
}

export interface SøknadApiData extends OmBarnetApiData {
    språk: Locale;
    kroniskEllerFunksjonshemming: boolean;
    sammeAdresse?: boolean;
    legeerklæring: string[];
    samværsavtale?: string[];
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
}
