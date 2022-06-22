import React from 'react';
import { useIntl } from 'react-intl';
import ActionLink from '@navikt/sif-common-core/lib/components/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/lib/components/item-list/ItemList';
import bemUtils from '@navikt/sif-common-core-ds/lib/utils/bemUtils';
import { prettifyDateExtended } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { getCountryName } from '@navikt/sif-common-formik-ds';
import { Utenlandsopphold } from './types';
import './utenlandsoppholdList.less';

interface Props {
    utenlandsopphold: Utenlandsopphold[];
    onEdit?: (opphold: Utenlandsopphold) => void;
    onDelete?: (opphold: Utenlandsopphold) => void;
}

const bem = bemUtils('utenlandsoppholdList');

const UtenlandsoppholdList = ({ utenlandsopphold, onDelete, onEdit }: Props) => {
    const intl = useIntl();
    const renderUtenlandsoppholdLabel = (opphold: Utenlandsopphold): React.ReactNode => {
        const navn = getCountryName(opphold.landkode, intl.locale);
        return (
            <div className={bem.element('label')}>
                <span className={bem.element('land')}>
                    {onEdit && <ActionLink onClick={() => onEdit(opphold)}>{navn}</ActionLink>}
                    {!onEdit && <span>{navn}</span>}
                </span>
                <span className={bem.element('dato')}>
                    {prettifyDateExtended(opphold.fom)} - {prettifyDateExtended(opphold.tom)}
                </span>
            </div>
        );
    };

    return (
        <ItemList<Utenlandsopphold>
            getItemId={(opphold) => opphold.id}
            getItemTitle={(opphold) => getCountryName(opphold.landkode, intl.locale)}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderUtenlandsoppholdLabel}
            items={utenlandsopphold}
        />
    );
};

export default UtenlandsoppholdList;
