import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { prettifyDate } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { useSifSoknadFormsIntl } from '../../i18n';
import { Næringstype, Virksomhet } from './types';

interface Props {
    virksomheter: Virksomhet[];
    onEdit?: (virksomhet: Virksomhet) => void;
    onDelete?: (virksomhet: Virksomhet) => void;
}

const renderVirksomhetLabel = (
    virksomhet: Virksomhet,
    næringstypeLabel: string,
    pågåendeLabel: string,
    onEdit?: (v: Virksomhet) => void,
): ReactNode => {
    const tilOgMed = virksomhet.tom ? prettifyDate(virksomhet.tom) : pågåendeLabel;
    const title = `${virksomhet.navnPåVirksomheten} (${næringstypeLabel}) – ${prettifyDate(virksomhet.fom)} – ${tilOgMed}`;

    return (
        <div>
            {onEdit && <ActionLink onClick={() => onEdit(virksomhet)}>{title}</ActionLink>}
            {!onEdit && <span>{title}</span>}
        </div>
    );
};

export const VirksomhetList = ({ virksomheter, onEdit, onDelete }: Props) => {
    const sifIntl = useSifSoknadFormsIntl();

    const getNæringstypeLabel = (næringstype: Næringstype): string =>
        sifIntl.text(`@sifSoknadForms.virksomhet.form.næringstype.${næringstype}`);

    return (
        <ItemListDarkside<Virksomhet>
            getItemId={(v): string => v.id}
            getItemTitle={(v): string => v.navnPåVirksomheten}
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
