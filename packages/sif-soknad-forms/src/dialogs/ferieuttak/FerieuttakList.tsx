import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { Ferieuttak } from './types';

interface Props {
    ferieuttak: Ferieuttak[];
    onEdit?: (ferieuttak: Ferieuttak) => void;
    onDelete?: (ferieuttak: Ferieuttak) => void;
}

const renderFerieuttakLabel = (uttak: Ferieuttak, onEdit?: (ferieuttak: Ferieuttak) => void): ReactNode => {
    const title = `${prettifyDateExtended(uttak.from)} - ${prettifyDateExtended(uttak.to)}`;
    return (
        <div>
            {onEdit && <ActionLink onClick={() => onEdit(uttak)}>{title}</ActionLink>}
            {!onEdit && <span>{title}</span>}
        </div>
    );
};

export const FerieuttakList = ({ ferieuttak, onEdit, onDelete }: Props) => {
    return (
        <ItemListDarkside<Ferieuttak>
            getItemId={(uttak): string => uttak.id}
            getItemTitle={(uttak): string => `${prettifyDateExtended(uttak.from)} - ${prettifyDateExtended(uttak.to)}`}
            labelRenderer={(uttak) => renderFerieuttakLabel(uttak, onEdit)}
            items={ferieuttak}
            onDelete={onDelete}
        />
    );
};
