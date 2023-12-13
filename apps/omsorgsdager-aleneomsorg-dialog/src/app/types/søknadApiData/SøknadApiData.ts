import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { BarnType } from '@navikt/sif-common-forms-ds/lib/forms/annet-barn/types';
import { ISODate } from '@navikt/sif-common-utils/lib/types';
import { TidspunktForAleneomsorg } from '../../søknad/steps/tidspunkt-for-aleneomsorg/TidspunktForAleneomsorgStep';

export enum RegisterteBarnTypeApi {
    'fraOppslag' = 'FRA_OPPSLAG',
}
export interface ApiBarn {
    navn: string;
    tidspunktForAleneomsorg: TidspunktForAleneomsorg;
    type: RegisterteBarnTypeApi | BarnType;
    aktørId?: string;
    identitetsnummer?: string;
    fødselsdato?: ISODate;
    dato?: string;
}

export interface SøknadApiData {
    id: string;
    språk: Locale;
    barn: ApiBarn[];
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
}
