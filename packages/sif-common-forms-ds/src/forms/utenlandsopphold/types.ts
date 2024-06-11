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

export interface Utenlandsopphold {
    id?: string;
    fom: Date;
    tom: Date;
    landkode: string;
    erBarnetInnlagt?: boolean;
    barnInnlagtPerioder?: UtenlandsoppholdInnlagtPeriode[];
    årsak?: UtenlandsoppholdÅrsak;
    erSammenMedBarnet?: boolean;
}

export type UtenlandsoppholdEnkel = Pick<Utenlandsopphold, 'id' | 'fom' | 'tom' | 'landkode'>;

export type UtenlandsoppholdFormValues = {
    fom?: string;
    tom?: string;
    landkode?: string;
    erSammenMedBarnet?: YesOrNo;
    erBarnetInnlagt?: YesOrNo;
    barnInnlagtPerioder?: UtenlandsoppholdInnlagtPeriode[];
    årsak?: UtenlandsoppholdÅrsak;
};
