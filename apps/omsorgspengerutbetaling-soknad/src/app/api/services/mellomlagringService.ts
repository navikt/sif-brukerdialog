import { getMellomlagringService as getMellomlagringService, MellomlagringYtelse, Søker } from '@navikt/sif-common';
import { jsonSort } from '@navikt/sif-common-utils';
import hash from 'object-hash';
import { SØKNAD_VERSJON } from '../../constants/SØKNAD_VERSJON';
import { SøknadContextState } from '../../types/SøknadContextState';
import { isValidSøknadRoute } from '../../utils/søknadRoutesUtils';

export type MellomlagringData = Omit<SøknadContextState, 'søker'> & {
    søknadHashString: string;
};

interface SøknadStateHashInfo {
    søker: Søker;
}

const createHashString = (info: SøknadStateHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

const isMellomlagringValid = (søknadState: MellomlagringData, info: SøknadStateHashInfo): boolean => {
    return (
        søknadState.versjon === SØKNAD_VERSJON &&
        søknadState.søknadsdata?.velkommen?.harForståttRettigheterOgPlikter === true &&
        søknadState.søknadHashString === createHashString(info) &&
        isValidSøknadRoute(søknadState.søknadRoute)
    );
};

const service = getMellomlagringService<MellomlagringData>(MellomlagringYtelse.OMSORGSPENGER_UTBETALING_SNF);

export const mellomlagringService = {
    ...service,
    update: async ({
        søker,
        søknadsdata,
        søknadRoute,
        søknadSendt,
        registrerteBarn,
        tempFormData,
    }: SøknadContextState) => {
        return service.update({
            søknadHashString: createHashString({ søker }),
            søknadsdata,
            søknadRoute,
            søknadSendt,
            registrerteBarn,
            tempFormData,
            versjon: SØKNAD_VERSJON,
        });
    },
    isMellomlagringValid,
};
