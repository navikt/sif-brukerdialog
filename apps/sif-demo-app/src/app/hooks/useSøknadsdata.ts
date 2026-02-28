import { useSøknadState, SøknadState } from '../../rammeverk/state/useSøknadState';
import { DemoSøknadsdata } from '../config/stegConfig';

type AppSøknadState = SøknadState<DemoSøknadsdata>;

/**
 * Typet versjon av useSøknadState for denne appen.
 * Deler SAMME store som rammeverket - bare med bedre typing.
 */
export const useSøknadsdata = useSøknadState as {
    (): AppSøknadState;
    <U>(selector: (state: AppSøknadState) => U): U;
};
