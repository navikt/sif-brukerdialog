import { BodyShort, VStack } from '@navikt/ds-react';
import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { SifSoknadFormsText } from '../../i18n';
import { FraværDag, FraværPeriode } from './types';

interface FraværPeriodeListProps {
    fraværPerioder: FraværPeriode[];
    onEdit?: (fraværPeriode: FraværPeriode) => void;
    onDelete?: (fraværPeriode: FraværPeriode) => void;
}

interface FraværDagListProps {
    fraværDager: FraværDag[];
    onEdit?: (fraværDag: FraværDag) => void;
    onDelete?: (fraværDag: FraværDag) => void;
}

const getPeriodeTitle = (fraværPeriode: FraværPeriode): string => {
    return `${dateFormatter.compact(fraværPeriode.fraOgMed)} - ${dateFormatter.compact(fraværPeriode.tilOgMed)}`;
};

const getDagTitle = (fraværDag: FraværDag): string => {
    return `${dateFormatter.compact(fraværDag.dato)}`;
};

const renderFraværPeriodeLabel = (
    fraværPeriode: FraværPeriode,
    onEdit?: (fraværPeriode: FraværPeriode) => void,
): ReactNode => {
    const title = getPeriodeTitle(fraværPeriode);
    return (
        <div>
            {onEdit ? <ActionLink onClick={() => onEdit(fraværPeriode)}>{title}</ActionLink> : <span>{title}</span>}
        </div>
    );
};

const renderFraværDagLabel = (fraværDag: FraværDag, onEdit?: (fraværDag: FraværDag) => void): ReactNode => {
    const title = getDagTitle(fraværDag);
    return (
        <VStack gap="space-2">
            <BodyShort>
                {onEdit ? <ActionLink onClick={() => onEdit(fraværDag)}>{title}</ActionLink> : <span>{title}</span>}
            </BodyShort>
            <BodyShort textColor="subtle">
                <SifSoknadFormsText id="@sifSoknadForms.fraværDag.list.fravær" values={fraværDag} />
            </BodyShort>
        </VStack>
    );
};

export const FraværPerioderList = ({ fraværPerioder, onEdit, onDelete }: FraværPeriodeListProps) => {
    return (
        <ItemListDarkside<FraværPeriode>
            getItemId={(fraværPeriode): string => fraværPeriode.id}
            getItemTitle={getPeriodeTitle}
            labelRenderer={(fraværPeriode) => renderFraværPeriodeLabel(fraværPeriode, onEdit)}
            items={fraværPerioder}
            onDelete={onDelete}
        />
    );
};

export const FraværDagerList = ({ fraværDager, onEdit, onDelete }: FraværDagListProps) => {
    return (
        <ItemListDarkside<FraværDag>
            getItemId={(fraværDag): string => fraværDag.id}
            getItemTitle={getDagTitle}
            labelRenderer={(fraværDag) => renderFraværDagLabel(fraværDag, onEdit)}
            items={fraværDager}
            onDelete={onDelete}
        />
    );
};
