import { Søker } from '@navikt/sif-common-api';

export type Veileder = Pick<Søker, 'fornavn' | 'etternavn'>;
