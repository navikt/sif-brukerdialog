import { handleApiError } from '@navikt/ung-common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const sendSøknad = async (_: any): Promise<any> => {
    try {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve(null);
            }, 200),
        );
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
