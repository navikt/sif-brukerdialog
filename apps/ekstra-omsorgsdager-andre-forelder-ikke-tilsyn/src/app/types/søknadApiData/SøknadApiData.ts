import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { ISODate } from '@navikt/sif-common-utils';
import { AnnenForeldrenSituasjon } from '../AnnenForeldrenSituasjon';

export interface AnnenForelderApiData {
    navn: string;
    fnr: string;
    situasjon: AnnenForeldrenSituasjon;
    situasjonBeskrivelse?: string;
    periodeFraOgMed: ISODate;
    periodeTilOgMed?: ISODate;
    periodeOver6Måneder?: boolean;
}

export interface ApiBarn {
    norskIdentifikator?: string;
    aktørId?: string;
    navn: string;
}

export interface SøknadApiData {
    id: string;
    språk: Locale;
    harForståttRettigheterOgPlikter: boolean;
    annenForelder: AnnenForelderApiData;
    barn: ApiBarn[];
    harBekreftetOpplysninger: boolean;
}
