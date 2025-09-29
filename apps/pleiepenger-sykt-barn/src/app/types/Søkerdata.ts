import { RegistrertBarn, Søker } from '@navikt/sif-common-api';

export interface Søkerdata {
    søker: Søker;
    barn: RegistrertBarn[];
}
