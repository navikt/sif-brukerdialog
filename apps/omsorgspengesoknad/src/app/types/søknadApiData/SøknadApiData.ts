import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import { SøkersRelasjonTilBarnet } from '../SøkersRelasjonTilBarnet';
import { ISODate } from '@navikt/sif-common-utils/lib';
import { BarnSammeAdresse } from '../BarnSammeAdresse';

export interface OmBarnetApiData {
    barn: BarnToSendToApi;
    relasjonTilBarnet?: SøkersRelasjonTilBarnet;
    kroniskEllerFunksjonshemming: boolean;
    sammeAdresse?: BarnSammeAdresse;
    høyereRisikoForFravær?: boolean;
    høyereRisikoForFraværBeskrivelse?: string;
}
export interface BarnToSendToApi {
    navn: string;
    norskIdentifikator: string | null;
    aktørId: string | null;
    fødselsdato?: ISODate;
}

export interface SøknadApiData extends OmBarnetApiData {
    språk: Locale;
    kroniskEllerFunksjonshemming: boolean;
    legeerklæring: string[];
    samværsavtale?: string[];
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
}
