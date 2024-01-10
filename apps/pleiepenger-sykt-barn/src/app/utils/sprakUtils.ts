import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import appSentryLogger from './appSentryLogger';

export const getValidSpråk = (locale?: any): Locale => {
    const loc = typeof locale === 'string' ? locale : 'nb';
    try {
        switch (loc.toLowerCase()) {
            case 'nn':
                return 'nn';
            default:
                return 'nb';
        }
    } catch {
        appSentryLogger.logInfo('Fallback on getValidSpråk', loc);
        return 'nb';
    }
};
