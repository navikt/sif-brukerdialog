import React from 'react';
import { dateFormatter, dateRangeToISODateRange, getDateRangesFromDates } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';

interface Props {
    dates: Date[];
}

const SelectedDatesList: React.FunctionComponent<Props> = ({ dates }) => {
    const dateRanges = getDateRangesFromDates(dates);
    return (
        <ul>
            {dateRanges.map((dr) => (
                <li key={dateRangeToISODateRange(dr)} className="capitalize">
                    {dayjs(dr.from).isSame(dr.to, 'day') ? (
                        <>{dateFormatter.dayCompactDate(dr.from)}</>
                    ) : (
                        <>
                            {dateFormatter.dayCompactDate(dr.from)} - {dateFormatter.dayCompactDate(dr.to)}
                        </>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default SelectedDatesList;
