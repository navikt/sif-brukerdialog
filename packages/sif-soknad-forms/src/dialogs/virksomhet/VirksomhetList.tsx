import { BodyShort, VStack } from '@navikt/ds-react';
import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { useSifSoknadFormsIntl } from '../../i18n';
import { Næringstype, Virksomhet } from './types';

interface Props {
    virksomheter: Virksomhet[];
    onEdit?: (virksomhet: Virksomhet) => void;
    onDelete?: (virksomhet: Virksomhet) => void;
}

const getTitle = (virksomhet: Virksomhet): string => {
    return `${virksomhet.navnPåVirksomheten}`;
};

const renderVirksomhetLabel = (
    virksomhet: Virksomhet,
    næringstypeLabel: string,
    pågåendeLabel: string,
    onEdit?: (v: Virksomhet) => void,
): ReactNode => {
    const tilOgMed = virksomhet.tom ? dateFormatter.compact(virksomhet.tom) : pågåendeLabel;
    const title = getTitle(virksomhet);

    return (
        <VStack gap="space-2">
            <BodyShort>
                {onEdit ? <ActionLink onClick={() => onEdit(virksomhet)}>{title}</ActionLink> : <span>{title}</span>}
            </BodyShort>
            <BodyShort textColor="subtle">
                {dateFormatter.compact(virksomhet.fom)} - {tilOgMed}. {næringstypeLabel}
            </BodyShort>
        </VStack>
    );
};

export const VirksomhetList = ({ virksomheter, onEdit, onDelete }: Props) => {
    const sifIntl = useSifSoknadFormsIntl();

    const getNæringstypeLabel = (næringstype: Næringstype): string =>
        sifIntl.text(`@sifSoknadForms.virksomhet.form.næringstype.${næringstype}`);

    return (
        <ItemListDarkside<Virksomhet>
            getItemId={(v): string => v.id}
            getItemTitle={getTitle}
            labelRenderer={(v) =>
                renderVirksomhetLabel(
                    v,
                    getNæringstypeLabel(v.næringstype),
                    sifIntl.text('@sifSoknadForms.virksomhet.summary.pågående'),
                    onEdit,
                )
            }
            items={virksomheter}
            onDelete={onDelete}
        />
    );
};
