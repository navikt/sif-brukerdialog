import { List } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter, dateRangeToISODateRange, getDateRangesFromDates } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';

interface Props {
    dagerMedPleie: Date[];
}

const ValgteDagerMedPleie: React.FunctionComponent<Props> = ({ dagerMedPleie }) => {
    const dateRanges = getDateRangesFromDates(dagerMedPleie);
    return (
        <List>
            {dateRanges.map((dr) => (
                <List.Item key={dateRangeToISODateRange(dr)} className="capitalize">
                    {dayjs(dr.from).isSame(dr.to, 'day') ? (
                        <>{dateFormatter.dayCompactDate(dr.from)}</>
                    ) : (
                        <>
                            {dateFormatter.dayCompactDate(dr.from)} - {dateFormatter.dayCompactDate(dr.to)}
                        </>
                    )}
                </List.Item>
            ))}
        </List>
    );
};

export default ValgteDagerMedPleie;
