import { getMellomlagringService, MellomlagringYtelse, RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { jsonSort } from '@navikt/sif-common-utils';
import hash from 'object-hash';
import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { SøknadContextState } from '../types/SøknadContextState';
import { isValidSøknadRoute } from '../utils/søknadRoutesUtils';

export type MellomlagringData = Omit<SøknadContextState, 'søker'> & {
    søknadHashString: string;
};

interface MellomlagringHashInfo {
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
}

const createHashString = (info: MellomlagringHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

const isMellomlagringValid = (søknadState: MellomlagringData, info: MellomlagringHashInfo): boolean => {
    return (
        søknadState.versjon === MELLOMLAGRING_VERSJON &&
        søknadState.søknadsdata?.velkommen?.harForståttRettigheterOgPlikter === true &&
        søknadState.søknadHashString === createHashString(info) &&
        isValidSøknadRoute(søknadState.søknadRoute)
    );
};

const service = getMellomlagringService<MellomlagringData>(MellomlagringYtelse.OMSORGSPENGER_UTBETALING_ARBEIDSTAKER);

export const mellomlagringService = {
    ...service,
    update: async ({
        søker,
        søknadsdata,
        søknadRoute,
        søknadSendt,
        registrerteBarn,
        tempFormValues,
    }: SøknadContextState) => {
        return service.update({
            søknadHashString: createHashString({ søker, registrerteBarn }),
            søknadsdata,
            søknadRoute,
            søknadSendt,
            tempFormValues,
            registrerteBarn,
            versjon: MELLOMLAGRING_VERSJON,
        });
    },
    isMellomlagringValid,
};
