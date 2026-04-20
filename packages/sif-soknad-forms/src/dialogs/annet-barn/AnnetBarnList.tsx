import { HStack } from '@navikt/ds-react';
import { ActionLink, ItemListDarkside, useUiIntl } from '@navikt/sif-common-ui';
import { prettifyDate } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { useSifSoknadFormsIntl } from '../../i18n';
import { AnnetBarn, BarnType } from './index';

interface Props {
    annetBarn: AnnetBarn[];
    onEdit?: (annetBarn: AnnetBarn) => void;
    onDelete?: (annetBarn: AnnetBarn) => void;
}

const getAnnetBarnTypeIntlKey = (type: BarnType) => {
    switch (type) {
        case BarnType.fosterbarn:
            return '@sifSoknadForms.annetBarn.form.årsak.FOSTERBARN' as const;
        case BarnType.annet:
            return '@sifSoknadForms.annetBarn.form.årsak.ANNET' as const;
    }
};

const renderAnnetBarnLabel = (
    barn: AnnetBarn,
    locale: string,
    text: ReturnType<typeof useSifSoknadFormsIntl>['text'],
    onEdit?: (annetBarn: AnnetBarn) => void,
): ReactNode => {
    return (
        <HStack gap="space-4" wrap={false} align="center">
            <span>{prettifyDate(barn.fødselsdato, locale)}</span>
            {onEdit ? <ActionLink onClick={() => onEdit(barn)}>{barn.navn}</ActionLink> : <span>{barn.navn}</span>}
            {barn.type ? <span>({text(getAnnetBarnTypeIntlKey(barn.type))})</span> : null}
        </HStack>
    );
};

export const AnnetBarnList = ({ annetBarn, onEdit, onDelete }: Props) => {
    const { locale } = useUiIntl();
    const { text } = useSifSoknadFormsIntl();

    return (
        <ItemListDarkside<AnnetBarn>
            getItemId={(barn) => barn.id || barn.fnr}
            getItemTitle={(barn) => barn.navn}
            labelRenderer={(barn) => renderAnnetBarnLabel(barn, locale, text, onEdit)}
            items={annetBarn}
            onDelete={onDelete}
        />
    );
};
