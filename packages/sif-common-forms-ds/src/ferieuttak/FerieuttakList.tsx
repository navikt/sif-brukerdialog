import React from 'react';
import ActionLink from '@navikt/sif-common-core/lib/components/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core/lib/components/item-list/ItemList';
import { prettifyDateExtended } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { Ferieuttak } from './types';

interface Props {
    ferieuttak: Ferieuttak[];
    onEdit?: (opphold: Ferieuttak) => void;
    onDelete?: (opphold: Ferieuttak) => void;
}

const FerieuttakList = ({ ferieuttak = [], onDelete, onEdit }: Props) => {
    const getDateTitleString = (uttak: Ferieuttak) =>
        `${prettifyDateExtended(uttak.fom)} - ${prettifyDateExtended(uttak.tom)}`;

    const renderFerieuttakLabel = (uttak: Ferieuttak): React.ReactNode => {
        const title = getDateTitleString(uttak);
        return (
            <>
                {onEdit && <ActionLink onClick={() => onEdit(uttak)}>{title}</ActionLink>}
                {!onEdit && <span>{title}</span>}
            </>
        );
    };

    return (
        <ItemList<Ferieuttak>
            getItemId={(uttak) => uttak.id}
            getItemTitle={(uttak) => getDateTitleString(uttak)}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderFerieuttakLabel}
            items={ferieuttak.filter((uttak) => uttak.id !== undefined)}
        />
    );
};

export default FerieuttakList;
