import { ActionLink, ItemListDarkside } from '@navikt/sif-common-ui';
import { prettifyDateExtended } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

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

const renderFraværPeriodeLabel = (
    fraværPeriode: FraværPeriode,
    onEdit?: (fraværPeriode: FraværPeriode) => void,
): ReactNode => {
    const title = `${prettifyDateExtended(fraværPeriode.fraOgMed)} - ${prettifyDateExtended(fraværPeriode.tilOgMed)}`;
    return (
        <div>
            {onEdit && <ActionLink onClick={() => onEdit(fraværPeriode)}>{title}</ActionLink>}
            {!onEdit && <span>{title}</span>}
        </div>
    );
};

const renderFraværDagLabel = (fraværDag: FraværDag, onEdit?: (fraværDag: FraværDag) => void): ReactNode => {
    const title = `${prettifyDateExtended(fraværDag.dato)}: ${fraværDag.timerArbeidsdag}t arbeid, ${fraværDag.timerFravær}t fravær`;
    return (
        <div>
            {onEdit && <ActionLink onClick={() => onEdit(fraværDag)}>{title}</ActionLink>}
            {!onEdit && <span>{title}</span>}
        </div>
    );
};

export const FraværPerioderList = ({ fraværPerioder, onEdit, onDelete }: FraværPeriodeListProps) => {
    return (
        <ItemListDarkside<FraværPeriode>
            getItemId={(fraværPeriode): string => fraværPeriode.id}
            getItemTitle={(fraværPeriode): string =>
                `${prettifyDateExtended(fraværPeriode.fraOgMed)} - ${prettifyDateExtended(fraværPeriode.tilOgMed)}`
            }
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
            getItemTitle={(fraværDag): string =>
                `${prettifyDateExtended(fraværDag.dato)}: ${fraværDag.timerArbeidsdag}t arbeid, ${fraværDag.timerFravær}t fravær`
            }
            labelRenderer={(fraværDag) => renderFraværDagLabel(fraværDag, onEdit)}
            items={fraværDager}
            onDelete={onDelete}
        />
    );
};
