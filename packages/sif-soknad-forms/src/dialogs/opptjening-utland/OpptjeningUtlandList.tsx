import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { getCountryName, prettifyDateExtended } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { useSifSoknadFormsIntl } from '../../i18n';
import { OpptjeningAktivitet, OpptjeningUtland } from './types';

interface Props {
    opptjeninger: OpptjeningUtland[];
    onEdit?: (opptjening: OpptjeningUtland) => void;
    onDelete?: (opptjening: OpptjeningUtland) => void;
}

const renderOpptjeningLabel = (
    opptjening: OpptjeningUtland,
    locale: string,
    aktivitetLabel: string,
    jobbetI: string,
    som: string,
    hos: string,
    onEdit?: (opptjening: OpptjeningUtland) => void,
): ReactNode => {
    const landNavn = getCountryName(opptjening.landkode, locale);
    const title = `${jobbetI} ${landNavn} ${som} ${aktivitetLabel} ${hos} ${opptjening.navn} (${prettifyDateExtended(opptjening.fom)} - ${prettifyDateExtended(opptjening.tom)})`;

    return (
        <div>
            {onEdit && <ActionLink onClick={() => onEdit(opptjening)}>{title}</ActionLink>}
            {!onEdit && <span>{title}</span>}
        </div>
    );
};

export const OpptjeningUtlandList = ({ opptjeninger, onEdit, onDelete }: Props) => {
    const intl = useIntl();
    const sifIntl = useSifSoknadFormsIntl();

    const getAktivitetLabel = (aktivitet: OpptjeningAktivitet): string => {
        switch (aktivitet) {
            case OpptjeningAktivitet.ARBEIDSTAKER:
                return sifIntl.text('@sifSoknadForms.opptjeningUtland.list.aktivitet.ARBEIDSTAKER');
            case OpptjeningAktivitet.FRILANSER:
                return sifIntl.text('@sifSoknadForms.opptjeningUtland.list.aktivitet.FRILANSER');
        }
    };

    return (
        <ItemListDarkside<OpptjeningUtland>
            getItemId={(opptjening): string => opptjening.id}
            getItemTitle={(opptjening): string => getCountryName(opptjening.landkode, intl.locale)}
            labelRenderer={(opptjening) =>
                renderOpptjeningLabel(
                    opptjening,
                    intl.locale,
                    getAktivitetLabel(opptjening.opptjeningType),
                    sifIntl.text('@sifSoknadForms.opptjeningUtland.list.jobbet_i'),
                    sifIntl.text('@sifSoknadForms.opptjeningUtland.list.som'),
                    sifIntl.text('@sifSoknadForms.opptjeningUtland.list.hos'),
                    onEdit,
                )
            }
            items={opptjeninger}
            onDelete={onDelete}
        />
    );
};
