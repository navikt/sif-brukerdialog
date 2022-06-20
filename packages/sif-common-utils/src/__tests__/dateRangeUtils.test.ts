import dayjs from 'dayjs';
import {
    DateRange,
    dateRangesCollide,
    dateRangeToISODateRange,
    datesCollideWithDateRanges,
    dateToISODate,
    getDateRangeFromDateRanges,
    getDateRangesBetweenDateRanges,
    getDatesInDateRange,
    getDatesInMonthOutsideDateRange,
    getISODatesInISODateRange,
    getMonthDateRange,
    getMonthsInDateRange,
    getNumberOfDaysInDateRange,
    getWeekDateRange,
    getWeeksInDateRange,
    getYearsInDateRanges,
    isDateInDateRange,
    isDateInMaybeDateRange,
    isDateInsideDateRange,
    isDateRange,
    ISODateRangeToDateRange,
    ISODateRangeToISODates,
    ISODateToDate,
    ISODateToISODateRange,
    sortDateRange,
    sortDateRangeByToDate,
} from '..';

describe('dateRangeUtils', () => {
    const from: Date = ISODateToDate('2020-01-01');
    const to: Date = ISODateToDate('2020-01-03');

    describe('isDateRange', () => {
        it('returns false when not DateRange', () => {
            expect(isDateRange({ from: undefined, to })).toBeFalsy();
            expect(isDateRange({ from, to: undefined })).toBeFalsy();
            expect(isDateRange({ from: undefined, to: undefined })).toBeFalsy();
        });
        it('returns true when it is a DateRange', () => {
            const from: Date = ISODateToDate('2020-01-1');
            const to: Date = ISODateToDate('2020-01-1');
            expect(isDateRange({ from, to })).toBeTruthy();
        });
    });
    describe('sortDateRange', () => {
        const dateRange1: DateRange = {
            from: ISODateToDate('2020-01-01'),
            to: ISODateToDate('2020-01-02'),
        };
        const dateRange2: DateRange = {
            from: ISODateToDate('2020-02-01'),
            to: ISODateToDate('2020-02-02'),
        };
        it('sorts correctly by from-date', () => {
            expect(sortDateRange(dateRange1, dateRange2)).toEqual(-1);
            expect(sortDateRange(dateRange1, dateRange1)).toEqual(-1);
            expect(sortDateRange(dateRange2, dateRange1)).toEqual(1);
        });
    });
    describe('sortDateRangeByToDate', () => {
        const dateRange1: DateRange = {
            from: ISODateToDate('2020-02-01'),
            to: ISODateToDate('2020-02-05'),
        };
        const dateRange2: DateRange = {
            from: ISODateToDate('2020-02-01'),
            to: ISODateToDate('2020-02-02'),
        };
        it('sorts correctly by to-date', () => {
            expect(sortDateRangeByToDate(dateRange1, dateRange2)).toEqual(1);
            expect(sortDateRangeByToDate(dateRange1, dateRange1)).toEqual(-1);
            expect(sortDateRangeByToDate(dateRange2, dateRange1)).toEqual(-1);
        });
    });
    describe('dateRangesCollide', () => {
        const dateRange1: DateRange = {
            from: ISODateToDate('2020-02-01'),
            to: ISODateToDate('2020-02-02'),
        };
        const dateRange2: DateRange = {
            from: ISODateToDate('2020-02-03'),
            to: ISODateToDate('2020-02-04'),
        };
        const dateRange3: DateRange = {
            from: ISODateToDate('2020-02-2'),
            to: ISODateToDate('2020-02-03'),
        };
        it('detects colliding date ranges', () => {
            expect(dateRangesCollide([dateRange1, dateRange2, dateRange3])).toBeTruthy();
            expect(dateRangesCollide([dateRange1, dateRange3])).toBeTruthy();
            expect(dateRangesCollide([dateRange2, dateRange3])).toBeTruthy();
        });
        it('ignores non colliding date ranges', () => {
            expect(dateRangesCollide([dateRange1, dateRange2])).toBeFalsy();
        });
        it('allows last-date and from-date be same date between ranges if specified', () => {
            expect(dateRangesCollide([dateRange1, dateRange3], true)).toBeFalsy();
        });
        it('detects collision when last-date and from-date is same date, and not set to be allowed', () => {
            expect(dateRangesCollide([dateRange1, dateRange3], false)).toBeTruthy();
        });
        it('detects no collision when array is empty', () => {
            expect(dateRangesCollide([], false)).toBeFalsy();
        });
    });
    describe('datesCollideWithDateRanges', () => {
        const dateBefore = ISODateToDate('2020-02-01');
        const dateBetween = ISODateToDate('2020-02-04');
        const dateAfter = ISODateToDate('2020-02-07');
        const dateInside1 = ISODateToDate('2020-02-02');
        const dateInside2 = ISODateToDate('2020-02-05');
        const dateRange1: DateRange = {
            from: ISODateToDate('2020-02-02'),
            to: ISODateToDate('2020-02-03'),
        };
        const dateRange2: DateRange = {
            from: ISODateToDate('2020-02-05'),
            to: ISODateToDate('2020-02-06'),
        };
        it('returns false when no date ranges defined', () => {
            expect(datesCollideWithDateRanges([dateBefore], [])).toBeFalsy();
        });
        it('detects no collision when dates is outside date ranges', () => {
            expect(
                datesCollideWithDateRanges([dateBefore, dateBetween, dateAfter], [dateRange1, dateRange2])
            ).toBeFalsy();
        });
        it('detects collision when dates is inside one of the date ranges', () => {
            expect(datesCollideWithDateRanges([dateInside1, dateBefore], [dateRange1, dateRange2])).toBeTruthy();
            expect(datesCollideWithDateRanges([dateInside2, dateBefore], [dateRange1, dateRange2])).toBeTruthy();
        });
    });
    describe('isDateInMaybeDateRange', () => {
        const dateBefore = ISODateToDate('2020-01-01');
        const date = ISODateToDate('2020-01-03');
        const from = ISODateToDate('2020-01-02');
        const to = ISODateToDate('2020-01-05');

        it('returns true when date is within valid date range', () => {
            expect(isDateInMaybeDateRange(date, { from, to })).toBeTruthy();
        });
        it('return true when to-date is undefined and date is same or after from-date', () => {
            expect(isDateInMaybeDateRange(date, { from: date })).toBeTruthy();
            expect(isDateInMaybeDateRange(date, { from })).toBeTruthy();
        });
        it('returns false when to-date is undefined and date is before from-date', () => {
            expect(isDateInMaybeDateRange(dateBefore, { from })).toBeFalsy();
        });
        it('returns true when from-date is undefined and date is same or before to-date', () => {
            expect(isDateInMaybeDateRange(date, { to: date })).toBeTruthy();
            expect(isDateInMaybeDateRange(date, { to })).toBeTruthy();
        });
        it('returns false when from-date is undefined and date is after to-date', () => {
            expect(isDateInMaybeDateRange(date, { to: from })).toBeFalsy();
        });
        it('returns false when date range is not valid', () => {
            expect(isDateInMaybeDateRange(date, {})).toBeFalsy();
        });
    });
    describe('isDateInDateRange', () => {
        it('returns true when date is same as from date', () => {
            expect(isDateInDateRange(from, { from, to })).toBeTruthy();
        });
        it('returns true when date is same as to date', () => {
            expect(isDateInDateRange(to, { from, to })).toBeTruthy();
        });
        it('returns true when date is bewteen start and to dates', () => {
            expect(isDateInDateRange(dayjs(from).add(1, 'day').toDate(), { from, to })).toBeTruthy();
        });
        it('returns false when date is before from date', () => {
            expect(isDateInDateRange(dayjs(from).subtract(1, 'day').toDate(), { from, to })).toBeFalsy();
        });
        it('returns false when date is after to date', () => {
            expect(isDateInDateRange(dayjs(to).add(1, 'day').toDate(), { from, to })).toBeFalsy();
        });
    });
    describe('isDateInsideDateRange', () => {
        it('returns false when date is same as from date', () => {
            expect(isDateInsideDateRange(from, { from, to })).toBeFalsy();
        });
        it('returns false when date is same as to date', () => {
            expect(isDateInsideDateRange(to, { from, to })).toBeFalsy();
        });
        it('returns true when date is between from and to date', () => {
            expect(isDateInsideDateRange(dayjs(from).add(1, 'day').toDate(), { from, to })).toBeTruthy();
        });
        it('returns false when date is before from date', () => {
            expect(isDateInsideDateRange(dayjs(from).subtract(1, 'day').toDate(), { from, to })).toBeFalsy();
        });
        it('returns false when date is after to date', () => {
            expect(isDateInsideDateRange(dayjs(to).add(1, 'day').toDate(), { from, to })).toBeFalsy();
        });
    });
    describe('getMonthsInDateRange', () => {
        const dateRange: DateRange = {
            from: ISODateToDate('2020-01-05'),
            to: ISODateToDate('2020-01-20'),
        };
        it('returns month limited by from and to date when returnFullMonths === false', () => {
            const result = getMonthsInDateRange(dateRange);
            expect(result.length).toEqual(1);
            expect(dateToISODate(result[0].from)).toEqual('2020-01-05');
            expect(dateToISODate(result[0].to)).toEqual('2020-01-20');
        });
        it('returns complete month when returnFullMonths === true', () => {
            const result = getMonthsInDateRange(dateRange, true);
            expect(result.length).toEqual(1);
            expect(dateToISODate(result[0].from)).toEqual('2020-01-01');
            expect(dateToISODate(result[0].to)).toEqual('2020-01-31');
        });
        it('returns correct number of months when date range spans 15 months', () => {
            const from = ISODateToDate('2020-01-10');
            const to = dayjs(from).add(14, 'months').toDate();
            const result = getMonthsInDateRange({
                from,
                to,
            });
            expect(result.length).toEqual(15);
            expect(dateToISODate(result[0].from)).toEqual('2020-01-10');
            expect(dateToISODate(result[14].to)).toEqual('2021-03-10');
        });
    });
    describe('getWeekDateRange', () => {
        it('returns correct dates when onlyWeekdays === false', () => {
            const result = getWeekDateRange(ISODateToDate('2020-01-01'));
            expect(dateToISODate(result.from)).toEqual('2019-12-30');
            expect(dateToISODate(result.to)).toEqual('2020-01-05');
            expect(dayjs(result.from).isoWeekday()).toEqual(1);
            expect(dayjs(result.to).isoWeekday()).toEqual(7);
        });
        it('returns correct dates when onlyWeekdays === true', () => {
            const result = getWeekDateRange(ISODateToDate('2020-01-01'), true);
            expect(dateToISODate(result.from)).toEqual('2019-12-30');
            expect(dateToISODate(result.to)).toEqual('2020-01-03');
            expect(dayjs(result.from).isoWeekday()).toEqual(1);
            expect(dayjs(result.to).isoWeekday()).toEqual(5);
        });
    });
    describe('getWeeksInDateRange', () => {
        it('returns 1 week when date range is within one week', () => {
            const dateRange: DateRange = {
                from: ISODateToDate('2021-01-04'),
                to: ISODateToDate('2021-01-10'),
            };
            const result = getWeeksInDateRange(dateRange);
            expect(getWeeksInDateRange(dateRange).length).toBe(1);
            expect(dateToISODate(result[0].from)).toEqual('2021-01-04');
            expect(dateToISODate(result[0].to)).toEqual('2021-01-10');
        });
        it('returns 2 weeks when date range starts sunday and ends following sunday', () => {
            const dateRange: DateRange = {
                from: ISODateToDate('2021-01-03'),
                to: ISODateToDate('2021-01-10'),
            };
            const result = getWeeksInDateRange(dateRange);
            expect(getWeeksInDateRange(dateRange).length).toBe(2);
            expect(dateToISODate(result[0].from)).toEqual('2021-01-03');
            expect(dateToISODate(result[0].to)).toEqual('2021-01-03');
            expect(dateToISODate(result[1].from)).toEqual('2021-01-04');
            expect(dateToISODate(result[1].to)).toEqual('2021-01-10');
        });
        it('returns 3 weeks when date ranges starts sunday, spans one week and ends following monday', () => {
            const dateRange: DateRange = {
                from: ISODateToDate('2021-01-03'),
                to: ISODateToDate('2021-01-11'),
            };
            const result = getWeeksInDateRange(dateRange);
            expect(getWeeksInDateRange(dateRange).length).toBe(3);
            expect(dateToISODate(result[0].from)).toEqual('2021-01-03');
            expect(dateToISODate(result[0].to)).toEqual('2021-01-03');
            expect(dateToISODate(result[1].from)).toEqual('2021-01-04');
            expect(dateToISODate(result[1].to)).toEqual('2021-01-10');
            expect(dateToISODate(result[2].from)).toEqual('2021-01-11');
            expect(dateToISODate(result[2].to)).toEqual('2021-01-11');
        });
    });
    describe('getDatesInDateRange', () => {
        it('returns correct dates when when onlyWeekdays === false', () => {
            const result = getDatesInDateRange({
                from: ISODateToDate('2020-01-01'),
                to: ISODateToDate('2020-02-15'),
            });
            expect(result.length).toEqual(46);
            expect(dateToISODate(result[0])).toEqual('2020-01-01');
            expect(dateToISODate(result[45])).toEqual('2020-02-15');
        });
        it('returns correct dates when onlyWeekdays === true', () => {
            const result = getDatesInDateRange(
                {
                    from: ISODateToDate('2020-01-01'),
                    to: ISODateToDate('2020-02-15'),
                },
                true
            );
            expect(result.length).toEqual(33);
            expect(dateToISODate(result[0])).toEqual('2020-01-01');
            expect(dateToISODate(result[3])).toEqual('2020-01-06');
            expect(dateToISODate(result[32])).toEqual('2020-02-14');
        });
    });
    describe('getYearsInDateRanges', () => {
        it('returns all years defined in date ranges .from property', () => {
            const dateRanges: DateRange[] = [
                { from: ISODateToDate('2010-01-01'), to: ISODateToDate('2010-02-01') },
                { from: ISODateToDate('2020-01-01'), to: ISODateToDate('2020-02-01') },
            ];
            const result = getYearsInDateRanges(dateRanges);
            expect(result.length).toBe(2);
            expect(result[0]).toEqual(2010);
            expect(result[1]).toEqual(2020);
        });
    });

    describe('getDateRangeFromDateRanges', () => {
        const dateRanges: DateRange[] = [
            { from: ISODateToDate('2010-01-01'), to: ISODateToDate('2010-02-01') },
            { from: ISODateToDate('2020-01-01'), to: ISODateToDate('2020-02-01') },
        ];
        it('gets the spanning date range for multiple date ranges', () => {
            const result = getDateRangeFromDateRanges(dateRanges);
            expect(dateToISODate(result.from)).toEqual('2010-01-01');
            expect(dateToISODate(result.to)).toEqual('2020-02-01');
        });
    });

    describe('getNumberOfDaysInDateRange', () => {
        describe('When including weekends', () => {
            it('returns 1 when from and to dates are the same date', () => {
                const result = getNumberOfDaysInDateRange({
                    from: ISODateToDate('2021-02-01'),
                    to: ISODateToDate('2021-02-01'),
                });
                expect(result).toBe(1);
            });
            it('returns 2 when to date is the day after from date', () => {
                const result = getNumberOfDaysInDateRange({
                    from: ISODateToDate('2021-02-01'),
                    to: ISODateToDate('2021-02-02'),
                });
                expect(result).toBe(2);
            });
            it('returns 3 when to date is two days after from date', () => {
                const result = getNumberOfDaysInDateRange({
                    from: ISODateToDate('2021-02-01'),
                    to: ISODateToDate('2021-02-03'),
                });
                expect(result).toBe(3);
            });
        });
        describe('When including only only week days', () => {
            it('returns 1 when range is friday + weekend', () => {
                const result = getNumberOfDaysInDateRange(
                    {
                        from: ISODateToDate('2021-02-05'),
                        to: ISODateToDate('2021-02-06'),
                    },
                    true
                );
                const result2 = getNumberOfDaysInDateRange(
                    {
                        from: ISODateToDate('2021-02-05'),
                        to: ISODateToDate('2021-02-07'),
                    },
                    true
                );
                expect(result).toBe(1);
                expect(result2).toBe(1);
            });
            it('returns 2 when date range is friday to monday', () => {
                const result = getNumberOfDaysInDateRange(
                    {
                        from: ISODateToDate('2021-02-05'),
                        to: ISODateToDate('2021-02-08'),
                    },
                    true
                );
                expect(result).toBe(2);
            });
        });
    });
    describe('ISODateRangeToDateRange', () => {
        it('converts ISODateRange correctly', () => {
            const result = ISODateRangeToDateRange('2020-01-01/2021-01-1');
            expect(dateToISODate(result.from)).toEqual('2020-01-01');
            expect(dateToISODate(result.to)).toEqual('2021-01-01');
        });
    });

    describe('getDatesInMonthOutsideDateRange', () => {
        it('returns all days in the month before date range from', () => {
            const result = getDatesInMonthOutsideDateRange(ISODateToDate('2021-01-01'), {
                from: ISODateToDate('2021-01-04'),
                to: ISODateToDate('2021-01-31'),
            });
            expect(dateToISODate(result[0])).toEqual('2021-01-01');
            expect(dateToISODate(result[1])).toEqual('2021-01-02');
            expect(dateToISODate(result[2])).toEqual('2021-01-03');
        });
        it('returns all days in month after date range to', () => {
            const result = getDatesInMonthOutsideDateRange(ISODateToDate('2021-01-01'), {
                from: ISODateToDate('2021-01-01'),
                to: ISODateToDate('2021-01-28'),
            });
            expect(dateToISODate(result[0])).toEqual('2021-01-29');
            expect(dateToISODate(result[1])).toEqual('2021-01-30');
            expect(dateToISODate(result[2])).toEqual('2021-01-31');
        });
        it('returns all days in month after to-date when to date is the first day of the month', () => {
            const result = getDatesInMonthOutsideDateRange(ISODateToDate('2021-01-01'), {
                from: ISODateToDate('2021-01-01'),
                to: ISODateToDate('2021-01-01'),
            });
            expect(dateToISODate(result[0])).toEqual('2021-01-02');
        });
    });

    describe('ISODateRangeToISODates', () => {
        it('splits an ISODateRange into ISODates', () => {
            const result = ISODateRangeToISODates('2021-01-01/2021-01-10');
            expect(result.from).toEqual('2021-01-01');
            expect(result.to).toEqual('2021-01-10');
        });
    });

    describe('dateRangeToISODateRange', () => {
        it('converts dateRange to ISODateRange', () => {
            expect(
                dateRangeToISODateRange({
                    from: ISODateToDate('2021-01-01'),
                    to: ISODateToDate('2021-01-28'),
                })
            ).toEqual('2021-01-01/2021-01-28');
        });
    });

    describe('getISODatesInISODateRange', () => {
        it('it returns all dates in date range, excluding saturday and sunday if onlyWeekDays === true', () => {
            const result = getISODatesInISODateRange('2021-02-05/2021-02-08', true);
            expect(result.length).toBe(2);
            expect(result[0]).toEqual('2021-02-05');
            expect(result[1]).toEqual('2021-02-08');
        });
        it('it returns all dates in date range, including saturday and sunday if onlyWeekDays === false', () => {
            const result = getISODatesInISODateRange('2021-02-05/2021-02-08', false);
            expect(result.length).toBe(4);
            expect(result[0]).toEqual('2021-02-05');
            expect(result[1]).toEqual('2021-02-06');
            expect(result[2]).toEqual('2021-02-07');
            expect(result[3]).toEqual('2021-02-08');
        });
        it('it returns all dates in date range, including saturday and sunday if onlyWeekDays === undefined', () => {
            const result = getISODatesInISODateRange('2021-02-05/2021-02-08');
            expect(result.length).toBe(4);
            expect(result[0]).toEqual('2021-02-05');
            expect(result[1]).toEqual('2021-02-06');
            expect(result[2]).toEqual('2021-02-07');
            expect(result[3]).toEqual('2021-02-08');
        });
    });

    describe('getDateRangesBetweenDateRanges', () => {
        const dr1: DateRange = ISODateRangeToDateRange('2021-01-01/2021-01-05');
        const dr2: DateRange = ISODateRangeToDateRange('2021-01-06/2021-01-10');
        const dr3: DateRange = ISODateRangeToDateRange('2021-01-11/2021-01-20');

        it('returns empty array when only one dateRange', () => {
            expect(getDateRangesBetweenDateRanges([dr1]).length).toBe(0);
        });
        it('returns empty arrow when all ranges are adjacent', () => {
            expect(getDateRangesBetweenDateRanges([dr1, dr2]).length).toBe(0);
        });
        it('returns correct dateRange when there are gaps between ranges', () => {
            const result = getDateRangesBetweenDateRanges([dr1, dr3]);
            expect(result.length).toBe(1);
            expect(dateRangeToISODateRange(result[0])).toEqual('2021-01-06/2021-01-10');
        });
    });

    describe('getMonthDateRange', () => {
        it('returns correct date range for one month when all days allowed', () => {
            const result = getMonthDateRange(ISODateToDate('2021-01-01'));
            expect(dateRangeToISODateRange(result)).toEqual('2021-01-01/2021-01-31');
        });
        it('returns correct date range for one month when only weekdays allowed - 1', () => {
            const result = getMonthDateRange(ISODateToDate('2021-01-01'), true);
            expect(dateRangeToISODateRange(result)).toEqual('2021-01-01/2021-01-29');
        });
        it('returns correct date range for one month when only weekdays allowed - 2', () => {
            const result = getMonthDateRange(ISODateToDate('2021-08-01'), true);
            expect(dateRangeToISODateRange(result)).toEqual('2021-08-02/2021-08-31');
        });
    });

    describe('ISODateToISODateRange', () => {
        it('returns correctIsoDateRange', () => {
            const result = ISODateToISODateRange('2021-01-01');
            expect(result).toEqual('2021-01-01/2021-01-01');
        });
    });
});
