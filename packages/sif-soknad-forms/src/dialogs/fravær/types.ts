export interface FraværPeriode {
    id: string;
    fraOgMed: Date;
    tilOgMed: Date;
}

export interface FraværDag {
    id: string;
    dato: Date;
    timerArbeidsdag: string;
    timerFravær: string;
}
