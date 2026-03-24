/* eslint-disable no-console */
import { MellomlagringMetaData, SøknadMellomlagring } from '@app/types/Mellomlagring';
import { useYtelseMellomlagring } from '@sif/api';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { SøknadFormValues, StepFormValues } from '@sif/soknad/types';
import { useMemo } from 'react';

import { SøknadStepId } from '../config/SoknadStepId';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '../constants';
import { useSøknadStore } from './useSoknadStore';

export const useSøknadMellomlagring = () => {
    const søknadState = useSøknadStore((s) => s.søknadState);

    // Skjemadata på tvers av steg
    const { søknadFormValues } = useSøknadFormValues();

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
            try {
                await mellomlagring.lagre({
                    søknadsdata,
                    currentStepId,
                    skjemadata: undefined,
                });
            } catch (error) {
                console.error('Mellomlagring feilet', error);
            }
        }
    };

    const opprettMellomlagring = async () => {
        const state = useSøknadStore.getState();
        const søknadsdata = state.søknadState?.søknadsdata;
        const currentStepId = state.currentStepId;

        if (søknadsdata && currentStepId) {
            try {
                await mellomlagring.opprett({
                    søknadsdata,
                    currentStepId,
                    skjemadata: undefined,
                });
            } catch (error) {
                console.error('Opprett mellomlagring feilet', error);
            }
        }
    };

    /** Lagre søknad og skjemadata for ett steg */
    const lagreSøknadSteg = async (stegId: SøknadStepId, values: StepFormValues) => {
        const skjemadata = { [stegId]: values };
        await lagreSøknadOgSkjemadata(skjemadata);
    };

    /** Lagre søknad og skjemadata for alle steg som har verdier */
    const lagreSøknadOgSkjemadata = async (skjemadata: SøknadFormValues) => {
        const state = useSøknadStore.getState();
        const søknadsdata = state.søknadState?.søknadsdata;
        const currentStepId = state.currentStepId;

        if (søknadsdata && currentStepId) {
            try {
                await mellomlagring.lagre({
                    søknadsdata,
                    currentStepId,
                    skjemadata: {
                        ...søknadFormValues,
                        ...skjemadata,
                    },
                });
            } catch (error) {
                console.error('Mellomlagring feilet', error);
            }
        }
    };

    return {
        lagreSøknad,
        opprettMellomlagring,
        lagreSøknadOgSkjemadata,
        lagreSøknadSteg,
        slettMellomlagring: mellomlagring.slett,
        isPending: mellomlagring.isPending,
    };
};
