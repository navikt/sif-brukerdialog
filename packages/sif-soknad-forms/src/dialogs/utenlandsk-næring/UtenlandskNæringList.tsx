import { ActionLink, ItemListDarkside, useUiIntl } from '@navikt/sif-common-ui';
import { getCountryName, prettifyDateExtended } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { useSifSoknadFormsIntl } from '../../i18n';
import { UtenlandskNæring } from './types';

interface Props {
    næringer: UtenlandskNæring[];
    onEdit?: (næring: UtenlandskNæring) => void;
    onDelete?: (næring: UtenlandskNæring) => void;
}

const renderNæringLabel = (
    næring: UtenlandskNæring,
    locale: string,
    pågåendeLabel: string,
    onEdit?: (næring: UtenlandskNæring) => void,
): ReactNode => {
    const landNavn = getCountryName(næring.land, locale);
    const tilOgMed = næring.tilOgMed ? prettifyDateExtended(næring.tilOgMed) : pågåendeLabel;
    const title = `${næring.navnPåVirksomheten} i ${landNavn} (${prettifyDateExtended(næring.fraOgMed)} - ${tilOgMed})`;

    return (
        <div>
            {onEdit && <ActionLink onClick={() => onEdit(næring)}>{title}</ActionLink>}
            {!onEdit && <span>{title}</span>}
        </div>
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
