import { Pleietrengende } from '../server/api-models/PleietrengendeSchema';

export const personaliaUtils = {
    navn: ({ fornavn, mellomnavn, etternavn }: Pleietrengende): string => {
        return `${fornavn} ${mellomnavn ? mellomnavn : ''} ${etternavn}`;
    },
};
