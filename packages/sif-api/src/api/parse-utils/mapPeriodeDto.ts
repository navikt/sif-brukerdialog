import { DateRange, isISODate, ISODate, OpenDateRange } from '@sif/utils';

export const mapPeriodeDtoToOpenDateRange = (periode: { fomDato: string; tomDato?: string }): OpenDateRange => {
    if (periode.fomDato && !isISODate(periode.fomDato)) {
        throw new Error(`Ugyldig datoformat for fom i periode: ${periode.fomDato}`);
    }
    if (periode.tomDato && !isISODate(periode.tomDato)) {
        throw new Error(`Ugyldig datoformat for tom i periode: ${periode.tomDato}`);
    }
    return {
        from: periode.fomDato as ISODate,
        to: periode.tomDato ? (periode.tomDato as ISODate) : undefined,
    };
};

export const mapPeriodeDtoToDateRange = (periode: { fomDato: string; tomDato?: string }): DateRange => {
    if (!isISODate(periode.fomDato)) {
        throw new Error(`Ugyldig datoformat for fom i periode: ${periode.fomDato}`);
    }
    if (!periode.tomDato) {
        throw new Error(`Udefinert tom i periode: ${periode.tomDato}`);
    }
    if (!isISODate(periode.tomDato)) {
        throw new Error(`Ugyldig datoformat for tom i periode: ${periode.tomDato}`);
    }
    return {
        from: periode.fomDato as ISODate,
        to: periode.tomDato as ISODate,
    };
};
