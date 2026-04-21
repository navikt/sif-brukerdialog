import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { Enkeltdato } from './types';

interface Props {
    enkeltdatoer: Enkeltdato[];
    onEdit?: (enkeltdato: Enkeltdato) => void;
    onDelete?: (enkeltdato: Enkeltdato) => void;
}

const getTitle = (dato: Date): string => {
    return dateFormatter.compact(dato);
};

const renderEnkeltdatoLabel = (enkeltdato: Enkeltdato, onEdit?: (enkeltdato: Enkeltdato) => void): ReactNode => {
    const title = getTitle(enkeltdato.dato);
    return <div>{onEdit ? <ActionLink onClick={() => onEdit(enkeltdato)}>{title}</ActionLink> : title}</div>;
};

export const EnkeltdatoList = ({ enkeltdatoer, onEdit, onDelete }: Props) => {
    return (
        <ItemListDarkside<Enkeltdato>
            getItemId={(enkeltdato): string => enkeltdato.id}
            getItemTitle={(enkeltdato): string => getTitle(enkeltdato.dato)}
            labelRenderer={(enkeltdato) => renderEnkeltdatoLabel(enkeltdato, onEdit)}
            items={enkeltdatoer}
            onDelete={onDelete}
        />
    );
};
