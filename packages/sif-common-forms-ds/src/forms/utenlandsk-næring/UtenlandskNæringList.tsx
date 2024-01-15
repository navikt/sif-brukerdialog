import React from 'react';
import { useIntl } from 'react-intl';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { getCountryName } from '@navikt/sif-common-formik-ds';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { UtenlandskNæring } from './types';
import './utenlandskNæringList.scss';

interface Props {
    utenlandskNæringer: UtenlandskNæring[];
    onEdit?: (utenlandskNæring: UtenlandskNæring) => void;
    onDelete?: (utenlandskNæring: UtenlandskNæring) => void;
}

const bem = bemUtils('utenlandskNæringList');

const UtenlandskNæringList = ({ utenlandskNæringer, onDelete, onEdit }: Props) => {
    const intl = useIntl();

    const renderUtenlandskNæringLabel = (utenlandskNæring: UtenlandskNæring): React.ReactNode => {
        const landNavn = getCountryName(utenlandskNæring.land, intl.locale);

        return (
            <div className={bem.element('label')}>
                <span className={bem.element('land')}>
                    {onEdit && (
                        <ActionLink
                            onClick={() =>
                                onEdit(utenlandskNæring)
                            }>{`${utenlandskNæring.navnPåVirksomheten} i ${landNavn}`}</ActionLink>
                    )}
                    {!onEdit && <span>{`${utenlandskNæring.navnPåVirksomheten} ${landNavn}`}</span>}
                </span>
                <span className={bem.element('dato')}>
                    {prettifyDateExtended(utenlandskNæring.fraOgMed)} -{' '}
                    {utenlandskNæring.tilOgMed ? prettifyDateExtended(utenlandskNæring.tilOgMed) : 'pågående'}
                </span>
            </div>
        );
    };

    return (
        <ItemList<UtenlandskNæring>
            getItemId={(utenlandskNæring) => utenlandskNæring.id}
            getItemTitle={(utenlandskNæring) => getCountryName(utenlandskNæring.land, intl.locale)}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderUtenlandskNæringLabel}
            items={utenlandskNæringer}
        />
    );
};

export default UtenlandskNæringList;
