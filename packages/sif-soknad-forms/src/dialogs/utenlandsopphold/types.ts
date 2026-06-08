export enum UtenlandsoppholdÅrsak {
    INNLAGT_DEKKET_NORGE = 'BARNET_INNLAGT_I_HELSEINSTITUSJON_FOR_NORSK_OFFENTLIG_REGNING',
    INNLAGT_DEKKET_ANNET_LAND = 'BARNET_INNLAGT_I_HELSEINSTITUSJON_DEKKET_ETTER_AVTALE_MED_ET_ANNET_LAND_OM_TRYGD',
    ANNET = 'ANNET',
}

export interface UtenlandsoppholdInnlagtPeriode {
    id: string;
    fom: Date;
    tom: Date;
}

export type UtenlandsoppholdVariant = 'enkel' | 'utvidet';

interface UtenlandsoppholdBase {
    id: string;
    fom: Date;
    tom: Date;
    landkode: string;
}

type UtenlandsoppholdInnenforEØS = UtenlandsoppholdBase & {
    type: 'innenfor_eøs';
    erUtenforEØS: false;
    erSammenMedBarnet: boolean;
};

type UtenlandsoppholdUtenforEØS = UtenlandsoppholdBase & {
    type: 'utenfor_eøs';
    erUtenforEØS: true;
    erSammenMedBarnet: boolean;
    erBarnetInnlagt?: boolean;
    barnInnlagtPerioder?: UtenlandsoppholdInnlagtPeriode[];
    årsak?: UtenlandsoppholdÅrsak;
};

export type UtenlandsoppholdEnkel = UtenlandsoppholdBase & {
    type: 'enkel';
};

export type UtenlandsoppholdUtvidet = UtenlandsoppholdInnenforEØS | UtenlandsoppholdUtenforEØS;

export type Utenlandsopphold = UtenlandsoppholdEnkel | UtenlandsoppholdUtvidet;
