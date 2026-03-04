import { useMemo } from 'react';
import { useYtelseMellomlagring } from '@navikt/sif-common-query';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '../config/appConfig';
import { SøknadStepId } from '../config/søknadStepConfig';
import { AppMellomlagring, MellomlagringMetaData } from '../types/Mellomlagring';
import { useSøknadStore } from './useSøknadStore';

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

    /**
     * Lagre ved submit av steg. Clearer skjemadata siden søknadsdata nå er master.
     */
    const lagreSøknad = async () => {
        const state = useSøknadStore.getState();
        const søknadsdata = state.søknadState?.søknadsdata;
        const currentStepId = state.currentStepId;

        if (søknadsdata && currentStepId) {
            await mellomlagring.lagre({
                søknadsdata,
                currentStepId,
                skjemadata: undefined,
            });
        }
    };

    /**
     * Lagre midt i et steg. Bevarer skjemadata for usubmittede verdier.
     */
    const lagreSøknadOgSkjemadata = async (skjemadata: Partial<Record<SøknadStepId, object>>) => {
        const state = useSøknadStore.getState();
        const søknadsdata = state.søknadState?.søknadsdata;
        const currentStepId = state.currentStepId;

        if (søknadsdata && currentStepId) {
            await mellomlagring.lagre({
                søknadsdata,
                currentStepId,
                skjemadata,
            });
        }
    };

    return {
        lagreSøknad,
        lagreSøknadOgSkjemadata,
        slett: mellomlagring.slett,
        isPending: mellomlagring.isLagring,
    };
};
