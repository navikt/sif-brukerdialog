import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { BarnType } from '@navikt/sif-common-forms-ds/src/forms/annet-barn/types';
import { ISODate } from '@navikt/sif-common-utils';
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
    søkerNorskIdent: string;
    id: string;
    språk: Locale;
    barn: ApiBarn[];
    harForståttRettigheterOgPlikter: boolean;
    harBekreftetOpplysninger: boolean;
}
