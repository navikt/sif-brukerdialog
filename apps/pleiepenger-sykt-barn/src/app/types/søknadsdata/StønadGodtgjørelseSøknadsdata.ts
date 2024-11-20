import { ISODate } from '@navikt/sif-common-utils';
import { MottarStønadGodtgjørelseVariant } from '../søknad-form-values/StønadGodtgjørelseFormValues';

export interface MottarIkkeStønadGodtgjørelse {
    mottarStønadGodtgjørelse: false;
}

export interface MottarStønadGodtgjørelseSomVanligIPerioden {
    mottarStønadGodtgjørelse: true;
    mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.somVanlig;
}

export interface MottarStønadGodtgjørelseStarterIPerioden {
    mottarStønadGodtgjørelse: true;
    mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.starterIPerioden;
    startdato: ISODate;
}
export interface MottarStønadGodtgjørelseSlutterIPerioden {
    mottarStønadGodtgjørelse: true;
    mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.slutterIPerioden;
    sluttdato: ISODate;
}
export interface MottarStønadGodtgjørelseStarterOgSlutterIPerioden {
    mottarStønadGodtgjørelse: true;
    mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.starterOgSlutterIPerioden;
    startdato: ISODate;
    sluttdato: ISODate;
}

export type StønadGodtgjørelseSøknadsdata =
    | MottarIkkeStønadGodtgjørelse
    | MottarStønadGodtgjørelseSomVanligIPerioden
    | MottarStønadGodtgjørelseStarterIPerioden
    | MottarStønadGodtgjørelseSlutterIPerioden
    | MottarStønadGodtgjørelseStarterOgSlutterIPerioden;
