import React from 'react';
import { dateFormatter, dateRangeToISODateRange, getDateRangesFromDates } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import { List } from '@navikt/ds-react';

interface Props {
    dates: Date[];
    groupDates?: boolean;
}

const SelectedDatesList: React.FunctionComponent<Props> = ({ dates, groupDates }) => {
    const dateRanges = groupDates ? getDateRangesFromDates(dates) : dates.map((d) => ({ from: d, to: d }));
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

export default SelectedDatesList;
