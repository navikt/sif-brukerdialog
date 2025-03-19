import {
    FritekstfeltValideringsfeil,
    FritekstfeltValideringsfeilResponse,
    fritekstValideringsfeilResponseSchema,
} from '@navikt/sif-common-api';

export type InvalidParameter = string | FritekstfeltValideringsfeil;

export const isInvalidParameterErrorResponse = (data: any): data is FritekstfeltValideringsfeilResponse => {
    try {
        return fritekstValideringsfeilResponseSchema.parse(data) !== undefined;
    } catch {
        return false;
    }
};
