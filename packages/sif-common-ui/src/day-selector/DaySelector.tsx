/* eslint-disable no-console */
import { Accordion, BodyShort, DatePicker, HStack, Link, Tag, VStack } from '@navikt/ds-react';
import React, { useMemo, useState } from 'react';
import {
    DateRange,
    dateRangeToISODateRange,
    getDatesInDateRange,
    getFirstOfTwoDates,
    getLastOfTwoDates,
    getMonthsInDateRange,
    isDateInDateRange,
    sortDateRange,
    sortDates,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import './daySelector.css';
import SelectedDatesList from './SelectedDatesList';

dayjs.extend(isoWeeksInYear);
dayjs.extend(isoWeek);

interface Props {
    dateRange: DateRange;
    selectedDates?: Date[];
    maxDays?: number;
    reverseOrder?: boolean;
    mode?: 'accordion' | 'calendar';
    onChange: (dates: Date[]) => void;
}

const getMonthKey = (date: Date): string => {
    return dayjs(date).format('MM_YYYY');
};

type SelectedDaysInMonths = { [monthAndYear: string]: Date[] };

const DaySelector: React.FunctionComponent<Props> = ({
    dateRange,
    selectedDates = [],
    onChange,
    reverseOrder,
    mode = 'calendar',
}) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedDaysInMonths, setSelectedDaysInMonths] = useState<SelectedDaysInMonths>(
        getSelectedDaysInMonthsFromDates(dateRange, selectedDates),
    );

    const months: DateRange[] = useMemo(() => {
        const m = getMonthsInDateRange(dateRange);
        return reverseOrder ? m.reverse() : m;
    }, [dateRange, reverseOrder]);

    const onSelectDates = (month: Date, dates: Date[]) => {
        const selected = {
            ...selectedDaysInMonths,
            ...{ [getMonthKey(month)]: dates },
        };
        setSelectedDaysInMonths(selected);
        onChange(getAllSelectedDates(selected));
    };

    const onWeekNumberClick = (weekNumber: number, month: Date) => {
        const weekDateRangeInMonth = getWeekDateRangeWithinMonth(weekNumber, month);
        const datesSelectedInMonth = selectedDaysInMonths[getMonthKey(month)] || [];
        const selectedDatesInWeek = getSelectedDatesInWeek(weekDateRangeInMonth, datesSelectedInMonth);

        if (selectedDatesInWeek.length === getDatesInDateRange(weekDateRangeInMonth).length) {
            onSelectDates(month, removeDatesInArray(datesSelectedInMonth, selectedDatesInWeek));
        } else {
            onSelectDates(
                month,
                removeDuplicateDatesInArray([
                    ...getDatesInDateRange(weekDateRangeInMonth, true),
                    ...datesSelectedInMonth,
                ]),
            );
        }
    };

    const monthsWithSelectedDates = months
        .filter((m) => (selectedDaysInMonths[getMonthKey(m.from)] || []).length > 0)
        .sort(sortDateRange);

    if (mode === 'calendar' && currentMonth) {
        return (
            <div className="daySelector__calendarWrapper">
                <div className="daySelector__calendarContent">
                    <DatePicker.Standalone
                        locale="nb"
                        onMonthChange={(month) => {
                            setCurrentMonth(month);
                        }}
                        className="daySelector__month"
                        fromDate={dateRange.from}
                        toDate={dateRange.to}
                        fixedWeeks={false}
                        disableWeekends={true}
                        month={currentMonth}
                        selected={selectedDaysInMonths[getMonthKey(currentMonth)] || []}
                        showWeekNumber={true}
                        onWeekNumberClick={(weekNumber) => onWeekNumberClick(weekNumber, currentMonth)}
                        mode="multiple"
                        onSelect={(dates) => onSelectDates(currentMonth, dates || [])}
                    />
                    <div className="daySelector__tags">
                        <VStack gap="2">
                            {/* <HStack gap="5" align={'center'}> */}
                            <BodyShort as="div" spacing={false}>
                                Valgte dager:
                            </BodyShort>

                            {1 + 1 === 2 && (
                                <HStack gap={'2'} align={'center'} wrap={true}>
                                    {monthsWithSelectedDates.map((m, index) => {
                                        return (
                                            <Link
                                                key={index}
                                                variant="action"
                                                onClick={() => setCurrentMonth(m.from)}
                                                underline={false}
                                                style={{ cursor: 'pointer' }}>
                                                <Tag variant="info" key={index}>
                                                    <div className="capitalize">{dayjs(m.from).format('MMMM')}</div>:{' '}
                                                    {selectedDaysInMonths[getMonthKey(m.from)].length}
                                                </Tag>
                                            </Link>
                                        );
                                    })}
                                </HStack>
                            )}
                            {/* </HStack> */}
                            {1 + 1 === 3 && (
                                // <ReadMore header="Vis dager som er valgt">
                                <SelectedDatesList dates={getAllSelectedDates(selectedDaysInMonths).sort(sortDates)} />
                                // </ReadMore>
                            )}
                        </VStack>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="daySelectorWrapper">
            <Accordion>
                {months.map((month) => {
                    const numSelectedDays = (selectedDaysInMonths[getMonthKey(month.from)] || []).length;
                    const title = dayjs(month.from).format('MMMM YYYY');
                    const numDagerTekst = `${numSelectedDays} ${numSelectedDays === 1 ? 'dag' : 'dager'} valgt`;
                    return (
                        <Accordion.Item key={dateRangeToISODateRange(month)}>
                            <Accordion.Header style={{ width: '100%' }}>
                                <HStack gap="4" align="center">
                                    <div style={{ minWidth: '10rem' }} className="capitalize">
                                        {title}
                                    </div>
                                    {numSelectedDays === 0 ? (
                                        <BodyShort as="div" size="small">
                                            Ingen dager valgt
                                        </BodyShort>
                                    ) : (
                                        <Tag variant="info" size="small">
                                            {numDagerTekst}
                                        </Tag>
                                    )}
                                </HStack>
                            </Accordion.Header>
                            <Accordion.Content>
                                <div key={dateRangeToISODateRange(month)} className="daySelector">
                                    <DatePicker.Standalone
                                        locale="nb"
                                        className="daySelector__month"
                                        fromDate={month.from}
                                        toDate={month.to}
                                        fixedWeeks={false}
                                        disableWeekends={true}
                                        selected={selectedDaysInMonths[getMonthKey(month.from)] || []}
                                        showWeekNumber={true}
                                        onWeekNumberClick={(weekNumber) => onWeekNumberClick(weekNumber, month.from)}
                                        mode="multiple"
                                        onSelect={(dates) => onSelectDates(month.from, dates || [])}
                                    />
                                </div>
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </div>
    );
};

export const getWeekDateRangeWithinMonth = (weekNumber: number, month: Date): DateRange => {
    const from = getLastOfTwoDates(
        dayjs(month).isoWeek(weekNumber).startOf('isoWeek').toDate(),
        dayjs(month).startOf('month').toDate(),
    );

    return {
        from,
        to: getFirstOfTwoDates(
            dayjs(from).endOf('isoWeek').subtract(2, 'days').toDate(), // fredag
            dayjs(month).endOf('month').toDate(), // siste dag i måneden
        ),
    };
};

export const getSelectedDatesInWeek = (week: DateRange, dates: Date[]): Date[] => {
    return dates.filter((d) => isDateInDateRange(d, week));
};

export const removeDuplicateDatesInArray = (dates: Date[]) => {
    return dates.filter((date, index, self) => {
        return self.findIndex((d) => d.getTime() === date.getTime()) === index;
    });
};

export const removeDatesInArray = (dates: Date[], datesToRemove: Date[]) => {
    return dates.filter((date) => {
        return datesToRemove.some((d) => d.getTime() === date.getTime()) === false;
    });
};

const getAllSelectedDates = (selectedDaysInMonths: SelectedDaysInMonths): Date[] => {
    const dates: Date[] = [];
    Object.keys(selectedDaysInMonths).forEach((monthKey) => {
        const monthDates = selectedDaysInMonths[monthKey];
        dates.push(...monthDates);
    });

    return dates;
};

const getSelectedDaysInMonthsFromDates = (dateRange: DateRange, dates: Date[]): SelectedDaysInMonths => {
    const datesInRange = dates.filter((d) => isDateInDateRange(d, dateRange));
    const selectedDaysInMonths: SelectedDaysInMonths = {};
    datesInRange.forEach((date) => {
        const monthKey = getMonthKey(date);
        if (selectedDaysInMonths[monthKey]) {
            selectedDaysInMonths[monthKey].push(date);
        } else {
            selectedDaysInMonths[monthKey] = [date];
        }
    });
    return selectedDaysInMonths;
};

export default DaySelector;
