import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { getCountryName, prettifyDateExtended } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { OpptjeningAktivitet, OpptjeningUtland } from './types';

interface Props {
    opptjeninger: OpptjeningUtland[];
    onEdit?: (opptjening: OpptjeningUtland) => void;
    onDelete?: (opptjening: OpptjeningUtland) => void;
}

const getAktivitetLabel = (aktivitet: OpptjeningAktivitet): string => {
    switch (aktivitet) {
        case OpptjeningAktivitet.ARBEIDSTAKER:
            return 'arbeidstaker';
        case OpptjeningAktivitet.FRILANSER:
            return 'frilanser';
    }
};

const renderOpptjeningLabel = (
    opptjening: OpptjeningUtland,
    locale: string,
    onEdit?: (opptjening: OpptjeningUtland) => void,
): ReactNode => {
    const landNavn = getCountryName(opptjening.landkode, locale);
    const arbeidsgiverType = getAktivitetLabel(opptjening.opptjeningType);
    const title = `Jobbet i ${landNavn} som ${arbeidsgiverType} hos ${opptjening.navn} (${prettifyDateExtended(opptjening.fom)} - ${prettifyDateExtended(opptjening.tom)})`;

    return (
        <div>
            {onEdit && <ActionLink onClick={() => onEdit(opptjening)}>{title}</ActionLink>}
            {!onEdit && <span>{title}</span>}
        </div>
    );
};

export const OpptjeningUtlandList = ({ opptjeninger, onEdit, onDelete }: Props) => {
    const intl = useIntl();
    return (
        <ItemListDarkside<OpptjeningUtland>
            getItemId={(opptjening): string => opptjening.id}
            getItemTitle={(opptjening): string => getCountryName(opptjening.landkode, intl.locale)}
            labelRenderer={(opptjening) => renderOpptjeningLabel(opptjening, intl.locale, onEdit)}
            items={opptjeninger}
            onDelete={onDelete}
        />
    );
};
