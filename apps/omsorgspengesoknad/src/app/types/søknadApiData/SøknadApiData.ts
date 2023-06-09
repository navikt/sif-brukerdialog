import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import { CommonDataBruktTilUtledningApiData } from '@navikt/sif-common-core-ds/lib/types';
import { SøkersRelasjonTilBarnet } from '../SøkersRelasjonTilBarnet';

export interface OmBarnetApiData {
    barn: BarnToSendToApi;
    relasjonTilBarnet?: SøkersRelasjonTilBarnet;
    kroniskEllerFunksjonshemming: boolean;
    sammeAdresse?: boolean;
}
export interface BarnToSendToApi {
    navn: string;
    norskIdentifikator: string | null;
    aktørId: string | null;
}

export interface SøknadApiData extends OmBarnetApiData {
    språk: Locale;
    kroniskEllerFunksjonshemming: boolean;
    legeerklæring: string[];
    samværsavtale?: string[];
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    dataBruktTilUtledning: CommonDataBruktTilUtledningApiData;
}
