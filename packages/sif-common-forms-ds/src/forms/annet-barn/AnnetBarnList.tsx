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

    const renderAnnetBarnLabel = (annetBarn: AnnetBarn): React.ReactNode => {
        return (
            <div className={bem.element('label')}>
                <span className={bem.element('dato')}>{prettifyDate(annetBarn.fødselsdato)}</span>
                <span className={bem.element('navn')}>
                    {onEdit && <ActionLink onClick={() => onEdit(annetBarn)}>{annetBarn.navn}</ActionLink>}
                </span>
                <span className={bem.element('type')}>
                    {annetBarn.type && <> ({text(getAnnetBarnÅrsakIntlKey(annetBarn.type))})</>}
                </span>
                {!onEdit && <span>{annetBarn.navn}</span>}
            </div>
        );
    };

    return (
        <ItemList<AnnetBarn>
            getItemId={(annetBarn) => annetBarn.id}
            getItemTitle={(annetBarn) => annetBarn.navn}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderAnnetBarnLabel}
            items={annetBarn.filter((annetBarn) => annetBarn.id !== undefined)}
        />
    );
};

export default AnnetBarnList;
