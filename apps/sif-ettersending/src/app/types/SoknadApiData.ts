import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { DokumentType } from './DokumentType';

export type ISO8601Duration = string;

export enum YtelseTypeApi {
    'PLEIEPENGER_SYKT_BARN' = 'PLEIEPENGER_SYKT_BARN',
    'PLEIEPENGER_LIVETS_SLUTTFASE' = 'PLEIEPENGER_LIVETS_SLUTTFASE',
    'OMP_UTV_KS' = 'OMP_UTV_KS',
    'OMP_UT_SNF' = 'OMP_UT_SNF',
    'OMP_UT_ARBEIDSTAKER' = 'OMP_UT_ARBEIDSTAKER',
    'OMP_UTV_MA' = 'OMP_UTV_MA',
    'OPPLÆRINGSPENGER' = 'OPPLÆRINGSPENGER',
}

export interface BarnetLegeerklæringGjelderApiData {
    norskIdentitetsnummer?: string;
    aktørId?: string;
    fødselsdato?: Date;
    navn?: string;
}

export interface SoknadApiData {
    søkerNorskIdent: string;
    id: string;
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    beskrivelse?: string;
    ettersendelsesType: DokumentType;
    pleietrengende?: BarnetLegeerklæringGjelderApiData;
    vedlegg: string[];
    søknadstype: YtelseTypeApi;
    ytelseTittel: string;
}
