import { useMemo } from 'react';
import { useYtelseMellomlagring } from '@navikt/sif-common-query';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '../config/appConfig';
import { SøknadStepId } from '../config/søknadStepConfig';
import { AppMellomlagring, MellomlagringMetaData } from '../types/Mellomlagring';
import { useSøknadStore } from './useSøknadStore';

interface LagreOptions {
    skjemadata?: Partial<Record<SøknadStepId, object>>;
}

export const useSøknadMellomlagring = () => {
    const søknadState = useSøknadStore((s) => s.søknadState);

    const metadata = useMemo<MellomlagringMetaData | undefined>(() => {
        if (!søknadState) return undefined;
        return {
            MELLOMLAGRING_VERSJON,
            søker: søknadState.søker,
            barn: søknadState.barn,
        };
    }, [søknadState]);

    const mellomlagring = useYtelseMellomlagring<AppMellomlagring, MellomlagringMetaData>(APP_YTELSE, metadata);

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
