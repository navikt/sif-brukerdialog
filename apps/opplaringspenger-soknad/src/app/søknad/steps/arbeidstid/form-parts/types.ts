export interface ArbeidstidRegistrertLogProps {
    onArbeidstidEnkeltdagRegistrert?: (info: { antallDager: number }) => void;
    onArbeidPeriodeRegistrert?: (info: { verdi: 'prosent' | 'ukeplan'; prosent?: string }) => void;
}

export enum ArbeidsforholdType {
    ANSATT = 'ANSATT',
    FRILANSER = 'FRILANSER',
    SELVSTENDIG = 'SELVSTENDIG',
}
