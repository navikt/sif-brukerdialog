// import { isObject, isString } from 'formik';
// import { isStringOrNull } from '../utils/typeGuardUtilities';

// export interface Søker {
//     aktørId: string;
//     fødselsdato: Date;
//     fødselsnummer: string;
//     fornavn: string;
//     mellomnavn?: string;
//     etternavn: string;
// }

// export const isValidSøkerResponse = (response: any): response is Søker => {
//     if (
//         isObject(response) &&
//         isString(response.aktørId) &&
//         isString(response.fødselsdato) &&
//         isString(response.fødselsnummer) &&
//         isStringOrNull(response.fornavn) &&
//         isStringOrNull(response.mellomnavn) &&
//         isStringOrNull(response.etternavn)
//     ) {
//         return true;
//     } else {
//         return false;
//     }
// };
