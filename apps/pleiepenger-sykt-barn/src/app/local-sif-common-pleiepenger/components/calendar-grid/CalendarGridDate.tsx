import React from 'react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { dateFormatter } from '@navikt/sif-common-utils';

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
    const content = (
        <>
            <span className={bem.classNames(bem.element('date__full'))}>
                <span>{dateRendererFull(date)}</span>
            </span>
            <span className={bem.element('date__short')}>{dateRendererShort(date)}</span>
        </>
    );

    return <span className={bem.element('date')}>{content}</span>;
};
export default CalendarGridDate;
