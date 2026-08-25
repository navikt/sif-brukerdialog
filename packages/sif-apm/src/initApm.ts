import { init, type InitOptions } from '@nais/apm';

/**
 * Initialiserer @nais/apm med sif-standard-oppsett.
 * Filtrerer bort støy fra nav-dekoratøren via beforeSend.
 *
 * Bruk denne i stedet for `init()` direkte fra `@nais/apm`.
 */
export const initApm = (options: InitOptions): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    init({
        ...options,
        beforeSend: (item: any) => {
            if (item?.type === 'exception') {
                const stacktrace = item.payload?.errors?.[0]?.stacktrace ?? '';
                if (stacktrace.includes('personbruker/nav-dekoratoren')) {
                    return null;
                }
            }
            return item;
        },
    });
};
