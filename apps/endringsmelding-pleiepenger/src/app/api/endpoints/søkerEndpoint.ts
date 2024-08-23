import { isStringOrNull } from '@navikt/sif-common-utils';
import { Søker } from '@types';
import { isObject, isString } from 'formik';
import { appSentryLogger } from '../../utils';
import api, { ApiEndpointPsb } from '../api';

type SøkerDTO = {
    etternavn: string;
    fornavn: string;
    mellomnavn?: string;
    kjønn: string;
    fødselsnummer: string;
};

const søkerEndpoint = {
    fetch: async (): Promise<Søker> => {
        const { data } = await api.psb.get<SøkerDTO>(ApiEndpointPsb.soker, 'ytelse=endringsmelding-pleiepenger');

        if (!isValidSøkerResponse(data)) {
            appSentryLogger.logInfo('søkerEndpoint.Invalid søkerdata');
            return Promise.reject('Invalid søkerdata');
        }
        return Promise.resolve(data);
    },
    fetchId: async (): Promise<string> => {
        const { fødselsnummer } = await søkerEndpoint.fetch();
        return fødselsnummer;
    },
};

const isValidSøkerResponse = (response: any): response is Søker => {
    if (
        isObject(response) &&
        isString(response.aktørId) &&
        isString(response.fødselsdato) &&
        isString(response.fødselsnummer) &&
        isStringOrNull(response.fornavn) &&
        isStringOrNull(response.mellomnavn) &&
        isStringOrNull(response.etternavn)
    ) {
        return true;
    } else {
        return false;
    }
};

export default søkerEndpoint;
