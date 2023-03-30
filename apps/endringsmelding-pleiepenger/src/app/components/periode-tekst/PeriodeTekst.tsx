import React from 'react';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';

interface Props {
    periode: DateRange;
    compact?: boolean;
    inkluderDagNavn?: boolean;
}

const getDatoTekst = (dato: Date, compact = true, inkluderDagNavn?: boolean): string => {
    const tekst = compact ? dateFormatter.compact(dato) : dateFormatter.full(dato);
    return inkluderDagNavn ? `${dateFormatter.day(dato)} ${tekst}` : tekst;
};

export const getPeriodeTekst = ({ from, to }: DateRange, compact = true, inkluderDagNavn?: boolean): string => {
    const sammeDato = dayjs(from).isSame(to, 'date');
    const fromString = getDatoTekst(from, compact, inkluderDagNavn);
    const toString = getDatoTekst(to, compact, inkluderDagNavn);

    if (sammeDato) {
        return fromString;
    }
    return `${fromString} - ${toString}`;
};

const PeriodeTekst: React.FunctionComponent<Props> = ({ periode, compact, inkluderDagNavn }) => (
    <>{getPeriodeTekst(periode, compact, inkluderDagNavn)}</>
);

export default PeriodeTekst;
