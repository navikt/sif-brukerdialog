import { BodyShort, VStack } from '@navikt/ds-react';
import { ActionLink, ItemListDarkside, useUiIntl } from '@navikt/sif-common-ui';
import { dateFormatter, getCountryName } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { SifSoknadFormsText, useSifSoknadFormsIntl } from '../../i18n';
import { OpptjeningAktivitet, OpptjeningUtland } from './types';

interface Props {
    opptjeninger: OpptjeningUtland[];
    onEdit?: (opptjening: OpptjeningUtland) => void;
    onDelete?: (opptjening: OpptjeningUtland) => void;
}

const getTitle = (opptjening: OpptjeningUtland, locale: string): string => {
    const landNavn = getCountryName(opptjening.landkode, locale);
    return `${dateFormatter.compact(opptjening.fom)} - ${dateFormatter.compact(opptjening.tom, locale)}: ${landNavn}`;
};

const renderOpptjeningLabel = (
    opptjening: OpptjeningUtland,
    locale: string,
    aktivitetLabel: string,
    onEdit?: (opptjening: OpptjeningUtland) => void,
): ReactNode => {
    const title = getTitle(opptjening, locale);
    return (
        <VStack gap="space-2">
            <BodyShort>
                {onEdit ? <ActionLink onClick={() => onEdit(opptjening)}>{title}</ActionLink> : <span>{title}</span>}
            </BodyShort>
            <BodyShort textColor="subtle">
                <SifSoknadFormsText
                    id="@sifSoknadForms.opptjeningUtland.list.detaljer"
                    values={{ som: aktivitetLabel, hos: opptjening.navn }}
                />
            </BodyShort>
        </VStack>
    );
};

export const OpptjeningUtlandList = ({ opptjeninger, onEdit, onDelete }: Props) => {
    const { locale } = useUiIntl();
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
            getItemTitle={(opptjening): string => getTitle(opptjening, locale)}
            labelRenderer={(opptjening) =>
                renderOpptjeningLabel(opptjening, locale, getAktivitetLabel(opptjening.opptjeningType), onEdit)
            }
            items={opptjeninger}
            onDelete={onDelete}
        />
    );
};
