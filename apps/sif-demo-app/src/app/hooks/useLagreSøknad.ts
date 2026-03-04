import { SøknadStepId } from '../config/søknadStepConfig';
import { useMellomlagring } from './useMellomlagring';
import { useSøknadStore } from './useSøknadStore';

interface LagreOptions {
    skjemadata?: Partial<Record<SøknadStepId, object>>;
}

export const useLagreSøknad = () => {
    const mellomlagring = useMellomlagring();

    const lagre = async (opts?: LagreOptions) => {
        const state = useSøknadStore.getState();
        const søknadsdata = state.søknadState?.søknadsdata;
        const currentStepId = state.currentStepId;

        if (søknadsdata && currentStepId) {
            await mellomlagring.lagre({
                søknadsdata,
                currentStepId,
                skjemadata: opts?.skjemadata,
            });
        }
    };

    return {
        lagre,
        slett: mellomlagring.slett,
        isPending: mellomlagring.isLagring,
    };
};
