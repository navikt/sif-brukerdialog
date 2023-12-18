import React from 'react';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { Fosterbarn } from './types';

interface Props {
    fosterbarn: Fosterbarn[];
    onEdit?: (opphold: Fosterbarn) => void;
    onDelete?: (opphold: Fosterbarn) => void;
}

const FosterbarnList = ({ fosterbarn = [], onDelete, onEdit }: Props) => {
    const getBarnTitleString = (barn: Fosterbarn) => {
        return (
            <>
                <span style={{ paddingRight: '1rem' }}>{barn.fødselsnummer}</span>{' '}
                {barn.fornavn && barn.etternavn && <span>{formatName(barn.fornavn, barn.etternavn)}</span>}
            </>
        );
    };
    const renderFosterbarnLabel = (barn: Fosterbarn): React.ReactNode => {
        return (
            <>
                {onEdit && <ActionLink onClick={() => onEdit(barn)}>{getBarnTitleString(barn)}</ActionLink>}
                {!onEdit && <span>{getBarnTitleString(barn)}</span>}
            </>
        );
    };

    return (
        <ItemList<Fosterbarn>
            getItemId={(barn) => barn.id}
            getItemTitle={(barn) =>
                barn.fornavn && barn.etternavn ? formatName(barn.fornavn, barn.etternavn) : barn.fødselsnummer
            }
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderFosterbarnLabel}
            items={fosterbarn.filter((barn) => barn.id !== undefined)}
        />
    );
};

export default FosterbarnList;
