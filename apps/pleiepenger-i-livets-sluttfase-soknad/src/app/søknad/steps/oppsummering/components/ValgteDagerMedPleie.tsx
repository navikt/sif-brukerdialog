import React from 'react';
import { dateFormatter, dateRangeToISODateRange, getDateRangesFromDates } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';

interface Props {
    dagerMedPleie: Date[];
}

const ValgteDagerMedPleie: React.FunctionComponent<Props> = ({ dagerMedPleie }) => {
    const dateRanges = getDateRangesFromDates(dagerMedPleie);
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

export default ValgteDagerMedPleie;
