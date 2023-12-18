import React from 'react';
import { useIntl } from 'react-intl';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { prettifyDate } from '@navikt/sif-common-utils';
import { AnnetBarn } from './types';
import './annetBarnList.scss';

interface Props {
    annetBarn: AnnetBarn[];
    onEdit?: (annetBarn: AnnetBarn) => void;
    onDelete?: (annetBarn: AnnetBarn) => void;
}

const bem = bemUtils('annetBarnList');

const AnnetBarnList = ({ annetBarn = [], onDelete, onEdit }: Props) => {
    const intl = useIntl();
    const renderAnnetBarnLabel = (annetBarn: AnnetBarn): React.ReactNode => {
        return (
            <div className={bem.element('label')}>
                <span className={bem.element('dato')}>{prettifyDate(annetBarn.fødselsdato)}</span>
                <span className={bem.element('navn')}>
                    {onEdit && <ActionLink onClick={() => onEdit(annetBarn)}>{annetBarn.navn}</ActionLink>}
                </span>
                <span className={bem.element('type')}>
                    {annetBarn.type && <> ({intlHelper(intl, `annetBarn.form.årsak.${annetBarn.type}`)})</>}
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
