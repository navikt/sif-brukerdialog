import { YesOrNo } from '@navikt/sif-common-formik-ds';

export enum UtenlandsoppholdÅrsak {
    'INNLAGT_DEKKET_NORGE' = 'BARNET_INNLAGT_I_HELSEINSTITUSJON_FOR_NORSK_OFFENTLIG_REGNING',
    'INNLAGT_DEKKET_ANNET_LAND' = 'BARNET_INNLAGT_I_HELSEINSTITUSJON_DEKKET_ETTER_AVTALE_MED_ET_ANNET_LAND_OM_TRYGD',
    'ANNET' = 'ANNET',
}

export interface UtenlandsoppholdInnlagtPeriode {
    fom: Date;
    tom: Date;
}

export enum UtenlandsoppholdVariant {
    'ENKEL' = 'ENKEL', // Kun periode og land
    'UTVIDET' = 'UTVIDET', // Periode, land og flere spørsmål
}

interface UtenlandsoppholdBase {
    id?: string;
    fom: Date;
    tom: Date;
    landkode: string;
}

export type UtenlandsoppholdEnkel = UtenlandsoppholdBase & {
    type: 'enkel';
};

export type UtenlandsoppholdInnenforEØS = UtenlandsoppholdBase & {
    type: 'innenfor_eøs';
    erSammenMedBarnet: boolean;
};

export type UtenlandsoppholdUtenforEØS = UtenlandsoppholdBase & {
    type: 'utenfor_eøs';
    erSammenMedBarnet: boolean;
    erBarnetInnlagt?: boolean;
    barnInnlagtPerioder?: UtenlandsoppholdInnlagtPeriode[];
    årsak?: UtenlandsoppholdÅrsak;
};
export type Utenlandsopphold = UtenlandsoppholdEnkel | UtenlandsoppholdInnenforEØS | UtenlandsoppholdUtenforEØS;

export type UtenlandsoppholdFormValues = {
    fom?: string;
    tom?: string;
    landkode?: string;
    erSammenMedBarnet?: YesOrNo;
    erBarnetInnlagt?: YesOrNo;
    barnInnlagtPerioder?: UtenlandsoppholdInnlagtPeriode[];
    årsak?: UtenlandsoppholdÅrsak;
};
