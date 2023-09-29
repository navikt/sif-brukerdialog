/* eslint-disable no-console */
import { Heading } from '@navikt/ds-react';
import React from 'react';
import AriaAlternative from '@navikt/sif-common-core-ds/lib/atoms/aria-alternative/AriaAlternative';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { FormikTimeInput, ValidationError, ValidationResult } from '@navikt/sif-common-formik-ds/lib';
import {
    dateFormatter,
    DateRange,
    dateToISODate,
    getDatesInDateRange,
    getDatesInWeekOutsideDateRange,
    getWeekDateRange,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import './durationWeekdaysWeek.scss';

interface Props {
    /** Week DateRange */
    week: DateRange;
    /** Disabled dates */
    disabledDates?: Date[];
    /** Formik field name */
    formikFieldName: string;
    /** Heading level */
    headingLevel: '1' | '2' | '3' | '4' | '5' | '6';
    /** Date validation */
    validate?: (date: Date, value?: string) => ValidationResult<ValidationError>;
}

const bem = bemUtils('durationWeekdaysWeek');

const DurationWeekdaysWeek: React.FunctionComponent<Props> = ({
    week,
    disabledDates = [],
    formikFieldName,
    headingLevel = '3',
    validate,
}) => {
    const fullWeek = getWeekDateRange(week.from, true);
    const dates = getDatesInDateRange(fullWeek);
    const isoWeek = dayjs(fullWeek.from).isoWeek();
    const datesOutsideRange = getDatesInWeekOutsideDateRange(fullWeek.from, week);
    const allDisabledDates = [...disabledDates, ...datesOutsideRange];

    return (
        <div className={bem.block}>
            <Heading size="xsmall" level={headingLevel} className={bem.element('weekNumber')}>
                Uke {isoWeek}
            </Heading>
            <div className={bem.element('daysWrapper')}>
                <div className={bem.element('days')}>
                    {dates.map((date, index) => {
                        const dayName = dateFormatter.day(date).substring(0, 3);
                        const dateIsDisabled = allDisabledDates.some((disabledDate) =>
                            dayjs(disabledDate).isSame(date, 'day'),
                        );

                        if (dayjs(date).isAfter(week.from, 'month') || dayjs(date).isAfter(week.to, 'day')) {
                            return null;
                        }

                        return (
                            <div className={bem.element('day', dateIsDisabled ? 'disabled' : '')} key={index}>
                                <FormikTimeInput
                                    label={
                                        <span className={bem.element('dayLegend', dateIsDisabled ? 'disabled' : '')}>
                                            <AriaAlternative
                                                visibleText={
                                                    <span
                                                        className={bem.element(
                                                            'dayName',
                                                        )}>{`${dayName}. ${date.getDate()}.`}</span>
                                                }
                                                ariaText={dateFormatter.dayDateMonth(date)}
                                            />
                                        </span>
                                    }
                                    name={`${formikFieldName}.${dateToISODate(date)}`}
                                    disabled={dateIsDisabled}
                                    timeInputLayout={{
                                        direction: 'vertical',
                                        compact: true,
                                    }}
                                    timeInputLabels={{
                                        minutes: <AriaAlternative visibleText="Min." ariaText="Minutter" />,
                                        hours: <AriaAlternative visibleText="Timer" ariaText="Timer" />,
                                    }}
                                    validate={validate ? (value) => validate(date, value) : undefined}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DurationWeekdaysWeek;
