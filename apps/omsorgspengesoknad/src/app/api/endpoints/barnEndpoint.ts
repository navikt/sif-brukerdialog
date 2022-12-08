import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import { isObject, isString } from 'formik';
import { isArray } from 'lodash';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { isStringOrNull } from '../../utils/typeGuardUtilities';
import api, { ApiEndpoint } from '../api';

export interface BarnDTO {
    barn: {
        aktørId: string;
        fornavn: string;
        etternavn: string;
        mellomnavn?: string;
        fødselsdato: string;
    }[];
}
export const isValidRegistrertBarnResponse = (response: any): response is RegistrertBarn => {
    if (
        isObject(response) &&
        isString(response.aktørId) &&
        isString(response.fornavn) &&
        isString(response.etternavn) &&
        isStringOrNull(response.mellomnavn) &&
        isString(response.fødselsdato)
    ) {
        return true;
    } else {
        return false;
    }
};

const barnEndpoint = {
    fetch: async (): Promise<RegistrertBarn[]> => {
        const { data } = await api.get<BarnDTO>(ApiEndpoint.barn);
        const registrerteBarn: RegistrertBarn[] = [];

        if (data?.barn && isArray(data.barn)) {
            data.barn.forEach((barn) => {
                registrerteBarn.push({
                    ...barn,
                    fødselsdato: ISODateToDate(barn.fødselsdato),
                });
            });
        }

        return Promise.resolve(registrerteBarn);
    },
};

export default barnEndpoint;
