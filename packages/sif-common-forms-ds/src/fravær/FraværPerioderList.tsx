import React from 'react';
import ItemList from '@navikt/sif-common-core/lib/components/item-list/ItemList';
import { prettifyDateExtended } from '@navikt/sif-common-core/lib/utils/dateUtils';
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
        return (
            <FraværListItem
                title={title}
                årsak={fraværPeriode.årsak}
                onEdit={onEdit ? () => onEdit(fraværPeriode) : undefined}
            />
        );
    };

    return (
        <ItemList<FraværPeriode>
            getItemId={(fraværPeriode) => fraværPeriode.id}
            getItemTitle={(fraværPeriode) => getDateTitleString(fraværPeriode)}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderFraværPeriodeLabel}
            items={fraværPerioder.filter((fraværPeriode) => fraværPeriode.id !== undefined)}
            useTrashcan={useTrashcan || false}
        />
    );
};

export default FraværPerioderList;
