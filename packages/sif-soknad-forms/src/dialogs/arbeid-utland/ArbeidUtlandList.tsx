import { BodyShort, VStack } from '@navikt/ds-react';
import { ActionLink, ItemListDarkside, useUiIntl } from '@navikt/sif-common-ui';
import { dateRangeFormatter, getCountryName, Locale } from '@sif/utils';

import { ReactNode } from 'react';

import { ArbeidUtland, ArbeidUtlandVariant } from '.';
import { SifSoknadFormsText } from '../../i18n';

interface Props {
    arbeidssteder: ArbeidUtland[];
    variant?: 'default' | 'summary';
    arbeidUtlandVariant: ArbeidUtlandVariant;
    onEdit?: (arbeidssted: ArbeidUtland) => void;
    onDelete?: (arbeidssted: ArbeidUtland) => void;
}

const getTitle = (arbeidssted: ArbeidUtland, locale: Locale): string => {
    return `${dateRangeFormatter.compact(arbeidssted.periode)}: ${getCountryName(arbeidssted.landkode, locale)}`;
};

const renderArbeidUtlandLabel = (
    arbeidUtlandVariant: ArbeidUtlandVariant,
    arbeidssted: ArbeidUtland,
    locale: Locale,
    onEdit?: (arbeidssted: ArbeidUtland) => void,
): ReactNode => {
    const title = getTitle(arbeidssted, locale);

    const idInfo = arbeidssted.utenlandskNasjonalId ? (
        <SifSoknadFormsText
            id="@sifSoknadForms.arbeidUtlandList.utenlandskNasjonalId"
            values={{ utenlandskNasjonalId: arbeidssted.utenlandskNasjonalId }}
        />
    ) : null;

    return (
        <VStack gap="space-2">
            <BodyShort>
                {onEdit ? <ActionLink onClick={() => onEdit(arbeidssted)}>{title}</ActionLink> : <span>{title}</span>}
            </BodyShort>
            {arbeidUtlandVariant == 'generell' ? (
                <BodyShort size="small">
                    <SifSoknadFormsText
                        id="@sifSoknadForms.arbeidUtlandList.jobbetIPerioden"
                        values={{ jobbetIPerioden: arbeidssted.jobbetIPerioden, idInfo }}
                    />
                </BodyShort>
            ) : idInfo ? (
                <BodyShort size="small">{idInfo}</BodyShort>
            ) : null}
        </VStack>
    );
};
export const ArbeidUtlandList = ({ arbeidssteder, onEdit, onDelete, variant, arbeidUtlandVariant }: Props) => {
    const { locale } = useUiIntl();
    return (
        <ItemListDarkside<ArbeidUtland>
            getItemId={(arbeidssted): string => arbeidssted.id}
            getItemTitle={(arbeidssted) => getTitle(arbeidssted, locale)}
            labelRenderer={(arbeidssted) => renderArbeidUtlandLabel(arbeidUtlandVariant, arbeidssted, locale, onEdit)}
            items={arbeidssteder}
            onDelete={onDelete}
            variant={variant}
        />
    );
};
