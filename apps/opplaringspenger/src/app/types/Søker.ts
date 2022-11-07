import { isObject, isString } from 'formik';
import { isStringOrNull } from '../utils/typeGuardUtilities';

export interface Søker {
    etternavn: string;
    fornavn: string;
    mellomnavn?: string;
    kjønn: string;
    fødselsnummer: string;
}

export const isValidSøkerResponse = (response: any): response is Søker => {
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
