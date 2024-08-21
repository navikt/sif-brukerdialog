import { ISODateToDate } from '@navikt/sif-common-utils';
import { isObject, isString } from 'formik';
import { isArray } from 'lodash';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import api, { ApiEndpoint } from '../api';

export interface BarnDTO {
    barn: Array<{
        aktørId: string;
        fornavn: string;
        etternavn: string;
        mellomnavn?: string;
        fødselsdato: string;
    }>;
}
export const isValidRegistrertBarnResponse = (response: any): response is RegistrertBarn => {
    if (
        isObject(response) &&
        isString(response.aktørId) &&
        isString(response.fornavn) &&
        isString(response.etternavn) &&
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

        let hasInvalidBarnRespons = false;
        if (data?.barn && isArray(data.barn)) {
            data.barn.forEach((barn) => {
                if (isValidRegistrertBarnResponse(barn)) {
                    registrerteBarn.push({
                        ...barn,
                        fødselsdato: ISODateToDate(barn.fødselsdato),
                    });
                } else {
                    hasInvalidBarnRespons = true;
                }
            });
        }
        if (hasInvalidBarnRespons) {
            return Promise.reject('Invalid barn respons');
        }
        return Promise.resolve(registrerteBarn);
    },
};

export default barnEndpoint;
