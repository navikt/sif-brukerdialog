import { dateFormatter, DateRange } from '@navikt/sif-common-utils';

import { ArbeidstidUkerItem } from '../types/ArbeidstidUkerItem';
import { InformationSquareFillIcon } from '@navikt/aksel-icons';

interface Props {
    uke: ArbeidstidUkerItem;
}

const UkeInfoIkon = ({ uke }: Props) => {
    return (
        <span style={{ fontSize: '1.4rem' }}>
            <InformationSquareFillIcon
                style={{ color: '#4CADCD' }}
                aria-label={`Kort uke - ${getDagerPeriode(uke.periode, false)}`}
            />
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
