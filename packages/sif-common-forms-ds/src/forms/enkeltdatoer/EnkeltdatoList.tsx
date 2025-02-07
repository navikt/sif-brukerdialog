import React from 'react';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { Enkeltdato } from './types';

interface Props {
    enkeltdatoer: Enkeltdato[];
    labelRenderer?: (dato: Enkeltdato) => React.ReactNode;
    onEdit?: (dato: Enkeltdato) => void;
    onDelete?: (Enkeltdato: Enkeltdato) => void;
}

const EnkeltdatoList = ({ enkeltdatoer = [], labelRenderer, onDelete, onEdit }: Props) => {
    const getDateTitleString = (enkeltdato: Enkeltdato) => `${prettifyDateExtended(enkeltdato.dato)}`;

    const renderEnkeltdatoLabel = (enkeltdato: Enkeltdato): React.ReactNode => {
        const title = labelRenderer ? labelRenderer(enkeltdato) : getDateTitleString(enkeltdato);
        return (
            <>
                {onEdit && <ActionLink onClick={() => onEdit(enkeltdato)}>{title}</ActionLink>}
                {!onEdit && <span>{title}</span>}
            </>
        );
    };

    return (
        <ItemList<Enkeltdato>
            getItemId={(uttak) => uttak.id}
            getItemTitle={(uttak) => getDateTitleString(uttak)}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderEnkeltdatoLabel}
            items={enkeltdatoer.filter((enkeltdato) => enkeltdato.id !== undefined)}
        />
    );
};

export default EnkeltdatoList;
