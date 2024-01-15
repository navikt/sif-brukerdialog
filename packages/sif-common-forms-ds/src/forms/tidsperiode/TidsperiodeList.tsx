import React from 'react';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { DateTidsperiode } from './types';

interface Props {
    tidsperiode: DateTidsperiode[];
    onEdit?: (opphold: DateTidsperiode) => void;
    onDelete?: (opphold: DateTidsperiode) => void;
}

const TidsperiodeList = ({ tidsperiode = [], onDelete, onEdit }: Props) => {
    const getDateTitleString = (uttak: DateTidsperiode) =>
        `${prettifyDateExtended(uttak.fom)} - ${prettifyDateExtended(uttak.tom)}`;

    const renderTidsperiodeLabel = (uttak: DateTidsperiode): React.ReactNode => {
        const title = getDateTitleString(uttak);
        return (
            <>
                {onEdit && <ActionLink onClick={() => onEdit(uttak)}>{title}</ActionLink>}
                {!onEdit && <span>{title}</span>}
            </>
        );
    };

    return (
        <ItemList<DateTidsperiode>
            getItemId={(uttak) => uttak.id}
            getItemTitle={(uttak) => getDateTitleString(uttak)}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderTidsperiodeLabel}
            items={tidsperiode.filter((uttak) => uttak.id !== undefined)}
        />
    );
};

export default TidsperiodeList;
