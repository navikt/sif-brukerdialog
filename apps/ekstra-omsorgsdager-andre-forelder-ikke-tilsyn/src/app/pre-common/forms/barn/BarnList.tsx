import React from 'react';
import ActionLink from '@navikt/sif-common-core/lib/components/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core/lib/components/item-list/ItemList';
import { AndreBarn } from './types';
import bemUtils from '@navikt/sif-common-core/lib/utils/bemUtils';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';

interface Props {
    barna: AndreBarn[];
    onEdit?: (opphold: AndreBarn) => void;
    onDelete?: (opphold: AndreBarn) => void;
}

const bem = bemUtils('barnList');

const BarnList = ({ barna = [], onDelete, onEdit }: Props) => {
    const intl = useIntl();
    const renderBarnLabel = (barn: AndreBarn): React.ReactNode => {
        const fnr = barn.fnr;

        return (
            <div className={bem.element('label')}>
                <span className={bem.element('navn')}>
                    {onEdit && <ActionLink onClick={() => onEdit(barn)}>{barn.navn}</ActionLink>}
                    {!onEdit && <span>{barn.navn}</span>}
                </span>
                <span className={bem.element('fnr')}>{intlHelper(intl, 'barn.list.fnr', { fnr })}</span>
            </div>
        );
    };

    return (
        <ItemList<AndreBarn>
            getItemId={(barn) => barn.id}
            getItemTitle={(barn) => barn.navn}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderBarnLabel}
            items={barna.filter((barn) => barn.id !== undefined)}
        />
    );
};

export default BarnList;
