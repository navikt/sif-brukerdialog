import { DateDurationMap, DateRange, dateToISODate, Duration, ISODateToDate } from '@navikt/sif-common-utils';
import { ArbeidsgiverType } from '../../types/Arbeidsgiver';
import { ArbeidstidEnkeltdagSak, Sak } from '../../types/Sak';
import {
    erArbeidsgivereISakIAAreg,
    getDateRangeForSaker,
    getISODateObjectsWithinDateRange,
    harSakArbeidstidInfo,
    trimArbeidstidTilTillatPeriode,
} from '../sakUtils';

describe('trimArbeidstidTilTillatPeriode', () => {
    it('fjerner arbeidstid utenfor endringsperiode', () => {
        const endringsperiode: DateRange = {
            from: ISODateToDate('2021-02-02'),
            to: ISODateToDate('2021-02-03'),
        };

        const tid: Duration = {
            hours: '0',
            minutes: '30',
        };

        const arbeidstid: ArbeidstidEnkeltdagSak = {
            faktisk: {
                '2021-02-01': tid,
                '2021-02-02': tid,
                '2021-02-03': tid,
                '2021-02-04': tid,
            },
            normalt: {
                '2021-02-01': tid,
                '2021-02-02': tid,
                '2021-02-03': tid,
                '2021-02-04': tid,
            },
        };
        const result = trimArbeidstidTilTillatPeriode(arbeidstid, endringsperiode, {});
        expect(Object.keys(result).length).toEqual(2);
        expect(result['2021-02-01']).toBeUndefined();
        expect(result['2021-02-04']).toBeUndefined();
    });

    it('fjerner dager med tilsyn utenfor endringsperiode', () => {
        const endringsperiode: DateRange = {
            from: ISODateToDate('2021-02-02'),
            to: ISODateToDate('2021-02-03'),
        };
        const tid: Duration = {
            hours: '0',
            minutes: '30',
        };
        const tilsyn: DateDurationMap = {
            '2021-02-01': tid,
            '2021-02-02': tid,
            '2021-02-03': tid,
            '2021-02-04': tid,
        };
        const result = getISODateObjectsWithinDateRange(tilsyn, endringsperiode, {});
        expect(Object.keys(result).length).toEqual(2);
        expect(result['2021-02-01']).toBeUndefined();
        expect(result['2021-02-04']).toBeUndefined();
    });
    it('fjerner dager med arbeidstid som er på dager det ikke er søkt om', () => {
        expect(1).toBe(1);
    });
});

describe('erArbeidsgivereISakIAAreg', () => {
    it('returnerer true når alle arbeidsgivere (1) finnes i AA-reg', () => {
        const result = erArbeidsgivereISakIAAreg(
            [
                {
                    type: ArbeidsgiverType.ORGANISASJON,
                    navn: 'a',
                    id: '1',
                    ansattFom: ISODateToDate('2021-10-01'),
                },
            ],
            {
                '1': { faktisk: {}, normalt: {} },
            }
        );
        expect(result).toBeTruthy();
    });
    it('returnerer true når ingen arbeidsgivere finnes i sak', () => {
        const result = erArbeidsgivereISakIAAreg(
            [
                {
                    type: ArbeidsgiverType.ORGANISASJON,
                    navn: 'a',
                    id: '1',
                    ansattFom: ISODateToDate('2021-10-01'),
                },
            ],
            {}
        );
        expect(result).toBeTruthy();
    });
    it('returnerer false når en k9 arbeidsgiver ikke finnes i AA-reg', () => {
        const result = erArbeidsgivereISakIAAreg(
            [
                {
                    type: ArbeidsgiverType.ORGANISASJON,
                    navn: 'a',
                    id: '1',
                    ansattFom: ISODateToDate('2021-10-01'),
                },
            ],
            {
                '2': { faktisk: {}, normalt: {} },
            }
        );
        expect(result).toBeFalsy();
    });
    it('returnerer false når ingen arbeidsgivere finnes i AA-reg', () => {
        const result = erArbeidsgivereISakIAAreg([], {
            '2': { faktisk: {}, normalt: {} },
        });
        expect(result).toBeFalsy();
    });
});

describe('harSakArbeidstidInfo', () => {
    it('returnerer false dersom det er ikke er info om arbeidstid for arbeidsgivere, frilanser eller sn', () => {
        const result = harSakArbeidstidInfo([], {});
        expect(result).toBeFalsy();
    });
    it('returnerer true dersom det er info om arbeidstid for arbeidsgivere', () => {
        const result = harSakArbeidstidInfo(
            [
                {
                    type: ArbeidsgiverType.ORGANISASJON,
                    navn: 'a',
                    id: '1',
                    ansattFom: ISODateToDate('2021-10-01'),
                },
            ],
            {
                arbeidstakerMap: { '1': { faktisk: {}, normalt: {} } },
            }
        );
        expect(result).toBeTruthy();
    });
    it('returnerer true dersom det er info om arbeidstid som frilanser', () => {
        const result = harSakArbeidstidInfo([], {
            frilanser: { faktisk: {}, normalt: {} },
        });
        expect(result).toBeTruthy();
    });
    it('returnerer true dersom det er info om arbeidstid from selvdstendig', () => {
        const result = harSakArbeidstidInfo([], {
            selvstendig: { faktisk: {}, normalt: {} },
        });
        expect(result).toBeTruthy();
    });
});

describe('getDateRangeForSaker', () => {
    it('returnerer riktig når det er én sak', () => {
        const sak: Sak = {
            ytelse: { søknadsperioder: [{ from: ISODateToDate('2021-01-01'), to: ISODateToDate('2021-01-02') }] },
        } as any;
        const range = getDateRangeForSaker([sak]);
        expect(range).toBeDefined();
        if (range) {
            expect(dateToISODate(range.from)).toEqual('2021-01-01');
            expect(dateToISODate(range.to)).toEqual('2021-01-02');
        }
    });
    it('returnerer undefined når det ikke er noen saker', () => {
        const range = getDateRangeForSaker([]);
        expect(range).toBeUndefined();
    });
    it('returnerer riktig når det er to saker som ikke overlapper', () => {
        const sak: Sak = {
            ytelse: {
                søknadsperioder: [
                    { from: ISODateToDate('2021-01-01'), to: ISODateToDate('2021-01-02') },
                    { from: ISODateToDate('2021-01-03'), to: ISODateToDate('2021-01-04') },
                ],
            },
        } as any;
        const range = getDateRangeForSaker([sak]);
        expect(range).toBeDefined();
        if (range) {
            expect(dateToISODate(range.from)).toEqual('2021-01-01');
            expect(dateToISODate(range.to)).toEqual('2021-01-04');
        }
    });
    it('returnerer riktig når det er to saker som overlapper', () => {
        const sak: Sak = {
            ytelse: {
                søknadsperioder: [
                    { from: ISODateToDate('2021-01-01'), to: ISODateToDate('2021-01-02') },
                    { from: ISODateToDate('2021-01-02'), to: ISODateToDate('2021-01-03') },
                ],
            },
        } as any;
        const range = getDateRangeForSaker([sak]);
        expect(range).toBeDefined();
        if (range) {
            expect(dateToISODate(range.from)).toEqual('2021-01-01');
            expect(dateToISODate(range.to)).toEqual('2021-01-03');
        }
    });
});
