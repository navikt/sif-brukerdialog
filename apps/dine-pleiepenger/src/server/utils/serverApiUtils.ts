import { getServerEnv } from '../../utils/env';

const shouldReturnRawData = (raw?: boolean): boolean => {
    return raw === true && getServerEnv().NEXT_PUBLIC_RUNTIME_ENVIRONMENT !== 'production';
};

export const serverApiUtils = {
    shouldReturnRawData,
};
