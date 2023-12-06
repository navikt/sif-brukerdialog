/* eslint-disable no-console */
import { Fieldset, Heading } from '@navikt/ds-react';
import React from 'react';
import AriaAlternative from '@navikt/sif-common-core-ds/lib/atoms/aria-alternative/AriaAlternative';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { FormikTimeInput } from '@navikt/sif-common-formik-ds/lib';
import {
    dateFormatter,
    DateRange,
    dateToISODate,
    getDatesInDateRange,
    getDatesInWeekOutsideDateRange,
    getWeekDateRange,
} from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { DurationWeekdaysDateValidator } from '../DurationWeekdaysInput';
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
    validateDate?: DurationWeekdaysDateValidator;
}

const bem = bemUtils('durationWeekdaysWeek');

const DurationWeekdaysWeek: React.FunctionComponent<Props> = ({
    week,
    disabledDates = [],
    formikFieldName,
    headingLevel = '3',
    validateDate,
}) => {
    const fullWeek = getWeekDateRange(week.from, true);
    const dates = getDatesInDateRange(fullWeek);
    const isoWeek = dayjs(fullWeek.from).isoWeek();
    const datesOutsideRange = getDatesInWeekOutsideDateRange(fullWeek.from, week);
    const allDisabledDates = [...disabledDates, ...datesOutsideRange];

    const datesInWeekAndMonth = dates.filter(
        (date) => dayjs(date).isAfter(week.from, 'month') === false && dayjs(date).isAfter(week.to, 'day') === false,
    );

    if (datesInWeekAndMonth.length === 0) {
        return null;
    }

    return (
        <div className={bem.block}>
            <Fieldset
                legend={
                    <Heading size="xsmall" level={headingLevel} className={bem.element('weekNumber')}>
                        Uke {isoWeek}
                    </Heading>
                }>
                <div className={bem.element('daysWrapper')}>
                    <div className={bem.element('days')}>
                        {datesInWeekAndMonth.map((date, index) => {
                            const dayName = dateFormatter.day(date).substring(0, 3);
                            const fieldName = `${formikFieldName}.${dateToISODate(date)}`;
                            const dateIsDisabled = allDisabledDates.some((disabledDate) =>
                                dayjs(disabledDate).isSame(date, 'day'),
                            );

                            return (
                                <div className={bem.element('day', dateIsDisabled ? 'disabled' : '')} key={index}>
                                    <FormikTimeInput
                                        label={
                                            <span
                                                className={bem.element('dayLegend', dateIsDisabled ? 'disabled' : '')}>
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
                                        name={fieldName}
                                        disabled={dateIsDisabled}
                                        timeInputLayout={{
                                            direction: 'vertical',
                                            compact: true,
                                        }}
                                        timeInputLabels={{
                                            minutes: 'Minutter',
                                            hours: 'Timer',
                                        }}
                                        validate={
                                            validateDate
                                                ? (value) => {
                                                      return validateDate(value, date);
                                                  }
                                                : undefined
                                        }
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Fieldset>
        </div>
    );
};

export default DurationWeekdaysWeek;
