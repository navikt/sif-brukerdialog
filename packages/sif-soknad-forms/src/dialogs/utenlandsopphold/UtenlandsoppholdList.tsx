import { ActionLink, ItemListDarkside, useUiIntl } from '@navikt/sif-common-ui';
import { dateRangeFormatter, getCountryName } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

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
    const periode = dateRangeFormatter.compact({ from: opphold.fom, to: opphold.tom });
    const title = `${periode}: ${landNavn}`;

    return (
        <div>{onEdit ? <ActionLink onClick={() => onEdit(opphold)}>{title}</ActionLink> : <span>{title}</span>}</div>
    );
};

export const UtenlandsoppholdList = ({ utenlandsopphold, onEdit, onDelete }: Props) => {
    const { locale } = useUiIntl();
    return (
        <ItemListDarkside<Utenlandsopphold>
            getItemId={(opphold): string => opphold.id}
            getItemTitle={(opphold): string => getCountryName(opphold.landkode, locale)}
            labelRenderer={(opphold) => renderOppholdLabel(opphold, locale, onEdit)}
            items={utenlandsopphold}
            onDelete={onDelete}
        />
    );
};
