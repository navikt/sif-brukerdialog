import { MaybeDateRange } from '@navikt/sif-common-utils';

export interface Arbeidsgiver {
    key: string /** orgnummer prefixet med a_ */;
    organisasjonsnummer: string;
    navn: string;
    ansettelsesperioder: MaybeDateRange[];
}
