import { useYtelseMellomlagring } from '@navikt/sif-common-query';
import { SøknadFormValues, StepFormValues } from '@sif/soknad/types';
import { useMemo } from 'react';

import { MellomlagringMetaData, SøknadMellomlagring } from '../../types/Mellomlagring';
import { SøknadStepId } from '../config/søknadStepConfig';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '../constants';
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

    const mellomlagring = useYtelseMellomlagring<SøknadMellomlagring, MellomlagringMetaData>(APP_YTELSE, metadata);

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

    /** Lagre søknad og skjemadata for ett steg */
    const lagreSøknadSteg = async (stegId: SøknadStepId, values: StepFormValues) => {
        const state = useSøknadStore.getState();
        const søknadsdata = state.søknadState?.søknadsdata;
        const currentStepId = state.currentStepId;

        if (søknadsdata && currentStepId) {
            const skjemadata = { [stegId]: values };
            lagreSøknadOgSkjemadata(skjemadata);
        }
    };
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
        lagreSøknadSteg,
        slettMellomlagring: mellomlagring.slett,
        isPending: mellomlagring.isPending,
    };
};
