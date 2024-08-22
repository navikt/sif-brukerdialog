import React from 'react';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { prettifyDate } from '@navikt/sif-common-utils';
import { AnnetBarnMessageKeys, useAnnetBarnIntl } from './';
import { AnnetBarn, BarnType } from './types';
import './annetBarnList.scss';

interface Props {
    annetBarn: AnnetBarn[];
    onEdit?: (annetBarn: AnnetBarn) => void;
    onDelete?: (annetBarn: AnnetBarn) => void;
}

const bem = bemUtils('annetBarnList');

const getAnnetBarnÅrsakIntlKey = (type: BarnType): AnnetBarnMessageKeys => {
    switch (type) {
        case BarnType.fosterbarn:
            return '@forms.annetBarn.form.årsak.FOSTERBARN';
        case BarnType.annet:
            return '@forms.annetBarn.form.årsak.ANNET';
    }
};

const AnnetBarnList = ({ annetBarn = [], onDelete, onEdit }: Props) => {
    const { text } = useAnnetBarnIntl();

    if (annetBarn.length === 0) {
        return null;
    }

    const renderAnnetBarnLabel = (barn: AnnetBarn): React.ReactNode => {
        return (
            <div className={bem.element('label')}>
                <span className={bem.element('dato')}>{prettifyDate(barn.fødselsdato)}</span>
                <span className={bem.element('navn')}>
                    {onEdit && <ActionLink onClick={() => onEdit(barn)}>{barn.navn}</ActionLink>}
                </span>
                <span className={bem.element('type')}>
                    {barn.type && <> ({text(getAnnetBarnÅrsakIntlKey(barn.type))})</>}
                </span>
                {!onEdit && <span>{barn.navn}</span>}
            </div>
        );
    };

    return (
        <ItemList<AnnetBarn>
            getItemId={(barn) => barn.id}
            getItemTitle={(barn) => barn.navn}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderAnnetBarnLabel}
            items={annetBarn.filter((barn) => barn.id !== undefined)}
        />
    );
};

export default AnnetBarnList;
