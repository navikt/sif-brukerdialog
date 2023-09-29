import { Accordion, Heading } from '@navikt/ds-react';
import React from 'react';
import { ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib';
import {
    DateRange,
    dateToISODate,
    getDatesInDateRange,
    getMonthsInDateRange,
    getWeeksInDateRange,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import DurationWeekdaysWeek from './duration-weekdays-week/DurationWeekdaysWeek';
import './durationWeekdaysInput.scss';

export interface DurationWeekdaysInputProps {
    dateRange: DateRange;
    disabledDates?: Date[];
    formikFieldName: string;
    useAccordion?: boolean;
    accordionOpen?: boolean;
    validateDate: (date: Date, value?: string) => ValidationResult<ValidationError>;
}

const DurationWeekdaysInput: React.FunctionComponent<DurationWeekdaysInputProps> = ({
    dateRange,
    formikFieldName,
    disabledDates = [],
    useAccordion,
    accordionOpen,
    validateDate,
}) => {
    const months = getMonthsInDateRange(dateRange);

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
                            validate={validateDate}
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
                    const dates = getDatesInDateRange(month, true);
                    const enabledDatesInMonth = dates
                        .map(dateToISODate)
                        .filter((d) => disabledDates.map(dateToISODate).includes(d) === false);
                    if (enabledDatesInMonth.length === 0) return null;

                    const weeks = getWeeksInDateRange(month);
                    return (
                        <Accordion.Item key={dateToISODate(month.from)} open={accordionOpen ? true : undefined}>
                            <Accordion.Header>{dayjs(month.from).format('MMMM YYYY')}</Accordion.Header>
                            <Accordion.Content className="durationWeekdaysInput__monthAccordionItem">
                                {renderWeeks(weeks)}
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
                const weeks = getWeeksInDateRange(month);
                return (
                    <div key={dateToISODate(month.from)} className="durationWeekdaysInput__month">
                        <Heading level="2" size="medium" className="capitalizeFirstChar" spacing={true}>
                            {dayjs(month.from).format('MMMM YYYY')}
                        </Heading>
                        <div>{renderWeeks(weeks)}</div>
                    </div>
                );
            })}
        </>
    );
};

export default DurationWeekdaysInput;
