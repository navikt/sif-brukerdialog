import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';
import { ISODate } from '@navikt/sif-common-utils/lib/types';
import { SøkersRelasjonTilBarnet } from '../SøkersRelasjonTilBarnet';

export interface OmBarnetApiData {
    barn: BarnToSendToApi;
}
export interface BarnToSendToApi {
    navn: string | null;
    norskIdentifikator: string | null;
    aktørId: string | null;
}
export interface UtenlandsoppholdApiData {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
    landkode: string;
    landnavn: string;
}

export interface SøknadApiData extends OmBarnetApiData {
    språk: Locale;
    kroniskEllerFunksjonshemming: boolean;
    sammeAdresse?: boolean;
    relasjonTilBarnet: SøkersRelasjonTilBarnet | undefined;
    legeerklæring: string[];
    samværsavtale?: string[];
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
}
