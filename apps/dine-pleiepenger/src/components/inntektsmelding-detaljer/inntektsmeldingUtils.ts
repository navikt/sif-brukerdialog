import { dateFormatter } from '@navikt/sif-common-utils';

export const renderPeriodeString = (periode?: { fom: Date; tom?: Date }) => {
    if (!periode) {
        return 'I perioden';
    }
    if (!periode.tom) {
        return `Fra ${dateFormatter.compact(periode.fom)}`;
    }
    return `I perioden ${dateFormatter.compact(periode.fom)} - ${dateFormatter.compact(periode.tom)}`;
};
