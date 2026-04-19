import { HGrid } from '@navikt/ds-react';
import { ActionLink, ItemListDarkside, useUiIntl } from '@navikt/sif-common-ui';
import { dateRangeFormatter, getCountryName } from '@navikt/sif-common-utils';
import { Locale } from '@sif/soknad/utils';
import { ReactNode } from 'react';

import { BostedUtland } from '.';

interface Props {
    bosteder: BostedUtland[];
    onEdit?: (bosted: BostedUtland) => void;
    onDelete?: (bosted: BostedUtland) => void;
}

const renderBostedUtlandLabel = (
    bosted: BostedUtland,
    locale: Locale,
    onEdit?: (bosted: BostedUtland) => void,
): ReactNode => {
    const navn = getCountryName(bosted.landkode, locale);
    return (
        <HGrid>
            <div>
                {onEdit && <ActionLink onClick={() => onEdit(bosted)}>{navn}</ActionLink>}
                {!onEdit && <span>{navn}</span>}
            </div>
            <div>{dateRangeFormatter.getDateRangeText(bosted.periode, locale)}</div>
        </HGrid>
    );
};
export const BostedUtlandList = ({ bosteder, onEdit, onDelete }: Props) => {
    const { locale } = useUiIntl();
    return (
        <ItemListDarkside<BostedUtland>
            getItemId={(bosted): string => bosted.id}
            getItemTitle={(bosted): string => getCountryName(bosted.landkode, locale)}
            labelRenderer={(bosted) => renderBostedUtlandLabel(bosted, locale, onEdit)}
            items={bosteder}
            onDelete={onDelete}
        />
    );
};
