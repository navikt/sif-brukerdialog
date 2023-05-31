import { dateToISODate, ISODateToDate } from '@navikt/sif-common-utils/lib';
import { periodeInneholderToHeleArbeidsuker } from '../../søknad/arbeidstid-step/utils/arbeidstidUtils';
import { getArbeidsdagerPeriode } from '../arbeidsukeInfoUtils';

describe('arbeidsukeInfoUtils', () => {
    describe('periodeInneholderToHeleUker', () => {
        const uke1 = {
            mandag: ISODateToDate('2022-01-03'),
            tirsdag: ISODateToDate('2022-01-04'),
            torsdag: ISODateToDate('2022-01-06'),
            fredag: ISODateToDate('2022-01-07'),
        };
        const uke2 = {
            mandag: ISODateToDate('2022-01-10'),
            fredag: ISODateToDate('2022-01-14'),
        };
        const uke3 = {
            mandag: ISODateToDate('2022-01-17'),
            fredag: ISODateToDate('2022-01-21'),
        };

        it('returner true dersom en starter mandag uke1 i og slutter fredag uke 2', () => {
            expect(periodeInneholderToHeleArbeidsuker({ from: uke1.mandag, to: uke2.fredag })).toBe(true);
        });
        it('returner false dersom en starter mandag uke1 i og slutter torsdag uke 2', () => {
            expect(periodeInneholderToHeleArbeidsuker({ from: uke1.tirsdag, to: uke2.fredag })).toBe(false);
        });
        it('returner false dersom en starter tirsdag uke1 i og slutter fredag uke 2', () => {
            expect(periodeInneholderToHeleArbeidsuker({ from: uke1.tirsdag, to: uke2.fredag })).toBe(false);
        });
        it('returner true dersom en starter fredag uke1 i og slutter fredag uke 3', () => {
            expect(periodeInneholderToHeleArbeidsuker({ from: uke1.fredag, to: uke3.fredag })).toBe(true);
        });
    });

    describe('getArbeidsdagerPeriode', () => {
        const mandag: Date = ISODateToDate('2022-01-03');
        const tirsdag: Date = ISODateToDate('2022-01-04');
        const torsdag: Date = ISODateToDate('2022-01-06');
        const lørdag: Date = ISODateToDate('2022-01-08');
        const søndag: Date = ISODateToDate('2022-01-09');

        it('returnerer mandag til fredag dersom uken går fra mandag til søndag', () => {
            const result = getArbeidsdagerPeriode({ from: mandag, to: søndag });
            expect(result).toBeDefined();
            if (result) {
                expect(dateToISODate(result.from)).toEqual('2022-01-03');
                expect(dateToISODate(result.to)).toEqual('2022-01-07');
            }
        });
        it('returnerer mandag til fredag dersom uken går fra mandag til lørdag', () => {
            const result = getArbeidsdagerPeriode({ from: mandag, to: lørdag });
            expect(result).toBeDefined();
            if (result) {
                expect(dateToISODate(result.from)).toEqual('2022-01-03');
                expect(dateToISODate(result.to)).toEqual('2022-01-07');
            }
        });
        it('returnerer tirsdag til fredag dersom uken går fra tirsdag til lørdag', () => {
            const result = getArbeidsdagerPeriode({ from: tirsdag, to: lørdag });
            expect(result).toBeDefined();
            if (result) {
                expect(dateToISODate(result.from)).toEqual('2022-01-04');
                expect(dateToISODate(result.to)).toEqual('2022-01-07');
            }
        });
        it('returnerer tirsdag til onsdag dersom uken går fra tirsdag til onsdag', () => {
            const result = getArbeidsdagerPeriode({ from: tirsdag, to: torsdag });
            expect(result).toBeDefined();
            if (result) {
                expect(dateToISODate(result.from)).toEqual('2022-01-04');
                expect(dateToISODate(result.to)).toEqual('2022-01-06');
            }
        });
    });
});
