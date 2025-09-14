import { InformationColored } from '@navikt/ds-icons';
import { dateFormatter, DateRange } from '@navikt/sif-common-utils';

import { ArbeidstidUkerItem } from '../types/ArbeidstidUkerItem';

interface Props {
    uke: ArbeidstidUkerItem;
}

const UkeInfoIkon = ({ uke }: Props) => {
    return (
        <span style={{ fontSize: '1.4rem' }}>
            <InformationColored aria-label={`Kort uke - ${getDagerPeriode(uke.periode, false)}`} />
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
