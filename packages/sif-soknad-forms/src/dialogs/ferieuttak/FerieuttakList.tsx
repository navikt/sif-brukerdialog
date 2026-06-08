import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { dateRangeFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { Ferieuttak } from './types';

interface Props {
    ferieuttak: Ferieuttak[];
    onEdit?: (ferieuttak: Ferieuttak) => void;
    onDelete?: (ferieuttak: Ferieuttak) => void;
}

const getTitle = (uttak: Ferieuttak) => {
    return `${dateRangeFormatter.compact(uttak)}`;
};

const renderFerieuttakLabel = (uttak: Ferieuttak, onEdit?: (ferieuttak: Ferieuttak) => void): ReactNode => {
    const title = getTitle(uttak);
    return <div>{onEdit ? <ActionLink onClick={() => onEdit(uttak)}>{title}</ActionLink> : title}</div>;
};

export const FerieuttakList = ({ ferieuttak, onEdit, onDelete }: Props) => {
    return (
        <ItemListDarkside<Ferieuttak>
            getItemId={(uttak): string => uttak.id}
            getItemTitle={(uttak): string => getTitle(uttak)}
            labelRenderer={(uttak) => renderFerieuttakLabel(uttak, onEdit)}
            items={ferieuttak}
            onDelete={onDelete}
        />
    );
};
