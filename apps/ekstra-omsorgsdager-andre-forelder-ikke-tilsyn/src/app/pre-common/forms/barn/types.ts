export interface AndreBarn {
    id?: string;
    fnr: string;
    navn: string;
}

export type BarnFormValues = Partial<AndreBarn>;
