import { useIntl } from 'react-intl';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { AndreBarn } from './types';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import './barnList.scss';

interface Props {
    barna: AndreBarn[];
    onEdit?: (opphold: AndreBarn) => void;
    onDelete?: (opphold: AndreBarn) => void;
}

const bem = bemUtils('barnList');

const BarnList = ({ barna = [], onDelete, onEdit }: Props) => {
    const intl = useIntl();
    const renderBarnLabel = (barn: AndreBarn) => {
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
