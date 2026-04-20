import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { Enkeltdato } from './types';

interface Props {
    enkeltdatoer: Enkeltdato[];
    onEdit?: (enkeltdato: Enkeltdato) => void;
    onDelete?: (enkeltdato: Enkeltdato) => void;
}

const renderEnkeltdatoLabel = (
    enkeltdato: Enkeltdato,
    onEdit?: (enkeltdato: Enkeltdato) => void,
): ReactNode => {
    const title = prettifyDateExtended(enkeltdato.dato);
    return (
        <div>
            {onEdit && <ActionLink onClick={() => onEdit(enkeltdato)}>{title}</ActionLink>}
            {!onEdit && <span>{title}</span>}
        </div>
    );
};

export const EnkeltdatoList = ({ enkeltdatoer, onEdit, onDelete }: Props) => {
    return (
        <ItemListDarkside<Enkeltdato>
            getItemId={(enkeltdato): string => enkeltdato.id}
            getItemTitle={(enkeltdato): string => prettifyDateExtended(enkeltdato.dato)}
            labelRenderer={(enkeltdato) => renderEnkeltdatoLabel(enkeltdato, onEdit)}
            items={enkeltdatoer}
            onDelete={onDelete}
        />
    );
};
