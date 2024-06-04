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

export interface Utenlandsopphold {
    id?: string;
    fom: Date;
    tom: Date;
    landkode: string;
    erBarnetInnlagt?: YesOrNo;
    barnInnlagtPerioder?: UtenlandsoppholdInnlagtPeriode[];
    årsak?: UtenlandsoppholdÅrsak;
    erSammenMedBarn?: YesOrNo;
}

export type UtenlandsoppholdFormValues = Partial<
    Omit<Utenlandsopphold, 'id' | 'fom' | 'tom' | 'barnInnlagtPerioder' | 'erSammenMedBarn'> & {
        fom?: string;
        tom?: string;
        barnInnlagtPerioder?: UtenlandsoppholdInnlagtPeriode[];
        erSammenMedBarn?: YesOrNo;
    }
>;
