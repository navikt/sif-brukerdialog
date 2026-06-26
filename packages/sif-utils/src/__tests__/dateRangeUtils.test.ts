import dayjs from 'dayjs';

import {
    DateRange,
    dateRangeIsAdjacentToDateRange,
    dateRangesCollide,
    dateRangesExceedsRange,
    dateRangeToISODateRange,
    datesCollideWithDateRanges,
    dateToISODate,
    getDateRangeFromDateRanges,
    getDateRangesBetweenDateRanges,
    getDateRangesFromDates,
    getDateRangesWithinDateRange,
    getDateRangeWithinDateRange,
    getDatesInDateRange,
    getDatesInMonthOutsideDateRange,
    getDatesInWeekOutsideDateRange,
    getISODatesInISODateRange,
    getIsoWeekDateRangeForDate,
    getLastDateInDateRanges,
    getMonthDateRange,
    getMonthsInDateRange,
    getNumberOfDaysInDateRange,
    getWeekDateRange,
    getWeeksInDateRange,
    getYearsInDateRanges,
    includeWeekendIfDateRangeEndsOnFridayOrLater,
    isDateInDateRange,
    isDateInDateRanges,
    isDateInMaybeDateRange,
    isDateInsideDateRange,
    isDateRange,
    isDateRangeSameOrBeforeDate,
    ISODate,
    ISODateRange,
    ISODateRangeToDateRange,
    ISODateToISODateRange,
    joinAdjacentDateRanges,
    limitDateRangeToDateRange,
    setMaxToDateForDateRange,
    sortDateRange,
    sortDateRangeByToDate,
    trimDateRangeToWeekdays,
    getNumberOfWeekdaysInDateRange,
} from '..';

