import { getServerEnv } from '../../utils/env';

// Brukes for å sjekke både om klienten ønsker rådata og om det er tillatt i gjeldende miljø
const shouldAndCanReturnUnparsedData = (unparsed?: boolean): boolean => {
    return unparsed === true && getServerEnv().NEXT_PUBLIC_RUNTIME_ENVIRONMENT !== 'production';
};

export const serverApiUtils = {
    shouldAndCanReturnUnparsedData,
};
