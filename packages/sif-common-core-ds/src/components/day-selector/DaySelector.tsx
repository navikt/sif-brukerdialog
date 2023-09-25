import { Accordion, Alert, BodyShort, DatePicker, Heading } from '@navikt/ds-react';
import React, { useMemo, useState } from 'react';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import {
    DateRange,
    dateRangeToISODateRange,
    getDatesInDateRange,
    getMonthsInDateRange,
    isDateInDateRange,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import './daySelector.css';
import { DayPicker } from 'react-day-picker';
import { nb } from 'date-fns/locale';

dayjs.extend(isoWeeksInYear);
dayjs.extend(isoWeek);

interface Props {
    dateRange: DateRange;
    maxDays?: number;
}

const getMonthKey = (date: Date): string => {
    return dayjs(date).format('MM_YYYY');
};

type SelectedDaysInMonths = { [monthAndYear: string]: Date[] };

const getWeekDateRange = (weekNumber: number, month: Date): DateRange => {
    const from = dayjs(month).isoWeek(weekNumber).startOf('isoWeek').toDate();
    return {
        from,
        to: dayjs(from).endOf('isoWeek').toDate(),
    };
};

const getSelectedDatesInWeek = (week: DateRange, dates: Date[]): Date[] => {
    return dates.filter((d) => isDateInDateRange(d, week));
};

const removeDuplicateDatesInArray = (dates: Date[]) => {
    return dates.filter((date, index, self) => {
        return self.findIndex((d) => d.getTime() === date.getTime()) === index;
    });
};

const removeDatesInArray = (dates: Date[], datesToRemove: Date[]) => {
    return dates.filter((date) => {
        return datesToRemove.some((d) => d.getTime() === date.getTime()) === false;
    });
};

const DaySelector: React.FunctionComponent<Props> = ({ dateRange }) => {
    const [selectedDaysInMonths, setSelectedDaysInMonths] = useState<SelectedDaysInMonths>({});

    const months: DateRange[] = useMemo(() => {
        return getMonthsInDateRange(dateRange);
    }, [dateRange]);

    useEffectOnce(() => {});

    const onSelectDates = (month: Date, dates: Date[]) => {
        setSelectedDaysInMonths({
            ...selectedDaysInMonths,
            ...{ [getMonthKey(month)]: dates },
        });
    };

    const onWeekNumberClick = (weekNumber: number, month: Date) => {
        const week = getWeekDateRange(weekNumber, month);
        const datesSelectedInMonth = selectedDaysInMonths[getMonthKey(month)] || [];
        const selectedDatesInWeek = getSelectedDatesInWeek(week, datesSelectedInMonth);

        if (selectedDatesInWeek.length === 5) {
            onSelectDates(month, removeDatesInArray(datesSelectedInMonth, selectedDatesInWeek));
        } else {
            onSelectDates(
                month,
                removeDuplicateDatesInArray([...getDatesInDateRange(week, true), ...datesSelectedInMonth]),
            );
        }
    };

    return (
        <div className="daySelectorWrapper">
            <Heading level="1" size="medium" spacing={true}>
                Hvilke dager har eller skal du pleie den syke?
            </Heading>

            <Accordion>
                {months.map((month) => {
                    const numSelectedDays = (selectedDaysInMonths[getMonthKey(month.from)] || []).length;
                    const title = dayjs(month.from).format('MMMM YYYY');
                    const numDagerTekst = `${numSelectedDays} ${numSelectedDays === 1 ? 'dag' : 'dager'} valgt`;
                    return (
                        <Accordion.Item key={dateRangeToISODateRange(month)}>
                            <Accordion.Header style={{ width: '100%' }}>
                                <div className="daySelectorHeader">
                                    <span className="daySelectorHeader__title">{title}</span>
                                    <BodyShort as="div" size="small" className="daySelectorHeader__count">
                                        {numDagerTekst}
                                    </BodyShort>
                                </div>
                            </Accordion.Header>
                            <Accordion.Content>
                                <div key={dateRangeToISODateRange(month)} className="daySelector">
                                    <Heading
                                        level="2"
                                        size="small"
                                        spacing={true}
                                        className="daySelector__monthAndYear">
                                        <span>{}</span>
                                    </Heading>

                                    <div className="navds-date__standalone-wrapper daySelector__month">
                                        <DayPicker
                                            locale={nb}
                                            ISOWeek={true}
                                            weekStartsOn={1}
                                            pagedNavigation={false}
                                            disableNavigation={true}
                                            className="navds-date daySelector__month daySelector__hideWeekend"
                                            fromDate={month.from}
                                            toDate={month.to}
                                            showOutsideDays={true}
                                            showWeekNumber={true}
                                            fixedWeeks={false}
                                            selected={selectedDaysInMonths[getMonthKey(month.from)] || []}
                                            onWeekNumberClick={(weekNumber) => {
                                                onWeekNumberClick(weekNumber, month.from);
                                            }}
                                            mode="multiple"
                                            onSelect={(dates) => {
                                                onSelectDates(month.from, dates || []);
                                            }}
                                            hidden={(d) => dayjs(d).isoWeekday() > 5}
                                            disabled={(d) => dayjs(d).isoWeekday() > 5}
                                            labels={{
                                                labelWeekNumber: (uke) => {
                                                    const week = getWeekDateRange(uke, month.from);
                                                    const selected = getSelectedDatesInWeek(
                                                        week,
                                                        selectedDaysInMonths[getMonthKey(month.from)] || [],
                                                    );
                                                    if (selected.length === 5) {
                                                        return `Uke ${uke} - velg ingen dager denne uken `;
                                                    }
                                                    return `Uke ${uke} - velg alle dager denne uken`;
                                                },
                                            }}
                                        />
                                    </div>
                                    <DatePicker.Standalone
                                        locale="nb"
                                        // disableNavigation={true}
                                        // numberOfMonths={1}
                                        // showOutsideDays={true}
                                        // className="daySelector__month"
                                        fromDate={month.from}
                                        toDate={month.to}
                                        fixedWeeks={false}
                                        disableWeekends={true}
                                        selected={selectedDaysInMonths[getMonthKey(month.from)] || []}
                                        showWeekNumber={true}
                                        // onWeekNumberClick={(weekNumber) => onWeekNumberClick(weekNumber, month.from)}
                                        mode="multiple"
                                        onSelect={(dates) => onSelectDates(month.from, dates || [])}
                                        // formatters={{
                                        //     formatWeekNumber: (weekNumber) => `${weekNumber}`,
                                        // }}
                                    />

                                    <Alert variant="info" size="small" inline={true}>
                                        <BodyShort size="small">
                                            Klikk på ukenummer for å velge alle eller ingen av dagene i uken.
                                        </BodyShort>
                                    </Alert>
                                </div>
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        </div>
    );
};

export default DaySelector;
