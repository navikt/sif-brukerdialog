import { Locale } from '@navikt/sif-common-core-ds/lib/types/Locale';

export type ISO8601Duration = string;

export enum YtelseTypeApi {
    'PLEIEPENGER_SYKT_BARN' = 'PLEIEPENGER_SYKT_BARN',
    'PLEIEPENGER_LIVETS_SLUTTFASE' = 'PLEIEPENGER_LIVETS_SLUTTFASE',
    'OMP_UTV_KS' = 'OMP_UTV_KS',
    'OMP_UT_SNF' = 'OMP_UT_SNF',
    'OMP_UT_ARBEIDSTAKER' = 'OMP_UT_ARBEIDSTAKER',
    'OMP_UTV_MA' = 'OMP_UTV_MA',
    // 'OMP_ALENEOMSORG' = 'OMP_ALENEOMSORG', ikke i bruk frem til backend støtter denne
}

export interface SoknadApiData {
    id: string;
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    beskrivelse?: string;
    vedlegg: string[];
    søknadstype: YtelseTypeApi;
    ytelseTittel: string;
}
