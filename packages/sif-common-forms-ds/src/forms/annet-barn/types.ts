export enum BarnType {
    'fosterbarn' = 'FOSTERBARN',
    'annet' = 'ANNET',
}
export interface AnnetBarn {
    id?: string;
    fnr: string;
    fødselsdato: Date;
    navn: string;
    type?: BarnType;
}

export type AnnetBarnFormValues = Partial<
    Omit<AnnetBarn, 'fødselsdato' | 'id'> & {
        fødselsdato: string;
    }
>;
