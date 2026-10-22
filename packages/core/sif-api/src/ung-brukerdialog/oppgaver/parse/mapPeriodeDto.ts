import { DateRange, isISODate, ISODate, OpenDateRange } from '@sif/utils';

const tilISODate = (dato: string, felt: 'fom' | 'tom'): ISODate => {
    if (!isISODate(dato)) {
        throw new Error(`Ugyldig datoformat for ${felt} i periode: ${dato}`);
    }
    return dato;
};

export const mapPeriodeDtoToOpenDateRange = (periode: { fomDato: string; tomDato?: string }): OpenDateRange => ({
    from: tilISODate(periode.fomDato, 'fom'),
    to: periode.tomDato ? tilISODate(periode.tomDato, 'tom') : undefined,
});

export const mapPeriodeDtoToDateRange = (periode: { fomDato: string; tomDato: string }): DateRange => ({
    from: tilISODate(periode.fomDato, 'fom'),
    to: tilISODate(periode.tomDato, 'tom'),
});
