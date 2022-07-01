import { ApiStringDate } from '@navikt/sif-common-core/lib/types/ApiStringDate';
import { Locale } from '@navikt/sif-common-core/lib/types/Locale';
import { AnnenForeldrenSituasjon } from './SoknadFormData';
export interface AnnenForelder {
    navn: string;
    fnr: string;
    situasjon: AnnenForeldrenSituasjon;
    situasjonBeskrivelse?: string;
    periodeFraOgMed?: ApiStringDate;
    periodeTilOgMed?: ApiStringDate;
    periodeOver6Måneder?: boolean;
}

export interface ApiBarn {
    norskIdentifikator?: string;
    aktørId?: string;
    navn: string;
}

export interface SoknadApiData {
    id: string;
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
    annenForelder: AnnenForelder;
    barn: ApiBarn[];
}
