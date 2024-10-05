import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { dateFormatter, dateToISODate } from '@navikt/sif-common-utils';
import classNames from 'classnames';

interface Props {
    date: Date;
    dateRendererShort?: (date: Date) => React.ReactNode;
    dateRendererFull?: (date: Date) => React.ReactNode;
}

const bem = bemUtils('calendarGrid');

const CalendarGridDate: React.FunctionComponent<Props> = ({
    date,
    dateRendererShort = dateFormatter.compact,
    dateRendererFull = dateFormatter.dayDateMonth,
}) => {
    const id = `${dateToISODate(date)}_date`;

    const content = (
        <>
            <span className={classNames(bem.element('date__full'))}>
                <span>{dateRendererFull(date)}</span>
            </span>
            <span className={bem.element('date__short')} id={id}>
                {dateRendererShort(date)}
            </span>
        </>
    );

    return <span className={bem.element('date')}>{content}</span>;
};
export default CalendarGridDate;
