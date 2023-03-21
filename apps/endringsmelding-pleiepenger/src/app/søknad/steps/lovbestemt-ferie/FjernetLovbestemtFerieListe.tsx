import React from 'react';
import ItemList from '@navikt/sif-common-core-ds/lib/components/item-list/ItemList';
import { DateRange, dateRangeToISODateRange } from '@navikt/sif-common-utils/lib';
import { getPeriodeTekst } from '../../../components/periode-tekst/PeriodeTekst';
import ActionLink from '@navikt/sif-common-core-ds/lib/components/action-link/ActionLink';

interface Props {
    perioder: DateRange[];
    onAngreFjern?: (periode: DateRange) => void;
}

const FjernetLovbestemtFerieListe: React.FunctionComponent<Props> = ({ perioder, onAngreFjern }) => {
    if (perioder.length === 0) {
        return null;
    }

    return (
        <ItemList<DateRange>
            labelRenderer={(item) => <div className="capsFirstChar">{getPeriodeTekst(item, false, true)}</div>}
            items={perioder}
            getItemId={(item) => dateRangeToISODateRange(item)}
            getItemTitle={(item) => getPeriodeTekst(item, false, true)}
            deleteRenderer={
                onAngreFjern
                    ? (item: DateRange) => {
                          return (
                              <ActionLink onClick={() => onAngreFjern(item)}>
                                  <span style={{ whiteSpace: 'nowrap' }}>Angre fjern</span>
                              </ActionLink>
                          );
                      }
                    : undefined
            }
        />
    );
};

export default FjernetLovbestemtFerieListe;
