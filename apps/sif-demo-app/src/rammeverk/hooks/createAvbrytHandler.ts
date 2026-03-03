import { useCallback } from 'react';

interface CreateAvbrytHandlerConfig {
    useResetSøknad: () => () => void;
    useSlettMellomlagring: () => () => Promise<void>;
}

/**
 * Creates an avbryt handler hook that resets søknadsdata and deletes mellomlagring.
 *
 * @example
 * ```typescript
 * export const useAvbrytSøknadHandler = createAvbrytHandler({
 *     useResetSøknad: () => useSøknadStore((s) => s.resetSøknad),
 *     useSlettMellomlagring: () => useMellomlagring().slettMellomlagring,
 * });
 * ```
 */
export const createAvbrytHandler = (config: CreateAvbrytHandlerConfig) => {
    const { useResetSøknad, useSlettMellomlagring } = config;

    return () => {
        const resetSøknad = useResetSøknad();
        const slettMellomlagring = useSlettMellomlagring();

        const avbrytHandler = useCallback(() => {
            resetSøknad();
            slettMellomlagring().catch(() => {});
        }, [resetSøknad, slettMellomlagring]);

        return { avbrytHandler };
    };
};