describe('dateRangeUtils', () => {
    const from: ISODate = '2020-01-01' as ISODate;
    const to: ISODate = '2020-01-03' as ISODate;

    describe('isDateRange', () => {
        it('returns false when not DateRange', () => {
            expect(isDateRange({ from: undefined, to })).toBeFalsy();
            expect(isDateRange({ from, to: undefined })).toBeFalsy();
            expect(isDateRange({ from: undefined, to: undefined })).toBeFalsy();
        });
        it('returns true when is a DateRange', () => {
            const from2: ISODate = '2020-01-01' as ISODate;
            const to2: ISODate = '2020-01-01' as ISODate;
            expect(isDateRange({ from: from2, to: to2 })).toBeTruthy();
        });
    });
    describe('sortDateRange', () => {
        const dateRange1: DateRange = {
            from: '2020-01-01' as ISODate,
            to: '2020-01-02' as ISODate,
        };
        const dateRange2: DateRange = {
            from: '2020-02-01' as ISODate,
            to: '2020-02-02' as ISODate,
        };
        it('sorts correctly by from-date', () => {
            expect(sortDateRange(dateRange1, dateRange2)).toEqual(-1);
            expect(sortDateRange(dateRange1, dateRange1)).toEqual(-1);
            expect(sortDateRange(dateRange2, dateRange1)).toEqual(1);
        });
    });
    describe('sortDateRangeByToDate', () => {
        const dateRange1: DateRange = {
            from: '2020-02-01' as ISODate,
            to: '2020-02-05' as ISODate,
        };
        const dateRange2: DateRange = {
            from: '2020-02-01' as ISODate,
            to: '2020-02-02' as ISODate,
        };
        it('sorts correctly by to-date', () => {
            expect(sortDateRangeByToDate(dateRange1, dateRange2)).toEqual(1);
            expect(sortDateRangeByToDate(dateRange1, dateRange1)).toEqual(-1);
            expect(sortDateRangeByToDate(dateRange2, dateRange1)).toEqual(-1);
        });
    });
    describe('dateRangesCollide', () => {
        const dateRange1: DateRange = {
            from: '2020-02-01' as ISODate,
            to: '2020-02-02' as ISODate,
        };
        const dateRange2: DateRange = {
            from: '2020-02-03' as ISODate,
            to: '2020-02-04' as ISODate,
        };
        const dateRange3: DateRange = {
            from: '2020-02-02' as ISODate,
            to: '2020-02-03' as ISODate,
        };
        it('detects colliding dateranges', () => {
            expect(dateRangesCollide([dateRange1, dateRange2, dateRange3])).toBeTruthy();
            expect(dateRangesCollide([dateRange1, dateRange3])).toBeTruthy();
            expect(dateRangesCollide([dateRange2, dateRange3])).toBeTruthy();
        });
        it('ignores non colliding dateranges', () => {
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
        const dateBefore = '2020-02-01' as ISODate;
        const dateBetween = '2020-02-04' as ISODate;
        const dateAfter = '2020-02-07' as ISODate;
        const dateInside1 = '2020-02-02' as ISODate;
        const dateInside2 = '2020-02-05' as ISODate;
        const dateRange1: DateRange = {
            from: '2020-02-02' as ISODate,
            to: '2020-02-03' as ISODate,
        };
        const dateRange2: DateRange = {
            from: '2020-02-05' as ISODate,
            to: '2020-02-06' as ISODate,
        };
        it('returns false when no dateranges defined', () => {
            expect(datesCollideWithDateRanges([dateBefore], [])).toBeFalsy();
        });
        it('detects no collision when dates is outside dateranges', () => {
            expect(
                datesCollideWithDateRanges([dateBefore, dateBetween, dateAfter], [dateRange1, dateRange2]),
            ).toBeFalsy();
        });
        it('detects collision when dates is inside one of the dateranges', () => {
            expect(datesCollideWithDateRanges([dateInside1, dateBefore], [dateRange1, dateRange2])).toBeTruthy();
            expect(datesCollideWithDateRanges([dateInside2, dateBefore], [dateRange1, dateRange2])).toBeTruthy();
        });
    });
    describe('isDateInMaybeDateRange', () => {
        const dateBefore = '2020-01-01' as ISODate;
        const date = '2020-01-03' as ISODate;
        const fromLocal = '2020-01-02' as ISODate;
        const toLocal = '2020-01-05' as ISODate;

        it('returns true when date is within valid daterange', () => {
            expect(isDateInMaybeDateRange(date, { from: fromLocal, to: toLocal })).toBeTruthy();
        });
        it('return true when to-date is undefined and date is same or after from-date', () => {
            expect(isDateInMaybeDateRange(date, { from: date })).toBeTruthy();
            expect(isDateInMaybeDateRange(date, { from: fromLocal })).toBeTruthy();
        });
        it('returns false when to-date is undefined and date is before from-date', () => {
            expect(isDateInMaybeDateRange(dateBefore, { from: fromLocal })).toBeFalsy();
        });
        it('returns true when from-date is undefined and date is same or before to-date', () => {
            expect(isDateInMaybeDateRange(date, { to: date })).toBeTruthy();
            expect(isDateInMaybeDateRange(date, { to: toLocal })).toBeTruthy();
        });
        it('returns false when from-date is undefined and date is after to-date', () => {
            expect(isDateInMaybeDateRange(date, { to: fromLocal })).toBeFalsy();
        });
        it('returns false when daterange is not valid', () => {
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
            expect(isDateInDateRange(dateToISODate(dayjs(from).add(1, 'day')) as ISODate, { from, to })).toBeTruthy();
        });
        it('returns false when date is before from date', () => {
            expect(
                isDateInDateRange(dateToISODate(dayjs(from).subtract(1, 'day')) as ISODate, { from, to }),
            ).toBeFalsy();
        });
        it('returns false when date is after to date', () => {
            expect(isDateInDateRange(dateToISODate(dayjs(to).add(1, 'day')) as ISODate, { from, to })).toBeFalsy();
        });
    });
    describe('isDateInDateRanges', () => {
        const dateRangeWithin: DateRange = { from, to };
        const dateRangeOutside: DateRange = {
            from: dateToISODate(dayjs(to).add(1, 'days')) as ISODate,
            to: dateToISODate(dayjs(to).add(10, 'days')) as ISODate,
        };

        it('returns false if dateRanges is empty', () => {
            expect(isDateInDateRanges(from, [])).toBeFalsy();
        });
        it('returns false if date is not in dateranges', () => {
            expect(isDateInDateRanges(from, [dateRangeOutside])).toBeFalsy();
        });
        it('returns true if date is within first daterange', () => {
            expect(isDateInDateRanges(from, [dateRangeWithin])).toBeTruthy();
        });
        it('returns true if date is within second daterange', () => {
            expect(isDateInDateRanges(from, [dateRangeOutside, { from, to }])).toBeTruthy();
        });
    });
    describe('getIsoWeekDateRangeForDate', () => {
        const monday = '2023-02-06' as ISODate;
        const sunday = '2023-02-12' as ISODate;

        it('returns correct week daterange for a monday', () => {
            expect(dateRangeToISODateRange(getIsoWeekDateRangeForDate(monday))).toEqual(`2023-02-06/2023-02-12`);
        });
        it('returns correct week daterange for a sunday', () => {
            expect(dateRangeToISODateRange(getIsoWeekDateRangeForDate(sunday))).toEqual(`2023-02-06/2023-02-12`);
        });
        it('returns correct week daterange when the week spans two years', () => {
            expect(dateRangeToISODateRange(getIsoWeekDateRangeForDate('2023-01-01' as ISODate))).toEqual(
                `2022-12-26/2023-01-01`,
            );
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
            expect(
                isDateInsideDateRange(dateToISODate(dayjs(from).add(1, 'day')) as ISODate, { from, to }),
            ).toBeTruthy();
        });
        it('returns false when date is before from date', () => {
            expect(
                isDateInsideDateRange(dateToISODate(dayjs(from).subtract(1, 'day')) as ISODate, { from, to }),
            ).toBeFalsy();
        });
        it('returns false when date is after to date', () => {
            expect(isDateInsideDateRange(dateToISODate(dayjs(to).add(1, 'day')) as ISODate, { from, to })).toBeFalsy();
        });
    });
    describe('getMonthsInDateRange', () => {
        const dateRange: DateRange = {
            from: '2020-01-05' as ISODate,
            to: '2020-01-20' as ISODate,
        };
        it('returns month limited by from and to date when returnFullMonths === false', () => {
            const result = getMonthsInDateRange(dateRange);
            expect(result.length).toEqual(1);
            expect(dateToISODate(result[0].from)).toEqual('2020-01-05' as ISODate);
            expect(dateToISODate(result[0].to)).toEqual('2020-01-20' as ISODate);
        });
        it('returns complete month when returnFullMonths === true', () => {
            const result = getMonthsInDateRange(dateRange, true);
            expect(result.length).toEqual(1);
            expect(dateToISODate(result[0].from)).toEqual('2020-01-01' as ISODate);
            expect(dateToISODate(result[0].to)).toEqual('2020-01-31' as ISODate);
        });
        it('returns correct number of months when daterange spans 15 months', () => {
            const fromLocal = '2020-01-10' as ISODate;
            const toLocal = dateToISODate(dayjs(fromLocal).add(14, 'months')) as ISODate;
            const result = getMonthsInDateRange({
                from: fromLocal,
                to: toLocal,
            });
            expect(result.length).toEqual(15);
            expect(dateToISODate(result[0].from)).toEqual('2020-01-10' as ISODate);
            expect(dateToISODate(result[14].to)).toEqual('2021-03-10' as ISODate);
        });
    });
    describe('getWeekDateRange', () => {
        it('returns correct dates when onlyWeekdays === false', () => {
            const result = getWeekDateRange('2020-01-01' as ISODate);
            expect(dateToISODate(result.from)).toEqual('2019-12-30' as ISODate);
            expect(dateToISODate(result.to)).toEqual('2020-01-05' as ISODate);
            expect(dayjs(result.from).isoWeekday()).toEqual(1);
            expect(dayjs(result.to).isoWeekday()).toEqual(7);
        });
        it('returns correct dates when onlyWeekdays === true', () => {
            const result = getWeekDateRange('2020-01-01' as ISODate, true);
            expect(dateToISODate(result.from)).toEqual('2019-12-30' as ISODate);
            expect(dateToISODate(result.to)).toEqual('2020-01-03' as ISODate);
            expect(dayjs(result.from).isoWeekday()).toEqual(1);
            expect(dayjs(result.to).isoWeekday()).toEqual(5);
        });
    });
    describe('getWeeksInDateRange', () => {
        it('returns 1 week when daterange is within one week', () => {
            const dateRange: DateRange = {
                from: '2021-01-04' as ISODate,
                to: '2021-01-10' as ISODate,
            };
            const result = getWeeksInDateRange(dateRange);
            expect(getWeeksInDateRange(dateRange).length).toBe(1);
            expect(dateToISODate(result[0].from)).toEqual('2021-01-04' as ISODate);
            expect(dateToISODate(result[0].to)).toEqual('2021-01-10' as ISODate);
        });
        it('returns 2 weeks when daterange starts sunday and ends following sunday', () => {
            const dateRange: DateRange = {
                from: '2021-01-03' as ISODate,
                to: '2021-01-10' as ISODate,
            };
            const result = getWeeksInDateRange(dateRange);
            expect(getWeeksInDateRange(dateRange).length).toBe(2);
            expect(dateToISODate(result[0].from)).toEqual('2021-01-03' as ISODate);
            expect(dateToISODate(result[0].to)).toEqual('2021-01-03' as ISODate);
            expect(dateToISODate(result[1].from)).toEqual('2021-01-04' as ISODate);
            expect(dateToISODate(result[1].to)).toEqual('2021-01-10' as ISODate);
        });
        it('returns 3 weeks when dateranges starts sunday, spans one week and ends following monday', () => {
            const dateRange: DateRange = {
                from: '2021-01-03' as ISODate,
                to: '2021-01-11' as ISODate,
            };
            const result = getWeeksInDateRange(dateRange);
            expect(getWeeksInDateRange(dateRange).length).toBe(3);
            expect(dateToISODate(result[0].from)).toEqual('2021-01-03' as ISODate);
            expect(dateToISODate(result[0].to)).toEqual('2021-01-03' as ISODate);
            expect(dateToISODate(result[1].from)).toEqual('2021-01-04' as ISODate);
            expect(dateToISODate(result[1].to)).toEqual('2021-01-10' as ISODate);
            expect(dateToISODate(result[2].from)).toEqual('2021-01-11' as ISODate);
            expect(dateToISODate(result[2].to)).toEqual('2021-01-11' as ISODate);
        });
    });
    describe('getDatesInDateRange', () => {
        it('returns correct dates when when onlyWeekdays === false', () => {
            const result = getDatesInDateRange({
                from: '2020-01-01' as ISODate,
                to: '2020-02-15' as ISODate,
            });
            expect(result.length).toEqual(46);
            expect(dateToISODate(result[0])).toEqual('2020-01-01' as ISODate);
            expect(dateToISODate(result[45])).toEqual('2020-02-15' as ISODate);
        });
        it('returns correct dates when onlyWeekdays === true', () => {
            const result = getDatesInDateRange(
                {
                    from: '2020-01-01' as ISODate,
                    to: '2020-02-15' as ISODate,
                },
                true,
            );
            expect(result.length).toEqual(33);
            expect(dateToISODate(result[0])).toEqual('2020-01-01' as ISODate);
            expect(dateToISODate(result[3])).toEqual('2020-01-06' as ISODate);
            expect(dateToISODate(result[32])).toEqual('2020-02-14' as ISODate);
        });
    });
    describe('getYearsInDateRanges', () => {
        it('returns all years defined in dateranges .from property', () => {
            const dateRanges: DateRange[] = [
                { from: '2010-01-01' as ISODate, to: '2010-02-01' as ISODate },
                { from: '2020-01-01' as ISODate, to: '2020-02-01' as ISODate },
            ];
            const result = getYearsInDateRanges(dateRanges);
            expect(result.length).toBe(2);
            expect(result[0]).toEqual(2010);
            expect(result[1]).toEqual(2020);
        });
    });

    describe('getDateRangeFromDateRanges', () => {
        const dateRanges: DateRange[] = [
            { from: '2010-01-01' as ISODate, to: '2010-02-01' as ISODate },
            { from: '2020-01-01' as ISODate, to: '2020-02-01' as ISODate },
        ];
        it('throws error if dateRanges are empty', () => {
            try {
                getDateRangeFromDateRanges([]);
            } catch (e) {
                expect(e).toEqual('getDateRangeFromDateRanges: Cannot get date range from empty array');
            }
        });
        it('gets the spanning daterange for multiple dateranges', () => {
            const result = getDateRangeFromDateRanges(dateRanges);
            expect(dateToISODate(result.from)).toEqual('2010-01-01' as ISODate);
            expect(dateToISODate(result.to)).toEqual('2020-02-01' as ISODate);
        });
    });

    describe('getNumberOfDaysInDateRange', () => {
        describe('When including weekends', () => {
            it('returns 1 when from and to dates are the same date', () => {
                const result = getNumberOfDaysInDateRange({
                    from: '2021-02-01' as ISODate,
                    to: '2021-02-01' as ISODate,
                });
                expect(result).toBe(1);
            });
            it('returns 2 when to date is the day after from date', () => {
                const result = getNumberOfDaysInDateRange({
                    from: '2021-02-01' as ISODate,
                    to: '2021-02-02' as ISODate,
                });
                expect(result).toBe(2);
            });
            it('returns 2 even if dates are on consecutive days', () => {
                const result = getNumberOfDaysInDateRange({
                    from: '2022-02-01' as ISODate,
                    to: '2022-02-02' as ISODate,
                });
                expect(result).toBe(2);
            });
            it('returns 3 when to date is two days after from date', () => {
                const result = getNumberOfDaysInDateRange({
                    from: '2021-02-01' as ISODate,
                    to: '2021-02-03' as ISODate,
                });
                expect(result).toBe(3);
            });
        });
        describe('When including only only week days', () => {
            it('returns 1 when range is friday + weekend', () => {
                const result = getNumberOfDaysInDateRange(
                    {
                        from: '2021-02-05' as ISODate,
                        to: '2021-02-06' as ISODate,
                    },
                    true,
                );
                const result2 = getNumberOfDaysInDateRange(
                    {
                        from: '2021-02-05' as ISODate,
                        to: '2021-02-07' as ISODate,
                    },
                    true,
                );
                expect(result).toBe(1);
                expect(result2).toBe(1);
            });
            it('returns 2 when daterange is friday to monday', () => {
                const result = getNumberOfDaysInDateRange(
                    {
                        from: '2021-02-05' as ISODate,
                        to: '2021-02-08' as ISODate,
                    },
                    true,
                );
                expect(result).toBe(2);
            });
        });
    });
    describe('ISODateRangeToDateRange', () => {
        it('converts ISODateRange correctly', () => {
            const result = ISODateRangeToDateRange('2020-01-01/2021-01-1');
            expect(dateToISODate(result.from)).toEqual('2020-01-01' as ISODate);
            expect(dateToISODate(result.to)).toEqual('2021-01-01' as ISODate);
        });
    });

    describe('getDatesInMonthOutsideDateRange', () => {
        it('returns all days in the month before daterange from', () => {
            const result = getDatesInMonthOutsideDateRange('2021-01-01' as ISODate, {
                from: '2021-01-04' as ISODate,
                to: '2021-01-31' as ISODate,
            });
            expect(dateToISODate(result[0])).toEqual('2021-01-01' as ISODate);
            expect(dateToISODate(result[1])).toEqual('2021-01-02' as ISODate);
            expect(dateToISODate(result[2])).toEqual('2021-01-03' as ISODate);
        });
        it('returns all days in month after daterange to', () => {
            const result = getDatesInMonthOutsideDateRange('2021-01-01' as ISODate, {
                from: '2021-01-01' as ISODate,
                to: '2021-01-28' as ISODate,
            });
            expect(dateToISODate(result[0])).toEqual('2021-01-29' as ISODate);
            expect(dateToISODate(result[1])).toEqual('2021-01-30' as ISODate);
            expect(dateToISODate(result[2])).toEqual('2021-01-31' as ISODate);
        });
        it('returns all days in month after to-date when to date is the first day of the month', () => {
            const result = getDatesInMonthOutsideDateRange('2021-01-01' as ISODate, {
                from: '2021-01-01' as ISODate,
                to: '2021-01-01' as ISODate,
            });
            expect(dateToISODate(result[0])).toEqual('2021-01-02' as ISODate);
        });
    });

    describe('getDatesInWeekOutsideDateRange', () => {
        it('returns all days in the week outside daterange', () => {
            const result = getDatesInWeekOutsideDateRange('2021-01-08' as ISODate, {
                from: '2021-01-05' as ISODate,
                to: '2021-01-08' as ISODate,
            });
            expect(result.length).toBe(3);
            expect(dateToISODate(result[0])).toEqual('2021-01-04' as ISODate);
            expect(dateToISODate(result[1])).toEqual('2021-01-09' as ISODate);
            expect(dateToISODate(result[2])).toEqual('2021-01-10' as ISODate);
        });
    });

    describe('dateRangeToISODateRange', () => {
        it('converts dateRange to ISODateRange', () => {
            expect(
                dateRangeToISODateRange({
                    from: '2021-01-01' as ISODate,
                    to: '2021-01-28' as ISODate,
                }),
            ).toEqual('2021-01-01/2021-01-28');
        });
    });

    describe('getISODatesInISODateRange', () => {
        it('returns all dates in daterange, excluding saturday and sunday if onlyWeekDays === true', () => {
            const result = getISODatesInISODateRange('2021-02-05/2021-02-08', true);
            expect(result.length).toBe(2);
            expect(result[0]).toEqual('2021-02-05' as ISODate);
            expect(result[1]).toEqual('2021-02-08' as ISODate);
        });
        it('returns all dates in daterange, including saturday and sunday if onlyWeekDays === false', () => {
            const result = getISODatesInISODateRange('2021-02-05/2021-02-08', false);
            expect(result.length).toBe(4);
            expect(result[0]).toEqual('2021-02-05' as ISODate);
            expect(result[1]).toEqual('2021-02-06' as ISODate);
            expect(result[2]).toEqual('2021-02-07' as ISODate);
            expect(result[3]).toEqual('2021-02-08' as ISODate);
        });
        it('returns all dates in daterange, including saturday and sunday if onlyWeekDays === undefined', () => {
            const result = getISODatesInISODateRange('2021-02-05/2021-02-08');
            expect(result.length).toBe(4);
            expect(result[0]).toEqual('2021-02-05' as ISODate);
            expect(result[1]).toEqual('2021-02-06' as ISODate);
            expect(result[2]).toEqual('2021-02-07' as ISODate);
            expect(result[3]).toEqual('2021-02-08' as ISODate);
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
        it('returns correct daterange for one month when all days allowed', () => {
            const result = getMonthDateRange('2021-01-01' as ISODate);
            expect(dateRangeToISODateRange(result)).toEqual('2021-01-01/2021-01-31');
        });
        it('returns correct daterange for one month when only weekdays allowed - 1', () => {
            const result = getMonthDateRange('2021-01-01' as ISODate, true);
            expect(dateRangeToISODateRange(result)).toEqual('2021-01-01/2021-01-29');
        });
        it('returns correct daterange for one month when only weekdays allowed - 2', () => {
            const result = getMonthDateRange('2021-08-01' as ISODate, true);
            expect(dateRangeToISODateRange(result)).toEqual('2021-08-02/2021-08-31');
        });
    });

    describe('ISODateToISODateRange', () => {
        it('returns correctIsoDateRange', () => {
            const result = ISODateToISODateRange('2021-01-01' as ISODate);
            expect(result).toEqual('2021-01-01/2021-01-01');
        });
    });

    describe('dateRangesExceedsRange', () => {
        const range: DateRange = {
            from: dateToISODate(dayjs()),
            to: dateToISODate(dayjs().add(2, 'week')),
        };

        const ranges: DateRange[] = [
            {
                from: dateToISODate(dayjs()),
                to: dateToISODate(dayjs().add(1, 'week')),
            },
        ];

        it('should return false if ranges are empty', () => {
            expect(dateRangesExceedsRange([], range)).toBeFalsy();
        });
        it('should return false if ranges are within valid range', () => {
            expect(dateRangesExceedsRange(ranges, range)).toBeFalsy();
        });

        it('should return true if ranges are ahead of valid range', () => {
            expect(
                dateRangesExceedsRange(
                    [
                        ...ranges,
                        {
                            from: dateToISODate(dayjs().subtract(2, 'day')),
                            to: dateToISODate(dayjs().subtract(1, 'day')),
                        },
                    ],
                    range,
                ),
            ).toBeTruthy();
        });
        it('should return true if ranges are after valid range', () => {
            expect(
                dateRangesExceedsRange(
                    [
                        ...ranges,
                        {
                            from: dateToISODate(dayjs().add(3, 'week')),
                            to: dateToISODate(dayjs().add(4, 'week')),
                        },
                    ],
                    range,
                ),
            ).toBeTruthy();
        });
    });

    describe('getDateRangesFromDates', () => {
        it('returnerer tom array dersom dates[] = tomt', () => {
            const result = getDateRangesFromDates([]);
            expect(result.length).toBe(0);
        });
        it('returnerer array med én DateRange dersom dates[] har kun én dato', () => {
            const isoDate = '2020-01-01' as ISODate;
            const result = getDateRangesFromDates([isoDate]);
            expect(result.length).toBe(1);
            expect(dateRangeToISODateRange(result[0])).toEqual(`${isoDate}/${isoDate}`);
        });
        it('returnerer array med én DateRange dersom dates[] har kun to datoer som etterfølger hverandre', () => {
            const fromIsoDate = '2020-01-01' as ISODate;
            const toIsoDate = '2020-01-02' as ISODate;
            const result = getDateRangesFromDates([fromIsoDate, toIsoDate]);
            expect(result.length).toBe(1);
            expect(dateRangeToISODateRange(result[0])).toEqual(`${fromIsoDate}/${toIsoDate}`);
        });
        it('returnerer array med én DateRange dersom dates[] har flere datoer som etterfølger hverandre', () => {
            const d1 = '2020-01-01' as ISODate;
            const d2 = '2020-01-02' as ISODate;
            const d3 = '2020-01-03' as ISODate;
            const d4 = '2020-01-04' as ISODate;
            const d5 = '2020-01-05' as ISODate;

            const result = getDateRangesFromDates([d1, d2, d3, d4, d5]);
            expect(result.length).toBe(1);
            expect(dateRangeToISODateRange(result[0])).toEqual(`${d1}/${d5}`);
        });
        it('returnerer array med to DateRanges dersom dates[] har datoer med ett opphold', () => {
            const d1 = '2020-01-01' as ISODate;
            const d2 = '2020-01-02' as ISODate;
            const d3 = '2020-01-04' as ISODate;
            const d4 = '2020-01-05' as ISODate;

            const result = getDateRangesFromDates([d1, d2, d3, d4]);
            expect(result.length).toBe(2);
            expect(dateRangeToISODateRange(result[0])).toEqual(`${d1}/${d2}`);
            expect(dateRangeToISODateRange(result[1])).toEqual(`${d3}/${d4}`);
        });
        it('returnerer array med to DateRanges dersom dates[] har datoer med ett opphold - og siste dag er alene', () => {
            const d1 = '2020-01-01' as ISODate;
            const d2 = '2020-01-02' as ISODate;
            const d3 = '2020-01-03' as ISODate;
            const d4 = '2020-01-05' as ISODate;

            const result = getDateRangesFromDates([d1, d2, d3, d4]);
            expect(result.length).toBe(2);
            expect(dateRangeToISODateRange(result[0])).toEqual(`${d1}/${d3}`);
            expect(dateRangeToISODateRange(result[1])).toEqual(`${d4}/${d4}`);
        });
    });

    describe('dateRangeIsAdjacentToDateRange', () => {
        describe('ignoreWeekends=false', () => {
            const dr1 = ISODateRangeToDateRange('2023-02-01/2023-02-02'); // Ons - tors
            const dr2 = ISODateRangeToDateRange('2023-02-03/2023-02-05'); // Fre - søn
            const dr3 = ISODateRangeToDateRange('2023-02-04/2023-02-04'); // Lør - søn
            it('Returnerer true når to perioder følger etter hver andre', () => {
                expect(dateRangeIsAdjacentToDateRange(dr1, dr2)).toBeTruthy();
            });
            it('Returnerer false når to perioder ikke følger etter hver andre', () => {
                expect(dateRangeIsAdjacentToDateRange(dr1, dr3)).toBeFalsy();
            });
            it('Returnerer false dersom fra-dato i periode 2 er før eller lik til-dato i periode 1', () => {
                expect(dateRangeIsAdjacentToDateRange({ ...dr2, to: '2023-02-04' as ISODate }, dr3)).toBeFalsy();
                expect(dateRangeIsAdjacentToDateRange({ ...dr2, to: '2023-02-05' as ISODate }, dr3)).toBeFalsy();
            });
        });
        describe('ignoreWeekends=true', () => {
            const ons_tor = ISODateRangeToDateRange('2023-02-01/2023-02-02');
            const ons_fre = ISODateRangeToDateRange('2023-02-01/2023-02-03');
            const ons_lør = ISODateRangeToDateRange('2023-02-01/2023-02-04');
            const ons_søn = ISODateRangeToDateRange('2023-02-01/2023-02-05');
            const man_tor = ISODateRangeToDateRange('2023-02-06/2023-02-09');
            const tir_tor = ISODateRangeToDateRange('2023-02-07/2023-02-09');

            it('Returnerer true når to perioder følger etter hver andre, men det er kun helg som er mellom', () => {
                expect(dateRangeIsAdjacentToDateRange(ons_fre, man_tor, true)).toBeTruthy();
                expect(dateRangeIsAdjacentToDateRange(ons_lør, man_tor, true)).toBeTruthy();
                expect(dateRangeIsAdjacentToDateRange(ons_søn, man_tor, true)).toBeTruthy();
            });
            it('Returnerer false dersom en ignorerer helg, men første periode slutter før fredag', () => {
                expect(dateRangeIsAdjacentToDateRange(ons_tor, tir_tor, true)).toBeFalsy();
            });
            it('Returnerer false når en ignorerer helg, men neste uke starter en tirsdag', () => {
                expect(dateRangeIsAdjacentToDateRange(ons_fre, tir_tor, true)).toBeFalsy();
                expect(dateRangeIsAdjacentToDateRange(ons_lør, tir_tor, true)).toBeFalsy();
                expect(dateRangeIsAdjacentToDateRange(ons_søn, tir_tor, true)).toBeFalsy();
            });
        });
    });

    describe('includeWeekendIfEndsOnFridayOrLater', () => {
        const dr_thursday = ISODateRangeToDateRange('2023-02-01/2023-02-02');
        const dr_friday = ISODateRangeToDateRange('2023-02-01/2023-02-03');
        const dr_saturday = ISODateRangeToDateRange('2023-02-01/2023-02-04');
        const dr_sunday = ISODateRangeToDateRange('2023-02-01/2023-02-05');
        const thursdayIsoDate = '2023-02-02' as ISODate;
        const sundayIsoDate = '2023-02-05' as ISODate;

        it('beholder torsdag dersom en daterange slutter på en torsdag', () => {
            const result = includeWeekendIfDateRangeEndsOnFridayOrLater(dr_thursday);
            expect(dateToISODate(result.to)).toEqual(thursdayIsoDate);
        });
        it('inkluderer søndag dersom en daterange slutter på en fredag', () => {
            const result = includeWeekendIfDateRangeEndsOnFridayOrLater(dr_friday);
            expect(dateToISODate(result.to)).toEqual(sundayIsoDate);
        });
        it('inkluderer søndag dersom en daterange slutter på en lørdag', () => {
            const result = includeWeekendIfDateRangeEndsOnFridayOrLater(dr_saturday);
            expect(dateToISODate(result.to)).toEqual(sundayIsoDate);
        });
        it('inkluderer søndag dersom en daterange slutter på en søndag', () => {
            const result = includeWeekendIfDateRangeEndsOnFridayOrLater(dr_sunday);
            expect(dateToISODate(result.to)).toEqual(sundayIsoDate);
        });
    });

    describe('includeWeekendIfEndsOnFridayOrLater 2', () => {
        const dr1: DateRange = ISODateRangeToDateRange('2023-02-01/2023-02-05');
        const dr2: DateRange = ISODateRangeToDateRange('2023-02-06/2023-02-10');
        const dr3: DateRange = ISODateRangeToDateRange('2023-02-14/2023-02-20');
        const dr4: DateRange = ISODateRangeToDateRange('2023-02-21/2023-03-05');
        const dr5: DateRange = ISODateRangeToDateRange('2023-03-06/2023-03-07');
        const dr6: DateRange = ISODateRangeToDateRange('2023-03-09/2023-03-09');

        it('Returns empty array if no dateranges', () => {
            const result = joinAdjacentDateRanges([]);
            expect(result.length).toBe(0);
        });
        it('Returns array with same datarange if only one daterange', () => {
            const result = joinAdjacentDateRanges([dr1]);
            expect(result.length).toBe(1);
            expect(dateRangeToISODateRange(result[0])).toEqual(dateRangeToISODateRange(dr1));
        });
        it('Joins two adjacent date ranges', () => {
            const result = joinAdjacentDateRanges([dr1, dr2]);
            expect(result.length).toBe(1);
            expect(dateToISODate(result[0].from)).toEqual('2023-02-01' as ISODate);
            expect(dateToISODate(result[0].to)).toEqual('2023-02-10' as ISODate);
        });
        it('Does not join dateranges which are not adjacent', () => {
            const result = joinAdjacentDateRanges([dr1, dr3]);
            expect(result.length).toBe(2);
            expect(dateToISODate(result[0].from)).toEqual('2023-02-01' as ISODate);
            expect(dateToISODate(result[0].to)).toEqual('2023-02-05' as ISODate);
            expect(dateToISODate(result[1].from)).toEqual('2023-02-14' as ISODate);
            expect(dateToISODate(result[1].to)).toEqual('2023-02-20' as ISODate);
        });
        it('Joins correctly adjacent ranges and keep unadjacent ranges', () => {
            const result = joinAdjacentDateRanges([dr1, dr2, dr3, dr4, dr5, dr6]);
            expect(result.length).toBe(3);
            expect(dateToISODate(result[0].from)).toEqual('2023-02-01' as ISODate);
            expect(dateToISODate(result[0].to)).toEqual('2023-02-10' as ISODate);
            expect(dateToISODate(result[1].from)).toEqual('2023-02-14' as ISODate);
            expect(dateToISODate(result[1].to)).toEqual('2023-03-07' as ISODate);
            expect(dateToISODate(result[2].from)).toEqual('2023-03-09' as ISODate);
            expect(dateToISODate(result[2].to)).toEqual('2023-03-09' as ISODate);
        });
    });
    describe('setMaxToDateForDateRange', () => {
        const onsdag = '2023-02-01' as ISODate;
        const torsdag = '2023-02-02' as ISODate;
        const fredag = '2023-02-03' as ISODate;

        it('keeps to-date unchanged if date is before max-date', () => {
            const dateRange: DateRange = { from: onsdag, to: torsdag };
            const result = setMaxToDateForDateRange(dateRange, fredag);
            expect(dateRangeToISODateRange(result)).toEqual(dateRangeToISODateRange(dateRange));
        });
        it('keeps to-date unchanged if date is same as max-date', () => {
            const dateRange: DateRange = { from: onsdag, to: torsdag };
            const result = setMaxToDateForDateRange(dateRange, torsdag);
            expect(dateRangeToISODateRange(result)).toEqual(dateRangeToISODateRange(dateRange));
        });
        it('set to-date to max date if to-date is after as max-date', () => {
            const dateRange: DateRange = { from: onsdag, to: fredag };
            const result = setMaxToDateForDateRange(dateRange, torsdag);
            expect(dateRangeToISODateRange(result)).toEqual(dateRangeToISODateRange({ from: onsdag, to: torsdag }));
        });
    });
    describe('isDateRangeSameOrBeforeDate', () => {
        const onsdag = '2023-02-01' as ISODate;
        const torsdag = '2023-02-02' as ISODate;
        const fredag = '2023-02-03' as ISODate;

        it('returns true if dateRange ends before a date', () => {
            expect(isDateRangeSameOrBeforeDate({ from: onsdag, to: torsdag }, fredag)).toBeTruthy();
        });
        it('returns true if dateRange ends on given date', () => {
            expect(isDateRangeSameOrBeforeDate({ from: onsdag, to: torsdag }, torsdag)).toBeTruthy();
        });
        it('returns false if dateRange ends after a date', () => {
            expect(isDateRangeSameOrBeforeDate({ from: onsdag, to: torsdag }, onsdag)).toBeFalsy();
        });
    });

    describe('limitDateRangeToDateRange', () => {
        const limitDateRange: ISODateRange = '2022-01-15/2022-02-15';
        it('returns correct dates if dateRange is within limits', () => {
            const dateRange: ISODateRange = '2022-02-01/2022-02-10';
            const result = dateRangeToISODateRange(
                limitDateRangeToDateRange(ISODateRangeToDateRange(dateRange), ISODateRangeToDateRange(limitDateRange)),
            );
            expect(result).toEqual(dateRange);
        });
        it('returns correct dates if dateRange is equal limits', () => {
            const result = dateRangeToISODateRange(
                limitDateRangeToDateRange(
                    ISODateRangeToDateRange(limitDateRange),
                    ISODateRangeToDateRange(limitDateRange),
                ),
            );
            expect(result).toEqual(limitDateRange);
        });
        it('returns correct dates if dateRange exceeds start of limit', () => {
            const dateRange: ISODateRange = '2022-01-01/2022-02-10';
            const result = dateRangeToISODateRange(
                limitDateRangeToDateRange(ISODateRangeToDateRange(dateRange), ISODateRangeToDateRange(limitDateRange)),
            );
            expect(result).toEqual('2022-01-15/2022-02-10');
        });
        it('returns correct dates if dateRange exceeds end of limit', () => {
            const dateRange: ISODateRange = '2022-02-01/2022-03-10';
            const result = dateRangeToISODateRange(
                limitDateRangeToDateRange(ISODateRangeToDateRange(dateRange), ISODateRangeToDateRange(limitDateRange)),
            );
            expect(result).toEqual('2022-02-01/2022-02-15');
        });
    });

    describe('getDateRangesWithinDateRange', () => {
        const limitDateRange: DateRange = ISODateRangeToDateRange('2022-02-10/2022-02-20');
        const drFør: ISODateRange = '2022-02-01/2022-02-02';
        const dr1: ISODateRange = '2022-02-10/2022-02-15';
        const dr2: ISODateRange = '2022-02-16/2022-02-18';
        const drEtter: ISODateRange = '2022-02-25/2022-02-28';

        it('keeps only dataranges within limit', () => {
            const result = getDateRangesWithinDateRange(
                [
                    ISODateRangeToDateRange(drFør),
                    ISODateRangeToDateRange(dr1),
                    ISODateRangeToDateRange(dr2),
                    ISODateRangeToDateRange(drEtter),
                ],
                limitDateRange,
            );
            expect(result.length).toEqual(2);
            expect(result[0]).toEqual(ISODateRangeToDateRange(dr1));
            expect(result[1]).toEqual(ISODateRangeToDateRange(dr2));
        });
        it('adjust dataranges crossing the limits by default', () => {
            const drStart: ISODateRange = '2022-02-05/2022-02-15';
            const drEnd: ISODateRange = '2022-02-16/2022-02-25';
            const result = getDateRangesWithinDateRange(
                [ISODateRangeToDateRange(drStart), ISODateRangeToDateRange(drEnd)],
                limitDateRange,
            );
            expect(result.length).toEqual(2);
            expect(result[0]).toEqual(ISODateRangeToDateRange('2022-02-10/2022-02-15'));
            expect(result[1]).toEqual(ISODateRangeToDateRange('2022-02-16/2022-02-20'));
        });
        it('does NOT adjust dataranges crossing the limits if adjustToLimit===false', () => {
            const drStart: ISODateRange = '2022-02-05/2022-02-15';
            const drEnd: ISODateRange = '2022-02-16/2022-02-25';
            const result = getDateRangesWithinDateRange(
                [ISODateRangeToDateRange(drStart), ISODateRangeToDateRange(drEnd)],
                limitDateRange,
                false,
            );
            expect(result.length).toEqual(2);
            expect(result[0]).toEqual(ISODateRangeToDateRange(drStart));
            expect(result[1]).toEqual(ISODateRangeToDateRange(drEnd));
        });
    });
    describe('getLastDateInDateRanges', () => {
        it('returns no date dateRanges are empty', () => {
            expect(getLastDateInDateRanges([])).toBeUndefined();
        });
        it('returns the last in the dateRange, if one date range is passed in', () => {
            const fromLocal = '2020-01-01' as ISODate;
            const toISODate = '2020-01-10' as ISODate;
            const result = getLastDateInDateRanges([{ from: fromLocal, to: toISODate }]);
            expect(result).toEqual(toISODate);
        });
        it('returns the last of all the dateRanges, if more than one date range is passed in', () => {
            const lastISODate = '2022-02-01' as ISODate;
            const result = getLastDateInDateRanges([
                ISODateRangeToDateRange('2020-01-01/2020-02-01'),
                ISODateRangeToDateRange(`2022-01-01/${lastISODate}`),
            ]);
            expect(dateToISODate(result!)).toEqual(lastISODate);
        });
    });
    describe('trimDateRangeToWeekdays', () => {
        const mondayToSunday: DateRange = ISODateRangeToDateRange('2022-05-02/2022-05-08');
        const sundayToMonday: DateRange = ISODateRangeToDateRange('2022-05-08/2022-05-09');
        const sundayToSunday: DateRange = ISODateRangeToDateRange('2022-05-01/2022-05-08');
        it('trims start of date range correctly', () => {
            const result = trimDateRangeToWeekdays(sundayToMonday);
            expect(dateRangeToISODateRange(result!)).toEqual('2022-05-09/2022-05-09');
        });
        it('trims end of date range correctly', () => {
            const result = trimDateRangeToWeekdays(mondayToSunday);
            expect(dateRangeToISODateRange(result!)).toEqual('2022-05-02/2022-05-06');
        });
        it('trims start and end of date range correctly', () => {
            const result = trimDateRangeToWeekdays(sundayToSunday);
            expect(dateRangeToISODateRange(result!)).toEqual('2022-05-02/2022-05-06');
        });
        it('returns undefined when range contains only weekend days', () => {
            const saturdayToSunday: DateRange = ISODateRangeToDateRange('2022-05-07/2022-05-08');
            expect(trimDateRangeToWeekdays(saturdayToSunday)).toBeUndefined();
        });
    });
    describe('getDateRangeWithinDateRange', () => {
        const limitRange: DateRange = ISODateRangeToDateRange('2022-05-02/2022-05-08');
        it('get correct range when dateRange exeeds limitRange', () => {
            const result = getDateRangeWithinDateRange(ISODateRangeToDateRange('2022-05-01/2022-05-09'), limitRange);
            expect(dateRangeToISODateRange(result)).toEqual('2022-05-02/2022-05-08');
        });
    });

    describe('getNumberOfWeekdaysInDateRange', () => {
        it('counts weekdays correctly for a full Mon–Fri week', () => {
            const range: DateRange = ISODateRangeToDateRange('2022-05-02/2022-05-06');
            expect(getNumberOfWeekdaysInDateRange(range)).toBe(5);
        });
        it('includes both from and to date', () => {
            const range: DateRange = ISODateRangeToDateRange('2022-05-02/2022-05-02');
            expect(getNumberOfWeekdaysInDateRange(range)).toBe(1);
        });
        it('skips weekends in a Mon–Sun range', () => {
            const range: DateRange = ISODateRangeToDateRange('2022-05-02/2022-05-08');
            expect(getNumberOfWeekdaysInDateRange(range)).toBe(5);
        });
    });
});
