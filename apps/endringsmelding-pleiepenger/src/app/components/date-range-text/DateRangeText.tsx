import React from 'react';
import { DateRange, dateRangeFormatter } from '@navikt/sif-common-utils/lib';

interface Props {
    periode: DateRange;
    compact?: boolean;
    inkluderDagNavn?: boolean;
}

const DateRangeText: React.FunctionComponent<Props> = ({ periode, compact, inkluderDagNavn }) => (
    <>{dateRangeFormatter.getDateRangeText(periode, { compact, includeDayName: inkluderDagNavn })}</>
);

export default DateRangeText;
