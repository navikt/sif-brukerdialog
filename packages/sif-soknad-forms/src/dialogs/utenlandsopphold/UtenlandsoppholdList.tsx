import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { getCountryName, prettifyDateExtended } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import { Utenlandsopphold } from './types';

interface Props {
    utenlandsopphold: Utenlandsopphold[];
    onEdit?: (opphold: Utenlandsopphold) => void;
    onDelete?: (opphold: Utenlandsopphold) => void;
}

const renderOppholdLabel = (
    opphold: Utenlandsopphold,
    locale: string,
    onEdit?: (opphold: Utenlandsopphold) => void,
): ReactNode => {
    const landNavn = getCountryName(opphold.landkode, locale);
    const title = `${landNavn} (${prettifyDateExtended(opphold.fom)} - ${prettifyDateExtended(opphold.tom)})`;

    return (
        <div>
            {onEdit && <ActionLink onClick={() => onEdit(opphold)}>{title}</ActionLink>}
            {!onEdit && <span>{title}</span>}
        </div>
    );
};

export const UtenlandsoppholdList = ({ utenlandsopphold, onEdit, onDelete }: Props) => {
    const intl = useIntl();
    return (
        <ItemListDarkside<Utenlandsopphold>
            getItemId={(opphold): string => opphold.id}
            getItemTitle={(opphold): string => getCountryName(opphold.landkode, intl.locale)}
            labelRenderer={(opphold) => renderOppholdLabel(opphold, intl.locale, onEdit)}
            items={utenlandsopphold}
            onDelete={onDelete}
        />
    );
};
