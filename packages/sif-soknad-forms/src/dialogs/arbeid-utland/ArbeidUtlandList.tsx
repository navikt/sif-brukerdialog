import { BodyShort, VStack } from '@navikt/ds-react';
import { ActionLink, ItemListDarkside, useUiIntl } from '@navikt/sif-common-ui';
import { dateRangeFormatter, getCountryName, Locale } from '@sif/utils';

import { ReactNode } from 'react';

import { ArbeidUtland } from '.';

interface Props {
    arbeidssteder: ArbeidUtland[];
    onEdit?: (arbeidssted: ArbeidUtland) => void;
    onDelete?: (arbeidssted: ArbeidUtland) => void;
}

const getTitle = (arbeidssted: ArbeidUtland, locale: Locale): string => {
    return `${dateRangeFormatter.compact(arbeidssted.periode)}: ${getCountryName(arbeidssted.landkode, locale)}`;
};

const renderArbeidUtlandLabel = (
    arbeidssted: ArbeidUtland,
    locale: Locale,
    onEdit?: (arbeidssted: ArbeidUtland) => void,
): ReactNode => {
    const title = getTitle(arbeidssted, locale);

    return (
        <VStack gap="space-2">
            <BodyShort>
                {onEdit ? <ActionLink onClick={() => onEdit(arbeidssted)}>{title}</ActionLink> : <span>{title}</span>}
            </BodyShort>
        </VStack>
    );
};
export const ArbeidUtlandList = ({ arbeidssteder, onEdit, onDelete }: Props) => {
    const { locale } = useUiIntl();
    return (
        <ItemListDarkside<ArbeidUtland>
            getItemId={(arbeidssted): string => arbeidssted.id}
            getItemTitle={(arbeidssted) => getTitle(arbeidssted, locale)}
            labelRenderer={(arbeidssted) => renderArbeidUtlandLabel(arbeidssted, locale, onEdit)}
            items={arbeidssteder}
            onDelete={onDelete}
        />
    );
};
