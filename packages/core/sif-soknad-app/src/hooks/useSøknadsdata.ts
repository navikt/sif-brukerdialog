import { useSøknadAppContext } from '../context/SøknadAppContext';

/**
 * Returnerer all committet søknadsdata fra storen, castet til appens domene-type.
 *
 * @example
 * ```tsx
 * const søknadsdata = useSøknadsdata<Søknadsdata>();
 * ```
 */
export function useSøknadsdata<T>(): T {
    const { store } = useSøknadAppContext();
    return store((s) => s.søknadsdata) as T;
}
