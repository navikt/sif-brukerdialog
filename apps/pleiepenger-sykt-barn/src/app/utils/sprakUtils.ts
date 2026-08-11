import { Locale } from '@navikt/sif-common-core-ds/src/types/Locale';


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
        console.info('Fallback on getValidSpråk', loc);
        return 'nb';
    }
};
