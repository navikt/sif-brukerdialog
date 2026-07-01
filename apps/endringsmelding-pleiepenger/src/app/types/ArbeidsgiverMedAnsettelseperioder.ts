import { MaybeDateRange } from '@navikt/sif-common-utils';

export interface ArbeidsgiverMedAnsettelseperioder {
    key: string /** orgnummer prefixet med a_ */;
    organisasjonsnummer: string;
    navn: string;
    ansettelsesperioder: MaybeDateRange[];
}
