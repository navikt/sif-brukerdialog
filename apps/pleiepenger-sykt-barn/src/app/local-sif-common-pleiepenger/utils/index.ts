import { sortDateRange } from '@navikt/sif-common-utils';

export * from './arbeidstidPeriodeIntlValuesUtils';
export * from './hasIncreasedFontSize';

interface ItemWithFomTom {
    fom: Date;
    tom: Date;
}

export const sortItemsByFomTom = (a: ItemWithFomTom, b: ItemWithFomTom) =>
    sortDateRange({ from: a.fom }, { from: b.fom });
