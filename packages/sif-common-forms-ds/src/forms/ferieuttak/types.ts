export interface Ferieuttak {
    id?: string;
    fom: Date;
    tom: Date;
}

export type FerieuttakFormValues = {
    fom?: string;
    tom?: string;
};
