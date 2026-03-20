import { Bosted } from '@navikt/k9-brukerdialog-prosessering-api';
import { DateRange } from '@navikt/sif-common-utils';

export type BostedUtland = Pick<Bosted, 'landkode' | 'landnavn'> & {
    id: string;
    periode: DateRange;
};
