import { describe, expect, it } from 'vitest';
import { mapPeriodeDtoToDateRange, mapPeriodeDtoToOpenDateRange } from '../parseOppgaverElement';

describe('mapPeriodeDtoToOpenDateRange', () => {
    it('mapper fomDato og tomDato til OpenDateRange med from og to', () => {
        const result = mapPeriodeDtoToOpenDateRange({ fomDato: '2025-01-01', tomDato: '2025-01-31' });
        expect(result.from).toEqual(new Date('2025-01-01'));
        expect(result.to).toEqual(new Date('2025-01-31'));
    });

    it('mapper fomDato uten tomDato til OpenDateRange med to === undefined', () => {
        const result = mapPeriodeDtoToOpenDateRange({ fomDato: '2025-06-15' });
        expect(result.from).toEqual(new Date('2025-06-15'));
        expect(result.to).toBeUndefined();
    });

    it('mapper fomDato med tomDato === undefined til OpenDateRange med to === undefined', () => {
        const result = mapPeriodeDtoToOpenDateRange({ fomDato: '2025-03-01', tomDato: undefined });
        expect(result.from).toEqual(new Date('2025-03-01'));
        expect(result.to).toBeUndefined();
    });

    it('kaster feil ved ugyldig fomDato', () => {
        expect(() => mapPeriodeDtoToOpenDateRange({ fomDato: 'ikke-en-dato' })).toThrow(
            'Ugyldig datoformat for fom i periode: ikke-en-dato',
        );
    });

    it('kaster feil ved ugyldig tomDato', () => {
        expect(() => mapPeriodeDtoToOpenDateRange({ fomDato: '2025-01-01', tomDato: 'ugyldig' })).toThrow(
            'Ugyldig datoformat for tom i periode: ugyldig',
        );
    });
});

describe('mapPeriodeDtoToDateRange', () => {
    it('mapper fomDato og tomDato til DateRange', () => {
        const result = mapPeriodeDtoToDateRange({ fomDato: '2025-01-01', tomDato: '2025-01-31' });
        expect(result.from).toEqual(new Date('2025-01-01'));
        expect(result.to).toEqual(new Date('2025-01-31'));
    });

    it('kaster feil ved ugyldig fomDato', () => {
        expect(() => mapPeriodeDtoToDateRange({ fomDato: 'ikke-en-dato', tomDato: '2025-01-31' })).toThrow(
            'Ugyldig datoformat for fom i periode: ikke-en-dato',
        );
    });

    it('kaster feil når tomDato er undefined', () => {
        expect(() => mapPeriodeDtoToDateRange({ fomDato: '2025-01-01' })).toThrow(
            'Udefinert tom i periode: undefined',
        );
    });

    it('kaster feil ved ugyldig tomDato', () => {
        expect(() => mapPeriodeDtoToDateRange({ fomDato: '2025-01-01', tomDato: 'ugyldig' })).toThrow(
            'Ugyldig datoformat for tom i periode: ugyldig',
        );
    });
});
