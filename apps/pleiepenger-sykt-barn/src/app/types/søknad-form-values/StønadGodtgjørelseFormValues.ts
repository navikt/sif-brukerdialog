import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils';

export enum StønadGodtgjørelseFormField {
    mottarStønadGodtgjørelse = 'stønadGodtgjørelse.mottarStønadGodtgjørelse',
    mottarStønadGodtgjørelseVariant = 'stønadGodtgjørelse.mottarStønadGodtgjørelseVariant',
    startdato = 'stønadGodtgjørelse.startdato',
    sluttdato = 'stønadGodtgjørelse.sluttdato',
}

export enum MottarStønadGodtgjørelseVariant {
    somVanlig = 'somVanlig',
    starterIPerioden = 'starterIPerioden',
    slutterIPerioden = 'slutterIPerioden',
    starterOgSlutterIPerioden = 'starterOgSlutterIPerioden',
}

export interface StønadGodtgjørelseFormValues {
    mottarStønadGodtgjørelse: YesOrNo;
    mottarStønadGodtgjørelseVariant?: MottarStønadGodtgjørelseVariant;
    startdato?: ISODate;
    sluttdato?: ISODate;
}
