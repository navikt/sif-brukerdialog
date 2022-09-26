import { isForbidden } from '@navikt/sif-common-core-ds/lib/utils/apiUtils';
import { RegistrertBarn } from '../types/RegistrertBarn';
import { Søker } from '../types/Søker';
import appSentryLogger from '../utils/appSentryLogger';
import { relocateToNoAccessPage } from '../utils/navigationUtils';
import registrerteBarnEndpoint from './endpoints/registrerteBarnEndpoint';
import søkerEndpoint from './endpoints/søkerEndpoint';

interface InitialData {
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
}

export const fetchInitialData = async (): Promise<InitialData> => {
    try {
        const [søker, registrerteBarn] = await Promise.all([søkerEndpoint.fetch(), registrerteBarnEndpoint.fetch()]);
        return Promise.resolve({
            søker,
            registrerteBarn,
        });
    } catch (error: any) {
        if (isForbidden(error)) {
            relocateToNoAccessPage();
            return Promise.reject();
        } else {
            appSentryLogger.logError('fetchInitialData', error.error);
            return Promise.reject(error);
        }
    }
};
