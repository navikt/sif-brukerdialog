export interface FraværPeriode {
    id?: string;
    fraOgMed: Date;
    tilOgMed: Date;
}

export type FraværPeriodeFormValues = Partial<{
    id: string;
    fraOgMed: string;
    tilOgMed: string;
}>;

export interface FraværDag {
    id?: string;
    dato: Date;
    timerArbeidsdag: string;
    timerFravær: string;
}

export type FraværDagFormValues = Partial<
    Omit<FraværDag, 'dato'> & {
        dato: string;
    }
>;
