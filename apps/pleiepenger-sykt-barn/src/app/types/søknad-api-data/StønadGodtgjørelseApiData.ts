import { ISODate } from '@navikt/sif-common-utils';
import { MottarStønadGodtgjørelseVariant } from '../søknad-form-values/StønadGodtgjørelseFormValues';

export interface StønadGodtgjørelseApiData {
    mottarStønadGodtgjørelse: boolean;
    startdato?: ISODate /** dato dato fra svar eller fom fra søknadsperiode  */;
    sluttdato?: ISODate /** dato dato fra svar eller tom fra søknadsperiode  */;
    _variant?: MottarStønadGodtgjørelseVariant /** feltet ignoreres av apiet  */;
}
