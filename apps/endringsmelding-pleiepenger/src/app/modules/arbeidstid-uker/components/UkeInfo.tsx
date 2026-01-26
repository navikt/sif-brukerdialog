import { InformationSquareFillIcon } from '@navikt/aksel-icons';
import { Tooltip } from '@navikt/ds-react';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';

import { ArbeidstidUkerItem } from '../types/ArbeidstidUkerItem';

interface Props {
    uke: ArbeidstidUkerItem;
}

const UkeInfoIkon = ({ uke }: Props) => {
    return (
        <span style={{ fontSize: '1.5rem' }}>
            <Tooltip content={`Kort uke - ${getDagerPeriode(uke.periode, false)}`}>
                <InformationSquareFillIcon
                    style={{ color: '#457c9d' }}
                    aria-label={`Kort uke - ${getDagerPeriode(uke.periode, false)}`}
                />
            </Tooltip>
        </span>
    );
};

const getDagerPeriode = ({ from, to }: DateRange, visDato = true): string => {
    const fra = visDato ? dateFormatter.dayDateMonthYear(from) : dateFormatter.day(from);
    const til = visDato ? dateFormatter.dayDateMonthYear(to) : dateFormatter.day(to);
    if (fra === til) {
        return fra;
    }
    return `${fra} til ${til}`;
};

export default UkeInfoIkon;
