import { DateRange, getDatesInDateRange } from '@navikt/sif-common-utils/lib';
import React from 'react';
import { HStack, Heading } from '@navikt/ds-react';
import dayjs from 'dayjs';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import './weekWithDays.scss';

interface Props {
    week: DateRange;
    hideWeekend?: boolean;
}

const bem = bemUtils('weekWithDays');

const temp = (num: number) => {
    let str = '';
    let x = 0;
    while (x < num) {
        x++;
        str += x;
    }
    return str;
};

const WeekWithDays: React.FunctionComponent<Props> = ({ week, hideWeekend }) => {
    const datesInWeek = getDatesInDateRange(week, hideWeekend);
    const numDates = datesInWeek.length;

    return (
        <>
            <div className={bem.block}>
                <Heading level="2" size="medium" className={bem.element('weekNumber')}>
                    Uke {dayjs(week.from).isoWeek()}
                </Heading>
                <div className={bem.element('days')}>
                    {datesInWeek.map((date, index) => {
                        const day = dayjs(date).format('dddd'); //.substring(0, 3);
                        return (
                            <div key={index} className={bem.element('day')}>
                                <span className={bem.element('dayName')}>{day}.</span> {dayjs(date).format('D.')}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

// const WeekDat;
export default WeekWithDays;
