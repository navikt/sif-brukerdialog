import React from 'react';
import { useIntl } from 'react-intl';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getCountryName } from '@navikt/sif-common-formik-ds';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { OpptjeningUtland } from './types';
import './opptjeningUtlandList.scss';

interface Props {
    utenlandsopphold: OpptjeningUtland[];
    onEdit?: (opphold: OpptjeningUtland) => void;
    onDelete?: (opphold: OpptjeningUtland) => void;
}

const bem = bemUtils('opptjeningUtlandList');

const OpptjeningUtlandList = ({ utenlandsopphold, onDelete, onEdit }: Props) => {
    const intl = useIntl();
    const renderOpptjeningUtlandLabel = (opptjening: OpptjeningUtland): React.ReactNode => {
        const landNavn = getCountryName(opptjening.landkode, intl.locale);
        const arbeidsgiverType = intlHelper(
            intl,
            `opptjeningUtland.form.opptjeningAktivitet.${opptjening.opptjeningType}`,
        ).toLocaleLowerCase();
        return (
            <div className={bem.element('label')}>
                <span className={bem.element('land')}>
                    {onEdit && (
                        <ActionLink
                            onClick={() =>
                                onEdit(opptjening)
                            }>{`Jobbet i ${landNavn} som ${arbeidsgiverType} hos ${opptjening.navn}`}</ActionLink>
                    )}
                    {!onEdit && <span>{`${landNavn} ${arbeidsgiverType} ${opptjening.navn}`}</span>}
                </span>
                <span className={bem.element('dato')}>
                    {prettifyDateExtended(opptjening.fom)} - {prettifyDateExtended(opptjening.tom)}
                </span>
            </div>
        );
    };

    return (
        <ItemList<OpptjeningUtland>
            getItemId={(opptjening) => opptjening.id}
            getItemTitle={(opptjening) => getCountryName(opptjening.landkode, intl.locale)}
            onDelete={onDelete}
            onEdit={onEdit}
            labelRenderer={renderOpptjeningUtlandLabel}
            items={utenlandsopphold}
        />
    );
};

export default OpptjeningUtlandList;
