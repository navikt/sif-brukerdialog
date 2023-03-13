import React from 'react';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';

interface Props {
    periode: DateRange;
    compact?: boolean;
}

export const getPeriodeTekst = ({ from, to }: DateRange, compact = true): string => {
    const sammeDato = dayjs(from).isSame(to, 'date');
    const fromString = compact ? dateFormatter.compact(from) : dateFormatter.full(from);
    const toString = compact ? dateFormatter.compact(to) : dateFormatter.full(to);

    if (sammeDato) {
        return fromString;
    }
    return `${fromString} - ${toString}`;
};

const PeriodeTekst: React.FunctionComponent<Props> = ({ periode, compact }) => <>{getPeriodeTekst(periode, compact)}</>;

export default PeriodeTekst;
