import { BodyShort, VStack } from '@navikt/ds-react';
import { ActionLink, ItemListDarkside } from '@sif/soknad-ui/components';
import { dateRangeFormatter, getCountryName, getValidLocale, Locale } from '@sif/utils';
import { ReactNode } from 'react';

import { useSifSoknadFormsIntl } from '../../i18n';
import { BostedUtland } from './';

interface Props {
    bosteder: BostedUtland[];
    onEdit?: (bosted: BostedUtland) => void;
    onDelete?: (bosted: BostedUtland) => void;
}

const getTitle = (bosted: BostedUtland, locale: Locale): string => {
    return `${dateRangeFormatter.compact(bosted.periode)}: ${getCountryName(bosted.landkode, locale)}`;
};

const renderBostedUtlandLabel = (
    bosted: BostedUtland,
    locale: Locale,
    onEdit?: (bosted: BostedUtland) => void,
): ReactNode => {
    const title = getTitle(bosted, locale);

    return (
        <VStack gap="space-2">
            <BodyShort>
                {onEdit ? <ActionLink onClick={() => onEdit(bosted)}>{title}</ActionLink> : <span>{title}</span>}
            </BodyShort>
        </VStack>
    );
};
export const BostedUtlandList = ({ bosteder, onEdit, onDelete }: Props) => {
    const locale = getValidLocale(useSifSoknadFormsIntl().locale);
    return (
        <ItemListDarkside<BostedUtland>
            getItemId={(bosted): string => bosted.id}
            getItemTitle={(bosted) => getTitle(bosted, locale)}
            labelRenderer={(bosted) => renderBostedUtlandLabel(bosted, locale, onEdit)}
            items={bosteder}
            onDelete={onDelete}
        />
    );
};
