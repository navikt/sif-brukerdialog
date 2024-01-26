import React from 'react';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import { Fosterbarn } from './types';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import './fosterbarnList.scss';

interface Props {
    fosterbarn: Fosterbarn[];
    onEdit?: (opphold: Fosterbarn) => void;
    onDelete?: (opphold: Fosterbarn) => void;
}

const bem = bemUtils('fosterbarnList');

const FosterbarnList = ({ fosterbarn = [], onDelete, onEdit }: Props) => {
    const renderFosterbarnLabel = (barn: Fosterbarn): React.ReactNode => {
        return (
            <div className={bem.element('label')}>
                <span>{barn.fødselsnummer}</span>
                <span className={bem.element('navn')}>
                    {onEdit && <ActionLink onClick={() => onEdit(barn)}>{barn.navn}</ActionLink>}
                </span>
                {!onEdit && <span>{barn.navn}</span>}
            </div>
        );
    };

    return (
        <ItemList<Fosterbarn>
            getItemId={(barn) => barn.id}
            getItemTitle={(barn) => barn.navn}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderFosterbarnLabel}
            items={fosterbarn.filter((barn) => barn.id !== undefined)}
        />
    );
};

export default FosterbarnList;
