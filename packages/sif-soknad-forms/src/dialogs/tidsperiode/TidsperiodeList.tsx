import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { DateTidsperiode } from './types';

interface Props {
    tidsperioder: DateTidsperiode[];
    onEdit?: (tidsperiode: DateTidsperiode) => void;
    onDelete?: (tidsperiode: DateTidsperiode) => void;
}

const renderTidsperiodeLabel = (tidsperiode: DateTidsperiode, onEdit?: (t: DateTidsperiode) => void): ReactNode => {
    const title = `${prettifyDateExtended(tidsperiode.fom)} - ${prettifyDateExtended(tidsperiode.tom)}`;
    return (
        <div>
            {onEdit && <ActionLink onClick={() => onEdit(tidsperiode)}>{title}</ActionLink>}
            {!onEdit && <span>{title}</span>}
        </div>
    );
};

export const TidsperiodeList = ({ tidsperioder, onEdit, onDelete }: Props) => {
    return (
        <ItemListDarkside<DateTidsperiode>
            getItemId={(tidsperiode): string => tidsperiode.id}
            getItemTitle={(tidsperiode): string =>
                `${prettifyDateExtended(tidsperiode.fom)} - ${prettifyDateExtended(tidsperiode.tom)}`
            }
            labelRenderer={(tidsperiode) => renderTidsperiodeLabel(tidsperiode, onEdit)}
            items={tidsperioder}
            onDelete={onDelete}
        />
    );
};
