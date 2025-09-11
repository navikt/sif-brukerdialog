import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { useAppIntl } from '../../../i18n';
import { AndreBarn } from './types';
import './barnList.scss';

interface Props {
    barna: AndreBarn[];
    onEdit?: (opphold: AndreBarn) => void;
    onDelete?: (opphold: AndreBarn) => void;
}

const bem = bemUtils('barnList');

const BarnList = ({ barna = [], onDelete, onEdit }: Props) => {
    const { text } = useAppIntl();
    const renderBarnLabel = (barn: AndreBarn) => {
        const fnr = barn.fnr;

        return (
            <div className={bem.element('label')}>
                <span className={bem.element('navn')}>
                    {onEdit && <ActionLink onClick={() => onEdit(barn)}>{barn.navn}</ActionLink>}
                    {!onEdit && <span>{barn.navn}</span>}
                </span>
                <span className={bem.element('fnr')}>{text('barn.list.fnr', { fnr })}</span>
            </div>
        );
    };

    return (
        <ItemListDarkside<AndreBarn>
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
