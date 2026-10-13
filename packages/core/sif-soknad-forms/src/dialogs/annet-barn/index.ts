import { ISODate } from '@sif/utils';

export enum BarnType {
    fosterbarn = 'FOSTERBARN',
    annet = 'ANNET',
}

export interface AnnetBarn {
    id?: string;
    fnr: string;
    fødselsdato: ISODate;
    navn: string;
    type?: BarnType;
}

export type AnnetBarnFormValues = Partial<
    Omit<AnnetBarn, 'fødselsdato' | 'id'> & {
        fødselsdato: string;
    }
>;

export * from './AnnetBarnDialog';
export * from './AnnetBarnDialogForm';
export * from './AnnetBarnList';
export * from './AnnetBarnListAndDialog';
