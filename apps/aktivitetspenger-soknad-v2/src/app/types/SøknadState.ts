import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import { KontonummerDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

import { Søknadsdata } from './Søknadsdata';

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    kontonummer: KontonummerDto | null;
    søknadsdata: Søknadsdata;
}
