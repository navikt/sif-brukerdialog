import { DateRange } from '@navikt/sif-common-utils';
import { dateToISOString } from '@navikt/sif-common-formik-ds';
import {
    dateCollideWithRanges,
    mapFormValuesToFraværDag,
    mapFormValuesToFraværPeriode,
    rangeCollideWithRanges,
    timeText,
} from '../fraværUtilities';
import { validateNoCollisions } from '../fraværValidationUtils';
import { FraværPeriodeFormValues, FraværDagFormValues, FraværDag, FraværPeriode } from '../types';

describe('timeText', () => {
    it('gir entall', () => {
        expect(timeText('0')).toEqual('time');
        expect(timeText('0.5')).toEqual('time');
        expect(timeText('1')).toEqual('time');
    });
    it('gir flertall', () => {
        expect(timeText('1.5')).toEqual('timer');
        expect(timeText('2')).toEqual('timer');
        expect(timeText('2.5')).toEqual('timer');
        expect(timeText('23.5')).toEqual('timer');
        expect(timeText('24')).toEqual('timer');
    });

    describe('mapFormValuesToFraværDag', () => {
        const formValues: FraværDagFormValues = {
            id: 'abc',
            dato: '2000-10-10',
            timerArbeidsdag: '2',
            timerFravær: '1',
        };
        it('maps all values when form is complete', () => {
            const result = mapFormValuesToFraværDag(formValues, 'abc');
            expect(result.id).toEqual('abc');
            expect(dateToISOString(result.dato)).toEqual('2000-10-10');
            expect(result.timerArbeidsdag).toEqual('2');
            expect(result.timerFravær).toEqual('1');
        });
    });

    describe('mapFormValuesToFraværPeriode', () => {
        const formValues: FraværPeriodeFormValues = {
            id: 'abc',
            fraOgMed: '2000-10-10',
            tilOgMed: '2000-10-11',
        };
        it('maps all values when form is complete ', () => {
            const result = mapFormValuesToFraværPeriode(formValues, 'abc');
            expect(result.id).toEqual('abc');
            expect(dateToISOString(result.fraOgMed)).toEqual('2000-10-10');
            expect(dateToISOString(result.tilOgMed)).toEqual('2000-10-11');
        });
    });
    describe('dateCollideWithRanges', () => {
        const periode: DateRange = { from: new Date(2020, 5, 1), to: new Date(2020, 5, 10) };
        it('returns false if some values are undefined', () => {
            const date: Date = new Date(2020, 5, 2);
            expect(dateCollideWithRanges(undefined, [periode])).toBeFalsy();
            expect(dateCollideWithRanges(date, [])).toBeFalsy();
        });
        it('returns false if date is outside of ranges', () => {
            expect(dateCollideWithRanges(new Date(2020, 4, 1), [periode])).toBeFalsy();
            expect(dateCollideWithRanges(new Date(2020, 6, 1), [periode])).toBeFalsy();
        });
        it('returns true if date collides with a range', () => {
            expect(dateCollideWithRanges(new Date(2020, 5, 1), [periode])).toBeTruthy();
            expect(dateCollideWithRanges(new Date(2020, 5, 2), [periode])).toBeTruthy();
            expect(dateCollideWithRanges(new Date(2020, 5, 10), [periode])).toBeTruthy();
        });
    });
    describe('rangeCollideWithRanges', () => {
        const range: DateRange = { from: new Date(2020, 5, 1), to: new Date(2020, 5, 10) };

        it('returns false if ranges is empty', () => {
            const from: Date = new Date(2020, 5, 2);
            const to: Date = new Date(2020, 5, 3);
            expect(rangeCollideWithRanges({ from, to }, [])).toBeFalsy();
        });

        it('returnerer undefined dersom en periode ikke er del av annen periode', () => {
            const from: Date = new Date(2020, 5, 2);
            const to: Date = new Date(2020, 5, 3);
            const result = rangeCollideWithRanges({ from, to }, []);
            expect(result).toBeFalsy();
        });

        it('returnerer error dersom en periode starter inne i annen periode', () => {
            const from: Date = new Date(2020, 5, 2);
            const to: Date = new Date(2020, 5, 3);
            const result = rangeCollideWithRanges({ from, to }, [range]);
            expect(result).toBeTruthy();
        });

        it('returnerer error dersom en periode slutter inne i annen periode', () => {
            const from: Date = new Date(2020, 4, 5);
            const to: Date = new Date(2020, 5, 3);
            const result = rangeCollideWithRanges({ from, to }, [range]);
            expect(result).toBeTruthy();
        });

        it('returnerer error dersom en periode omkranser en annen periode', () => {
            const from: Date = new Date(2020, 4, 2);
            const to: Date = new Date(2020, 6, 3);
            const result = rangeCollideWithRanges({ from, to }, [range]);
            expect(result).toBeTruthy();
        });
    });
    describe('validateNoCollisions', () => {
        const fraværDag: FraværDag = {
            dato: new Date(2020, 10, 1),
            timerArbeidsdag: '2',
            timerFravær: '2',
        };
        const fraværPeriode: FraværPeriode = {
            fraOgMed: new Date(2020, 10, 1),
            tilOgMed: new Date(2020, 10, 20),
        };

        const dag1: FraværDag = { ...fraværDag, dato: new Date(2020, 10, 1) };
        const dag2: FraværDag = { ...fraværDag, dato: new Date(2020, 10, 2) };

        const periode1: FraværPeriode = { ...fraværPeriode };
        const periode2: FraværPeriode = {
            ...fraværPeriode,
            fraOgMed: new Date(2020, 1, 1),
            tilOgMed: new Date(2020, 11, 31),
        };
        const periode3: FraværPeriode = {
            ...fraværPeriode,
            fraOgMed: new Date(2021, 1, 1),
            tilOgMed: new Date(2021, 11, 31),
        };

        describe('detects no collisions when', () => {
            it('has no data', () => {
                expect(validateNoCollisions([], [])).toBeUndefined();
            });
            it('has only dates and none of then are colliding', () => {
                expect(validateNoCollisions([dag1, dag2], [])).toBeUndefined();
            });
            it('has dates and ranges and none of then are colliding', () => {
                expect(validateNoCollisions([dag1, dag2], [periode3])).toBeUndefined();
            });
        });
        describe('detects collisions when', () => {
            it('to dates collide', () => {
                expect(validateNoCollisions([{ ...dag1 }, { ...dag1 }], [])).toBeDefined();
            });
            it('a date collide with a range', () => {
                expect(validateNoCollisions([dag1], [periode1])).toBeDefined();
            });
            it('a range surrounds a date', () => {
                expect(validateNoCollisions([dag1], [periode2])).toBeDefined();
            });
            it('a range surrounds another range', () => {
                expect(validateNoCollisions([], [periode1, periode2])).toBeDefined();
            });
        });
    });
});
