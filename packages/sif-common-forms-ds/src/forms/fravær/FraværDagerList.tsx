import React from 'react';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import FraværListItem from './FraværListItem';
import { timeText } from './fraværUtilities';
import { FraværDag } from './types';

interface Props {
    fraværDager: FraværDag[];
    onEdit?: (fraværDag: FraværDag) => void;
    onDelete?: (fraværDag: FraværDag) => void;
}

const FraværDagerList = ({ fraværDager = [], onDelete, onEdit }: Props) => {
    const getFraværDagListItemTitle = (fraværDag: FraværDag) =>
        `${prettifyDateExtended(fraværDag.dato)}:
        Skulle jobbet ${fraværDag.timerArbeidsdag} ${timeText(fraværDag.timerArbeidsdag)}.
        Borte fra jobb ${fraværDag.timerFravær}  ${timeText(fraværDag.timerFravær)}.`;

    const renderFraværDagLabel = (fraværDag: FraværDag): React.ReactNode => {
        const title = getFraværDagListItemTitle(fraværDag);
        return <FraværListItem title={title} onEdit={onEdit ? () => onEdit(fraværDag) : undefined} />;
    };

    return (
        <ItemList<FraværDag>
            getItemId={(fraværDag) => fraværDag.id}
            getItemTitle={(fraværDag) => getFraværDagListItemTitle(fraværDag)}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderFraværDagLabel}
            items={fraværDager.filter((fraværDag) => fraværDag.id !== undefined)}
        />
    );
};

export default FraværDagerList;
