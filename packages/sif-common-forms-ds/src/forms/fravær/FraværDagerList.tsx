import React from 'react';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import FraværListItem from './FraværListItem';
import { FraværDag } from './types';
import { useFraværIntl } from '.';

interface Props {
    fraværDager: FraværDag[];
    onEdit?: (fraværDag: FraværDag) => void;
    onDelete?: (fraværDag: FraværDag) => void;
}

const FraværDagerList = ({ fraværDager = [], onDelete, onEdit }: Props) => {
    const { text, number } = useFraværIntl();
    const getFraværDagListItemTitle = (fraværDag: FraværDag) =>
        text('@forms.fraværDagerList.itemTitle', {
            dato: prettifyDateExtended(fraværDag.dato),
            timerArbeid: number(parseFloat(fraværDag.timerArbeidsdag)),
            arbeidFlertall: parseFloat(fraværDag.timerArbeidsdag) > 1,
            timerFravær: number(parseFloat(fraværDag.timerFravær)),
            fraværFlertall: parseFloat(fraværDag.timerFravær) > 1,
        });

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
