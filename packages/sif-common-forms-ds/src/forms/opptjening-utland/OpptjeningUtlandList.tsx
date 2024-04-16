import React from 'react';
import { useIntl } from 'react-intl';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import ItemList from '@navikt/sif-common-core-ds/src/components/lists/item-list/ItemList';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { getCountryName } from '@navikt/sif-common-formik-ds';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { OpptjeningUtlandMessageKeys, useOpptjeningUtlandIntl } from './opptjeningUtlandMessages';
import { OpptjeningAktivitet, OpptjeningUtland } from './types';
import './opptjeningUtlandList.scss';

interface Props {
    utenlandsopphold: OpptjeningUtland[];
    onEdit?: (opphold: OpptjeningUtland) => void;
    onDelete?: (opphold: OpptjeningUtland) => void;
}

const bem = bemUtils('opptjeningUtlandList');

const getArbeidsgiverTypeMessageKey = (aktivitet: OpptjeningAktivitet): OpptjeningUtlandMessageKeys => {
    switch (aktivitet) {
        case OpptjeningAktivitet.ARBEIDSTAKER:
            return '@forms.opptjeningUtland.form.opptjeningAktivitet.ARBEIDSTAKER';
        case OpptjeningAktivitet.FRILANSER:
            return '@forms.opptjeningUtland.form.opptjeningAktivitet.FRILANSER';
    }
};

const OpptjeningUtlandList = ({ utenlandsopphold, onDelete, onEdit }: Props) => {
    const intl = useIntl();
    const { text } = useOpptjeningUtlandIntl();
    const renderOpptjeningUtlandLabel = (opptjening: OpptjeningUtland): React.ReactNode => {
        const landNavn = getCountryName(opptjening.landkode, intl.locale);
        const arbeidsgiverType = text(getArbeidsgiverTypeMessageKey(opptjening.opptjeningType)).toLowerCase();
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
