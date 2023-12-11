import { Accordion, Heading } from '@navikt/ds-react';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib';
import {
    DateRange,
    dateToISODate,
    getDatesInDateRange,
    getMonthsInDateRange,
    getWeeksInDateRange,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import React from 'react';
import DurationWeekdaysWeek from './duration-weekdays-week/DurationWeekdaysWeek';
import './durationWeekdaysInput.scss';

export type DurationWeekdaysDateValidator = (
    value: string | undefined,
    date: Date,
) => ValidationResult<ValidationError>;

export interface DurationWeekdaysInputProps {
    dateRange: DateRange;
    disabledDates?: Date[];
    formikFieldName: string;
    useAccordion?: boolean;
    accordionOpen?: boolean;
    renderMonthHeader?: (month: Date, enabledDatesInMonth: number) => React.ReactNode;
    validateDate: DurationWeekdaysDateValidator;
}

const DurationWeekdaysInput: React.FunctionComponent<DurationWeekdaysInputProps> = ({
    dateRange,
    formikFieldName,
    disabledDates = [],
    useAccordion,
    accordionOpen,
    renderMonthHeader,
    validateDate,
}) => {
    const months = getMonthsInDateRange(dateRange);

    const getEnabledDatesInMonth = (month: DateRange) => {
        const dates = getDatesInDateRange(month, true);
        return dates.map(dateToISODate).filter((d) => disabledDates.map(dateToISODate).includes(d) === false);
    };

    const renderWeeks = (weeks: DateRange[]) => {
        return (
            <>
                {weeks.map((week) => {
                    const dates = getDatesInDateRange(week, true);
                    const enabledDatesInWeek = dates
                        .map(dateToISODate)
                        .filter((d) => disabledDates.map(dateToISODate).includes(d) === false);
                    if (enabledDatesInWeek.length === 0) return null;
                    return (
                        <DurationWeekdaysWeek
                            key={dateToISODate(week.from)}
                            week={week}
                            disabledDates={disabledDates}
                            formikFieldName={formikFieldName}
                            headingLevel="3"
                            validateDate={validateDate}
                        />
                    );
                })}
            </>
        );
    };

    if (useAccordion) {
        return (
            <Accordion>
                {months.map((month) => {
                    const enabledDatesInMonth = getEnabledDatesInMonth(month);
                    if (enabledDatesInMonth.length === 0) return null;

                    const weeks = getWeeksInDateRange(month);
                    return (
                        <Accordion.Item
                            key={dateToISODate(month.from)}
                            open={accordionOpen ? true : undefined}
                            defaultOpen={months.length === 1}>
                            <Accordion.Header>
                                {renderMonthHeader
                                    ? renderMonthHeader(month.from, enabledDatesInMonth.length)
                                    : dayjs(month.from).format('MMMM YYYY')}
                            </Accordion.Header>
                            <Accordion.Content className="durationWeekdaysInput__accordionContent">
                                <div className="durationWeekdaysInput__accordionContentMonth">{renderWeeks(weeks)}</div>
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
        );
    }

    return (
        <>
            {months.map((month) => {
                const enabledDatesInMonth = getEnabledDatesInMonth(month);
                const weeks = getWeeksInDateRange(month);
                return (
                    <div key={dateToISODate(month.from)} className="durationWeekdaysInput__month">
                        {renderMonthHeader ? (
                            renderMonthHeader(month.from, enabledDatesInMonth.length)
                        ) : (
                            <Heading level="3" size="xsmall" className="capitalizeFirstChar" spacing={true}>
                                {dayjs(month.from).format('MMMM YYYY')}
                            </Heading>
                        )}
                        <div>{renderWeeks(weeks)}</div>
                    </div>
                );
            })}
        </>
    );
};

export default DurationWeekdaysInput;
