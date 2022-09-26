import { isObject, isString } from 'formik';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { isStringOrNull, isStringOrUndefined } from '../../utils/typeGuardUtilities';
import api, { ApiEndpointPsb } from '../api';

type RegistrertBarnResponse = {
    barn: RegistrertBarn[];
};

export const isValidBarn = (response: any): response is RegistrertBarn => {
    if (
        isObject(response) &&
        isString(response.aktørId) &&
        isString(response.fødselsdato) &&
        isString(response.fødselsnummer) &&
        isStringOrNull(response.fornavn) &&
        isStringOrNull(response.etternavn) &&
        isStringOrUndefined(response.mellomnavn)
    ) {
        return true;
    } else {
        return false;
    }
};

export const isValidBarnResponse = (data: RegistrertBarnResponse): boolean => {
    if (Array.isArray(data?.barn) === false || data.barn.some((barn) => isValidBarn(barn) === false)) {
        return false;
    }
    return true;
};

const registrerteBarnEndpoint = {
    fetch: async (): Promise<RegistrertBarn[]> => {
        const response = await api.psb.get<RegistrertBarnResponse>(ApiEndpointPsb.barn);
        if (response && response.data) {
            const { data } = response;
            if (isValidBarnResponse(data) === false) {
                return Promise.reject('Invalid barn response');
            }
            return Promise.resolve(data.barn);
        }
        return Promise.reject();
    },
};
export default registrerteBarnEndpoint;
