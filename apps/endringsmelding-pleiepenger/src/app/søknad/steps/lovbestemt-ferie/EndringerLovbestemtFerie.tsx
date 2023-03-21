import React from 'react';
import { LovbestemtFerieEndringer } from '../../../types/LovbestemFerieEndringer';
import ItemList from '@navikt/sif-common-core-ds/lib/components/item-list/ItemList';
import { DateRange, dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import { getPeriodeTekst } from '../../../components/periode-tekst/PeriodeTekst';
import ActionLink from '@navikt/sif-common-core-ds/lib/components/action-link/ActionLink';

interface Props {
    endringer: LovbestemtFerieEndringer;
    onAngreFjern: (periode: DateRange) => void;
}

const FerieFjernetListe: React.FunctionComponent<Props> = ({ endringer, onAngreFjern }) => {
    if (endringer.erEndret === false) {
        return null;
    }

    return (
        <ItemList<DateRange>
            labelRenderer={(item) => <div className="capsFirstChar">{getPeriodeTekst(item, false, true)}</div>}
            items={endringer.perioderFjernet}
            getItemId={(item) => dateRangeToISODateRange(item)}
            getItemTitle={(item) => getPeriodeTekst(item, false, true)}
            deleteRenderer={(item: DateRange) => {
                return (
                    <ActionLink onClick={() => onAngreFjern(item)}>
                        <span style={{ whiteSpace: 'nowrap' }}>Angre fjern</span>
                    </ActionLink>
                );
            }}
        />
    );
};

export default FerieFjernetListe;
