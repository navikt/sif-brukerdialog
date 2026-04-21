import { VStack } from '@navikt/ds-react';
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
        <VStack gap="space-4">
            {onEdit ? <ActionLink onClick={() => onEdit(barn)}>{barn.navn}</ActionLink> : barn.navn}
            <span>Fnr./d-nr. {barn.fødselsnummer}</span>
        </VStack>
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
