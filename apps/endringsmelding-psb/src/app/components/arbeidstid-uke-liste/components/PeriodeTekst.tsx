import React from 'react';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';

interface Props {
    periode: DateRange;
}

const PeriodeTekst: React.FunctionComponent<Props> = ({ periode: { from, to } }) => {
    const sammeDato = dayjs(from).isSame(to, 'date');
    if (sammeDato) {
        return <>{dateFormatter.compact(from)}</>;
    }
    return (
        <>
            {dateFormatter.compact(from)} - {dateFormatter.compact(to)}
        </>
    );
};

export default PeriodeTekst;
