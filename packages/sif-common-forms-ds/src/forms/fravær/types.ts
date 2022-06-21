import { YesOrNo } from '@navikt/sif-common-core/lib/types/YesOrNo';

export enum FraværÅrsak {
    'stengtSkoleBhg' = 'STENGT_SKOLE_ELLER_BARNEHAGE',
    'smittevernhensyn' = 'SMITTEVERNHENSYN',
    'ordinært' = 'ORDINÆRT_FRAVÆR',
}

export interface FraværPeriode {
    id?: string;
    fraOgMed: Date;
    tilOgMed: Date;
    årsak: FraværÅrsak;
}

export type FraværPeriodeFormValues = Partial<{
    id: string;
    fraOgMed: string;
    tilOgMed: string;
    hjemmePgaKorona: YesOrNo;
    årsak: FraværÅrsak;
}>;

export interface FraværDag {
    id?: string;
    dato: Date;
    timerArbeidsdag: string;
    timerFravær: string;
    årsak: FraværÅrsak;
}

export type FraværDagFormValues = Partial<
    Omit<FraværDag, 'dato'> & {
        dato: string;
        hjemmePgaKorona: YesOrNo;
        årsak?: FraværÅrsak;
    }
>;
