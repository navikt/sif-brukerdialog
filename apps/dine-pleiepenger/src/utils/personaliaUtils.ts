import { IntlTextFn } from '../i18n';
import { Pleietrengende } from '../server/api-models/PleietrengendeSchema';

export const personaliaUtils = {
    navn: (pleietrengende: Pleietrengende, text: IntlTextFn): string => {
        if (pleietrengende.anonymisert === false) {
            const { fornavn, etternavn, mellomnavn } = pleietrengende;
            return `${fornavn} ${mellomnavn ? mellomnavn : ''} ${etternavn}`;
        }
        return text('barn.navn.anonymisert');
    },
};
