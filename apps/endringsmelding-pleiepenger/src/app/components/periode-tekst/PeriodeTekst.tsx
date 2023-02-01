import React from 'react';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';

interface Props {
    periode: DateRange;
}

export const getPeriodeTekst = ({ from, to }: DateRange): string => {
    const sammeDato = dayjs(from).isSame(to, 'date');
    if (sammeDato) {
        return dateFormatter.compact(from);
    }
    return `${dateFormatter.compact(from)} - ${dateFormatter.compact(to)}`;
};

const PeriodeTekst: React.FunctionComponent<Props> = ({ periode }) => <>{getPeriodeTekst(periode)}</>;

export default PeriodeTekst;
