import { getMellomlagringService, MellomlagringYtelse, Søker } from '@navikt/sif-common-api';
import { jsonSort } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import hash from 'object-hash';

import { MELLOMLAGRING_VERSJON } from '../constants/MELLOMLAGRING_VERSJON';
import { SøknadContextState } from '../types/SøknadContextState';
import { isValidSøknadRoute } from '../utils/søknadRoutesUtils';

export type MellomlagringData = Omit<SøknadContextState, 'søker'> & {
    søknadHashString: string;
};

interface MellomlagringHashInfo {
    søker: Søker;
}

const createHashString = (info: MellomlagringHashInfo) => {
    return hash(JSON.stringify(jsonSort(info)));
};

const isHashValid = (søknadState: MellomlagringData, info: MellomlagringHashInfo): boolean => {
    if (søknadState.søknadHashString === createHashString(info)) {
        return true;
    }

    // Migrasjonsshim: gammel mellomlagring brukte Date-objekt for fødselsdato
    const legacyInfo = {
        ...info,
        søker: { ...info.søker, fødselsdato: dayjs.utc(info.søker.fødselsdato, 'YYYY-MM-DD').toDate() },
    };
    const legacyHash = hash(JSON.stringify(jsonSort(legacyInfo)));
    return søknadState.søknadHashString === legacyHash;
};

const isMellomlagringValid = (søknadState: MellomlagringData, info: MellomlagringHashInfo): boolean => {
    return (
        søknadState.versjon === MELLOMLAGRING_VERSJON &&
        søknadState.søknadsdata?.velkommen?.harForståttRettigheterOgPlikter === true &&
        isHashValid(søknadState, info) &&
        isValidSøknadRoute(søknadState.søknadRoute)
    );
};

const service = getMellomlagringService<MellomlagringData>(MellomlagringYtelse.PLEIEPENGER_LIVETS_SLUTTFASE);

export const mellomlagringService = {
    ...service,
    update: async ({
        søker,
        søknadsdata,
        frilansoppdrag,
        søknadRoute,
        søknadSendt,
        tempFormData,
    }: SøknadContextState) => {
        return service.update({
            søknadHashString: createHashString({ søker }),
            søknadsdata,
            tempFormData,
            frilansoppdrag,
            søknadRoute,
            søknadSendt,
            versjon: MELLOMLAGRING_VERSJON,
        });
    },
    isMellomlagringValid,
};
