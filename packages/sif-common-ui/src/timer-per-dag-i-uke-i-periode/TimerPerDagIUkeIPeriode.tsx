/* eslint-disable no-console */
import { DateRange, dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import React from 'react';

interface Props {
    periode: DateRange;
    disabledDates: Date[];
}

const TimerPerDagIUkeIPeriode: React.FunctionComponent<Props> = ({ periode }) => {
    console.log(periode);
    return <div>{dateRangeToISODateRange(periode)}</div>;
};

export default TimerPerDagIUkeIPeriode;
