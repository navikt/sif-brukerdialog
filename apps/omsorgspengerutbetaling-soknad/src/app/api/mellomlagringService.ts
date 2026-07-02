import { getMellomlagringService as getMellomlagringService, MellomlagringYtelse, Søker } from '@navikt/sif-common-api';
import { jsonSort } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import hash from 'object-hash';

import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { SøknadContextState } from '../types/SøknadContextState';
import { isValidSøknadRoute } from '../utils/søknadRoutesUtils';

export type MellomlagringData = Omit<SøknadContextState, 'søker'> & {
    søknadHashString: string;
};

interface SøknadStateHashInfo {
    søker: Søker;
}

const isHashValid = (søknadState: MellomlagringData, info: SøknadStateHashInfo): boolean => {
    if (søknadState.søknadHashString === createHashString(info)) {
        return true;
    }

    const legacyDateString = dayjs.utc(info.søker.fødselsdato, 'YYYY-MM-DD').toDate();
    // Migrasjonsshim: gammel mellomlagring brukte Date-objekt for fødselsdato
    const legacyHash = hash(JSON.stringify(jsonSort({ søker: { ...info.søker, fødselsdato: legacyDateString } })));
    return søknadState.søknadHashString === legacyHash;
};

const createHashString = (info: SøknadStateHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

const isMellomlagringValid = (søknadState: MellomlagringData, info: SøknadStateHashInfo): boolean => {
    return (
        søknadState.versjon === MELLOMLAGRING_VERSJON &&
        søknadState.søknadsdata?.velkommen?.harForståttRettigheterOgPlikter === true &&
        isHashValid(søknadState, info) &&
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
            versjon: MELLOMLAGRING_VERSJON,
        });
    },
    isMellomlagringValid,
};
