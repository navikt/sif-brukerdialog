import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { ReactNode } from 'react';

import { Fosterbarn } from './types';

interface Props {
    fosterbarn: Fosterbarn[];
    onEdit?: (fosterbarn: Fosterbarn) => void;
    onDelete?: (fosterbarn: Fosterbarn) => void;
}

const renderFosterbarnLabel = (barn: Fosterbarn, onEdit?: (fosterbarn: Fosterbarn) => void): ReactNode => {
    return (
        <div>
            <span>{barn.fødselsnummer}</span>{' '}
            {onEdit && <ActionLink onClick={() => onEdit(barn)}>{barn.navn}</ActionLink>}
            {!onEdit && <span>{barn.navn}</span>}
        </div>
    );
};

export const FosterbarnList = ({ fosterbarn, onEdit, onDelete }: Props) => {
    return (
        <ItemListDarkside<Fosterbarn>
            getItemId={(barn): string => barn.id}
            getItemTitle={(barn): string => barn.navn}
            labelRenderer={(barn) => renderFosterbarnLabel(barn, onEdit)}
            items={fosterbarn}
            onDelete={onDelete}
        />
    );
};
