import { HGrid } from '@navikt/ds-react';
import { getCountryName } from '@navikt/sif-common-formik-ds';
import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { dateRangeFormatter } from '@navikt/sif-common-utils';
import { Locale } from '@sif/soknad/utils';
import { ReactNode } from 'react';

import { useAppIntl } from '../../app/i18n';
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
    const { locale } = useAppIntl();
    return (
        <ItemListDarkside<BostedUtland>
            getItemId={(bosted): string => bosted.id}
            getItemTitle={(bosted): string => bosted.landnavn}
            labelRenderer={(bosted) => renderBostedUtlandLabel(bosted, locale, onEdit)}
            items={bosteder}
            onDelete={onDelete}
        />
    );
};
