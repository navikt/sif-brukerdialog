import React from 'react';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { FraværPeriode } from './types';
import FraværListItem from './FraværListItem';

interface Props {
    fraværPerioder: FraværPeriode[];
    onEdit?: (fraværPeriode: FraværPeriode) => void;
    onDelete?: (fraværPeriode: FraværPeriode) => void;
    useTrashcan?: boolean;
}

const FraværPerioderList = ({ fraværPerioder = [], onDelete, onEdit, useTrashcan }: Props) => {
    const getDateTitleString = (fraværPeriode: FraværPeriode) =>
        `${prettifyDateExtended(fraværPeriode.fraOgMed)} - ${prettifyDateExtended(fraværPeriode.tilOgMed)}`;

    const renderFraværPeriodeLabel = (fraværPeriode: FraværPeriode): React.ReactNode => {
        const title = getDateTitleString(fraværPeriode);
        return <FraværListItem title={title} onEdit={onEdit ? () => onEdit(fraværPeriode) : undefined} />;
    };

    return (
        <ItemList<FraværPeriode>
            getItemId={(fraværPeriode) => fraværPeriode.id}
            getItemTitle={(fraværPeriode) => getDateTitleString(fraværPeriode)}
            labelRenderer={renderFraværPeriodeLabel}
            items={fraværPerioder.filter((fraværPeriode) => fraværPeriode.id !== undefined)}
            onDelete={onDelete}
            onEdit={onEdit}
            useTrashcan={useTrashcan || false}
        />
    );
};

export default FraværPerioderList;
