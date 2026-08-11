import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';
import { appLogger } from '@sif/apm';

export const getValidSpråk = (locale?: any): Locale => {
    const loc = typeof locale === 'string' ? locale : 'nb';
    try {
        switch (loc.toLowerCase()) {
            case 'no-nn':
            case 'nn':
                return 'nn';
            default:
                return 'nb';
        }
    } catch {
        appLogger.logInfo('Fallback on getValidSpråk', loc);
        return 'nb';
    }
};
