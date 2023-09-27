import { Heading } from '@navikt/ds-react';
import React from 'react';
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
}

const DurationWeekdaysInput: React.FunctionComponent<DurationWeekdaysInputProps> = ({
    dateRange,
    disabledDates = [],
}) => {
    const months = getMonthsInDateRange(dateRange);

    return (
        <>
            {months.map((month) => {
                const weeks = getWeeksInDateRange(month);
                return (
                    <div key={dateToISODate(month.from)} className="durationWeekdaysInput__month">
                        <Heading level="2" size="medium" className="capitalizeFirstChar" spacing={true}>
                            {dayjs(month.from).format('MMMM YYYY')}
                        </Heading>
                        <div>
                            {weeks.map((week) => {
                                const hasDates = getDatesInDateRange(week, true);
                                if (hasDates.length === 0) return null;
                                return (
                                    <DurationWeekdaysWeek
                                        key={dateToISODate(week.from)}
                                        week={week}
                                        disabledDates={disabledDates}
                                        formikFieldName="timer"
                                        headingLevel="3"
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default DurationWeekdaysInput;
