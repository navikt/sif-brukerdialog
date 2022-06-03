"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const dateUtils_1 = require("../dateUtils");
const durationUtils_1 = require("../durationUtils");
const durationWeekdaysUtils_1 = require("../durationWeekdaysUtils");
const types_1 = require("../types");
const duration = {
    hours: '1',
    minutes: '0',
};
const fullWeek = {
    monday: Object.assign({}, duration),
    tuesday: Object.assign({}, duration),
    wednesday: Object.assign({}, duration),
    thursday: Object.assign({}, duration),
    friday: Object.assign({}, duration),
};
describe('workDurationUtils', () => {
    describe('summarizeDurationInDurationWeekdays', () => {
        it('sum hours correctly', () => {
            const sum = (0, durationWeekdaysUtils_1.summarizeDurationInDurationWeekdays)({
                monday: { hours: '1', minutes: '0' },
                tuesday: { hours: '1', minutes: '0' },
                wednesday: { hours: '1', minutes: '0' },
                thursday: { hours: '1', minutes: '0' },
                friday: { hours: '1', minutes: '0' },
            });
            expect(sum.hours).toBe(5);
            expect(sum.minutes).toBe(0);
        });
        it('sum hours and minutes correctly', () => {
            const sum = (0, durationWeekdaysUtils_1.summarizeDurationInDurationWeekdays)({
                monday: { hours: '1', minutes: '5' },
                tuesday: { hours: '1', minutes: '5' },
                wednesday: { hours: '1', minutes: '5' },
                thursday: { hours: '1', minutes: '5' },
                friday: { hours: '1', minutes: '10' },
            });
            expect(sum.hours).toBe(5);
            expect(sum.minutes).toBe(30);
        });
    });
    describe('getDurationForISOWeekdayNumber', () => {
        const durations = {
            monday: { hours: '1', minutes: '0' },
            tuesday: { hours: '2', minutes: '0' },
            wednesday: { hours: '3', minutes: '0' },
            thursday: { hours: '4', minutes: '0' },
            friday: { hours: '5', minutes: '0' },
        };
        it('returns correctly for monday', () => {
            const result = (0, __1.getDurationForISOWeekdayNumber)(durations, 1);
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.hours).toEqual('1');
            expect(result === null || result === void 0 ? void 0 : result.minutes).toEqual('0');
        });
        it('returns correctly for tuesday', () => {
            const result = (0, __1.getDurationForISOWeekdayNumber)(durations, 2);
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.hours).toEqual('2');
            expect(result === null || result === void 0 ? void 0 : result.minutes).toEqual('0');
        });
        it('returns correctly for wednesday', () => {
            const result = (0, __1.getDurationForISOWeekdayNumber)(durations, 3);
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.hours).toEqual('3');
            expect(result === null || result === void 0 ? void 0 : result.minutes).toEqual('0');
        });
        it('returns correctly for thursday', () => {
            const result = (0, __1.getDurationForISOWeekdayNumber)(durations, 4);
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.hours).toEqual('4');
            expect(result === null || result === void 0 ? void 0 : result.minutes).toEqual('0');
        });
        it('returns correctly for friday', () => {
            const result = (0, __1.getDurationForISOWeekdayNumber)(durations, 5);
            expect(result).toBeDefined();
            expect(result === null || result === void 0 ? void 0 : result.hours).toEqual('5');
            expect(result === null || result === void 0 ? void 0 : result.minutes).toEqual('0');
        });
    });
    describe('getWeekdaysWithDuration', () => {
        it('returnerer alle ukedager når alle ukedager har varighet', () => {
            const weekdays = (0, durationWeekdaysUtils_1.getWeekdaysWithDuration)(fullWeek);
            expect(weekdays.length).toEqual(5);
            expect(weekdays[0]).toEqual(types_1.Weekday.monday);
            expect(weekdays[1]).toEqual(types_1.Weekday.tuesday);
            expect(weekdays[2]).toEqual(types_1.Weekday.wednesday);
            expect(weekdays[3]).toEqual(types_1.Weekday.thursday);
            expect(weekdays[4]).toEqual(types_1.Weekday.friday);
        });
        it('returnerer ikke ukedag som har varighet === undefined ', () => {
            const weekdays = (0, durationWeekdaysUtils_1.getWeekdaysWithDuration)({ thursday: { hours: '1', minutes: '0' }, friday: undefined });
            expect(weekdays.length).toEqual(1);
            expect(weekdays[0]).toEqual(types_1.Weekday.thursday);
        });
        it('returnerer ikke ukedag som har varighet === 0 timer 0 minutter ', () => {
            const weekdays = (0, durationWeekdaysUtils_1.getWeekdaysWithDuration)({
                thursday: { hours: '1', minutes: '0' },
                friday: { hours: '0', minutes: '0' },
            });
            expect(weekdays.length).toEqual(1);
            expect(weekdays[0]).toEqual(types_1.Weekday.thursday);
        });
    });
    describe('getAllWeekdaysWithoutDuration', () => {
        it('returnerer ingen ukedager når alle ukedager har varighet', () => {
            const weekdays = (0, durationWeekdaysUtils_1.getAllWeekdaysWithoutDuration)(fullWeek);
            expect(weekdays.length).toEqual(0);
        });
        it('returnerer alle ukedager når ingen ukedager har varighet', () => {
            const weekdays = (0, durationWeekdaysUtils_1.getAllWeekdaysWithoutDuration)({});
            expect(weekdays.length).toEqual(5);
            expect(weekdays[0]).toEqual(types_1.Weekday.monday);
            expect(weekdays[1]).toEqual(types_1.Weekday.tuesday);
            expect(weekdays[2]).toEqual(types_1.Weekday.wednesday);
            expect(weekdays[3]).toEqual(types_1.Weekday.thursday);
            expect(weekdays[4]).toEqual(types_1.Weekday.friday);
        });
        it('returnerer ukedag som har varighet === undefined, eller som ikke er definert i weekdays', () => {
            const weekdays = (0, durationWeekdaysUtils_1.getAllWeekdaysWithoutDuration)({ friday: { hours: '1', minutes: '0' } });
            expect(weekdays.length).toEqual(4);
            expect(weekdays[3]).toEqual(types_1.Weekday.thursday);
        });
        it('returnerer alle ukedager som har varighet === 0 timer 0 minutter, eller som ikke er definert i weekdays', () => {
            const weekdays = (0, durationWeekdaysUtils_1.getAllWeekdaysWithoutDuration)({
                monday: { hours: '1', minutes: '0' },
                tuesday: { hours: '0', minutes: '0' },
                thursday: { hours: '1', minutes: '0' },
                friday: { hours: '0', minutes: '0' },
            });
            expect(weekdays.length).toEqual(3);
            expect(weekdays[0]).toEqual(types_1.Weekday.tuesday);
            expect(weekdays[1]).toEqual(types_1.Weekday.wednesday);
            expect(weekdays[2]).toEqual(types_1.Weekday.friday);
        });
    });
    describe('getDateDurationMapFromDurationWeekdaysInDateRange', () => {
        const periode = {
            from: (0, dateUtils_1.ISODateToDate)('2022-01-03'),
            to: (0, dateUtils_1.ISODateToDate)('2022-01-12'),
        };
        const durationWeekdays = {
            monday: (0, durationUtils_1.ISODurationToDuration)('PT1H0M'),
            tuesday: (0, durationUtils_1.ISODurationToDuration)('PT2H0M'),
            thursday: (0, durationUtils_1.ISODurationToDuration)('PT3H0M'),
            friday: (0, durationUtils_1.ISODurationToDuration)('PT4H0M'),
        };
        it('returnerer alle dager riktig', () => {
            const result = (0, durationWeekdaysUtils_1.getDateDurationMapFromDurationWeekdaysInDateRange)(periode, durationWeekdays);
            expect(Object.keys(result).length).toEqual(6);
            expect((0, durationUtils_1.durationToISODuration)(result['2022-01-03'])).toEqual('PT1H0M');
            expect((0, durationUtils_1.durationToISODuration)(result['2022-01-04'])).toEqual('PT2H0M');
            expect(result['2022-01-05']).toBeUndefined();
            expect((0, durationUtils_1.durationToISODuration)(result['2022-01-06'])).toEqual('PT3H0M');
            expect((0, durationUtils_1.durationToISODuration)(result['2022-01-07'])).toEqual('PT4H0M');
            expect((0, durationUtils_1.durationToISODuration)(result['2022-01-10'])).toEqual('PT1H0M');
            expect((0, durationUtils_1.durationToISODuration)(result['2022-01-11'])).toEqual('PT2H0M');
            expect(result['2022-01-12']).toBeUndefined();
        });
    });
    describe('ensureCompleteDurationWeekdays', () => {
        const duration = { hours: '2', minutes: '10' };
        const noDuration = { hours: '0', minutes: '0' };
        it('endrer ikke allerede komplett durationWeekdays', () => {
            const dw = {
                [types_1.Weekday.monday]: Object.assign({}, duration),
                [types_1.Weekday.tuesday]: Object.assign({}, duration),
                [types_1.Weekday.wednesday]: Object.assign({}, duration),
                [types_1.Weekday.thursday]: Object.assign({}, duration),
                [types_1.Weekday.friday]: Object.assign({}, duration),
            };
            const result = (0, durationWeekdaysUtils_1.ensureCompleteDurationWeekdays)(dw);
            expect((0, durationUtils_1.durationToISODuration)(result[types_1.Weekday.monday])).toEqual((0, durationUtils_1.durationToISODuration)(duration));
            expect((0, durationUtils_1.durationToISODuration)(result[types_1.Weekday.tuesday])).toEqual((0, durationUtils_1.durationToISODuration)(duration));
            expect((0, durationUtils_1.durationToISODuration)(result[types_1.Weekday.wednesday])).toEqual((0, durationUtils_1.durationToISODuration)(duration));
            expect((0, durationUtils_1.durationToISODuration)(result[types_1.Weekday.thursday])).toEqual((0, durationUtils_1.durationToISODuration)(duration));
            expect((0, durationUtils_1.durationToISODuration)(result[types_1.Weekday.friday])).toEqual((0, durationUtils_1.durationToISODuration)(duration));
        });
        it('fyller ut en ukomplett uke', () => {
            const dw = {
                [types_1.Weekday.monday]: Object.assign({}, duration),
                [types_1.Weekday.friday]: Object.assign({}, duration),
            };
            const result = (0, durationWeekdaysUtils_1.ensureCompleteDurationWeekdays)(dw);
            expect((0, durationUtils_1.durationToISODuration)(result[types_1.Weekday.monday])).toEqual((0, durationUtils_1.durationToISODuration)(duration));
            expect((0, durationUtils_1.durationToISODuration)(result[types_1.Weekday.tuesday])).toEqual((0, durationUtils_1.durationToISODuration)(noDuration));
            expect((0, durationUtils_1.durationToISODuration)(result[types_1.Weekday.wednesday])).toEqual((0, durationUtils_1.durationToISODuration)(noDuration));
            expect((0, durationUtils_1.durationToISODuration)(result[types_1.Weekday.thursday])).toEqual((0, durationUtils_1.durationToISODuration)(noDuration));
            expect((0, durationUtils_1.durationToISODuration)(result[types_1.Weekday.friday])).toEqual((0, durationUtils_1.durationToISODuration)(duration));
        });
        it('fyller ut en ukomplette dager', () => {
            const dw = {
                [types_1.Weekday.tuesday]: { hours: '20' },
                [types_1.Weekday.wednesday]: { minutes: '10' },
            };
            const result = (0, durationWeekdaysUtils_1.ensureCompleteDurationWeekdays)(dw);
            expect(result[types_1.Weekday.tuesday].hours).toEqual('20');
            expect(result[types_1.Weekday.tuesday].minutes).toEqual('0');
            expect(result[types_1.Weekday.wednesday].hours).toEqual('0');
            expect(result[types_1.Weekday.wednesday].minutes).toEqual('10');
        });
    });
});
