import React from 'react';
import { useIntl } from 'react-intl';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { getCountryName } from '@navikt/sif-common-formik-ds';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Utenlandsopphold } from './types';
import './utenlandsoppholdList.scss';

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
                    {dateFormatter.dateShortMonthYear(opphold.fom)} - {dateFormatter.dateShortMonthYear(opphold.tom)}
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
