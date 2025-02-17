/* eslint-disable @typescript-eslint/no-unused-vars */
import { DateRange } from '@navikt/sif-common-formik-ds';
import { ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import {
    ArbeidsperiodeIForholdTilSøknadsperiode,
    getArbeidsperiodeIForholdTilSøknadsperiode,
    periodeInneholderToHeleArbeidsuker,
    summerArbeidstimerIArbeidsuker,
} from '../arbeidstidStepUtils';

describe('arbeidstidStepUtils', () => {
    describe('summerArbeidstimerIArbeidsuker', () => {
        const periode = ISODateRangeToDateRange('2022-01-03/2022-01-09');
        it('returnerer 0 ved 0 timer', () => {
            const result = summerArbeidstimerIArbeidsuker([{ periode, timer: 0 }]);
            expect(result).toEqual(0);
        });
        it('summerer riktig', () => {
            const result = summerArbeidstimerIArbeidsuker([
                { periode, timer: 1 },
                { periode, timer: 2 },
                { periode, timer: 3 },
            ]);
            expect(result).toEqual(6);
        });
    });

    describe('getArbeidsperiodeIForholdTilSøknadsperiode', () => {
        const mandag: Date = ISODateToDate('2022-01-03');
        const tirsdag: Date = ISODateToDate('2022-01-04');
        const torsdag: Date = ISODateToDate('2022-01-06');
        const fredag: Date = ISODateToDate('2022-01-07');

        it('returnerer starterIPerioden når arbeidsperiode starter i søknadsperioden', () => {
            const arbeidsperiode: DateRange = {
                from: tirsdag,
                to: fredag,
            };
            const søknadsperiode: DateRange = {
                from: mandag,
                to: fredag,
            };
            expect(getArbeidsperiodeIForholdTilSøknadsperiode(arbeidsperiode, søknadsperiode)).toEqual(
                ArbeidsperiodeIForholdTilSøknadsperiode.starterIPerioden,
            );
        });
        it('returnerer slutterIPerioden når arbeidsperiode slutter i søknadsperioden', () => {
            const arbeidsperiode: DateRange = {
                from: mandag,
                to: torsdag,
            };
            const søknadsperiode: DateRange = {
                from: mandag,
                to: fredag,
            };
            expect(getArbeidsperiodeIForholdTilSøknadsperiode(arbeidsperiode, søknadsperiode)).toEqual(
                ArbeidsperiodeIForholdTilSøknadsperiode.slutterIPerioden,
            );
        });
        it('returnerer starterOgSlutterIPerioden når arbeidsperiode starter og slutter i søknadsperioden', () => {
            const arbeidsperiode: DateRange = {
                from: tirsdag,
                to: torsdag,
            };
            const søknadsperiode: DateRange = {
                from: mandag,
                to: fredag,
            };
            expect(getArbeidsperiodeIForholdTilSøknadsperiode(arbeidsperiode, søknadsperiode)).toEqual(
                ArbeidsperiodeIForholdTilSøknadsperiode.starterOgSlutterIPerioden,
            );
        });
        it('returnerer gjelderHelePerioden når arbeidsperiode starter og slutter samme dager som søknadsperioden', () => {
            const arbeidsperiode: DateRange = {
                from: mandag,
                to: fredag,
            };
            const søknadsperiode: DateRange = {
                from: mandag,
                to: fredag,
            };
            expect(getArbeidsperiodeIForholdTilSøknadsperiode(arbeidsperiode, søknadsperiode)).toEqual(
                ArbeidsperiodeIForholdTilSøknadsperiode.gjelderHelePerioden,
            );
        });
    });
    describe('periodeInneholderToHeleArbeidsuker', () => {
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
});
