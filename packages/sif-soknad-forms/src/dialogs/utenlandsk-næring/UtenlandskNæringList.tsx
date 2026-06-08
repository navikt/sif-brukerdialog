import { BodyShort, VStack } from '@navikt/ds-react';
import { ActionLink, ItemListDarkside, useUiIntl } from '@navikt/sif-common-ui';
import { dateFormatter, getCountryName } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { useSifSoknadFormsIntl } from '../../i18n';
import { UtenlandskNæring } from './types';

interface Props {
    næringer: UtenlandskNæring[];
    onEdit?: (næring: UtenlandskNæring) => void;
    onDelete?: (næring: UtenlandskNæring) => void;
}

const getTitle = (næring: UtenlandskNæring): string => {
    return `${næring.navnPåVirksomheten}`;
};

const renderNæringLabel = (
    næring: UtenlandskNæring,
    locale: string,
    pågåendeLabel: string,
    onEdit?: (næring: UtenlandskNæring) => void,
): ReactNode => {
    const landNavn = getCountryName(næring.land, locale);
    const tilOgMed = næring.tilOgMed ? dateFormatter.compact(næring.tilOgMed) : pågåendeLabel;
    const title = getTitle(næring);
    return (
        <VStack gap="space-2">
            <BodyShort>
                {onEdit ? <ActionLink onClick={() => onEdit(næring)}>{title}</ActionLink> : <span>{title}</span>}
            </BodyShort>
            <BodyShort textColor="subtle">
                {landNavn}. {dateFormatter.compact(næring.fraOgMed)} - {tilOgMed}.
            </BodyShort>
        </VStack>
    );
};

export const UtenlandskNæringList = ({ næringer, onEdit, onDelete }: Props) => {
    const { locale } = useUiIntl();
    const sifIntl = useSifSoknadFormsIntl();
    const pågåendeLabel = sifIntl.text('@sifSoknadForms.utenlandskNæring.list.pågående');

    return (
        <ItemListDarkside<UtenlandskNæring>
            getItemId={(næring): string => næring.id}
            getItemTitle={(næring): string => getCountryName(næring.land, locale)}
            labelRenderer={(næring) => renderNæringLabel(næring, locale, pågåendeLabel, onEdit)}
            items={næringer}
            onDelete={onDelete}
        />
    );
};
