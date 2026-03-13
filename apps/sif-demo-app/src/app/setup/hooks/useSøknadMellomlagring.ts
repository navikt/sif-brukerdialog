import { useYtelseMellomlagring } from '@navikt/sif-common-query';
import { SøknadFormValues } from '@sif/soknad/types';
import { useMemo } from 'react';

import { MellomlagringMetaData, SøknadMellomlagring } from '../../types/Mellomlagring';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '../constants';
import { useSøknadStore } from './useSøknadStore';

/**
 * Bruker useYtelseMellomlagring fra sif-common-query til å håndtere
 * mellomlagring av søknadsdata og skjemadata.
 * Skjemadata er data som ikke er submittet enda.
 */
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

    const mellomlagring = useYtelseMellomlagring<SøknadMellomlagring, MellomlagringMetaData>(APP_YTELSE, metadata);

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
    const lagreSøknadOgSkjemadata = async (skjemadata: SøknadFormValues) => {
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
        slettMellomlagring: mellomlagring.slett,
        isPending: mellomlagring.isPending,
    };
};
