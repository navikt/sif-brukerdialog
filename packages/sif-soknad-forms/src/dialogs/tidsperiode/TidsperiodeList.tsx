import { BodyShort } from '@navikt/ds-react';
import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { dateRangeFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { DateTidsperiode } from './types';

interface Props {
    tidsperioder: DateTidsperiode[];
    onEdit?: (tidsperiode: DateTidsperiode) => void;
    onDelete?: (tidsperiode: DateTidsperiode) => void;
}

const getTitle = (tidsperiode: DateTidsperiode): string => {
    return `${dateRangeFormatter.compact({ from: tidsperiode.fom, to: tidsperiode.tom })}`;
};

const renderTidsperiodeLabel = (tidsperiode: DateTidsperiode, onEdit?: (t: DateTidsperiode) => void): ReactNode => {
    const title = getTitle(tidsperiode);
    return (
        <BodyShort>
            {onEdit ? <ActionLink onClick={() => onEdit(tidsperiode)}>{title}</ActionLink> : <span>{title}</span>}
        </BodyShort>
    );
};

export const TidsperiodeList = ({ tidsperioder, onEdit, onDelete }: Props) => {
    return (
        <ItemListDarkside<DateTidsperiode>
            getItemId={(tidsperiode): string => tidsperiode.id}
            getItemTitle={(tidsperiode): string => getTitle(tidsperiode)}
            labelRenderer={(tidsperiode) => renderTidsperiodeLabel(tidsperiode, onEdit)}
            items={tidsperioder}
            onDelete={onDelete}
        />
    );
};
