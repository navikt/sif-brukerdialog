/* eslint-disable no-console */
import { useYtelseMellomlagring } from '@sif/api/k9-prosessering';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { SøknadFormValues, StepFormValues } from '@sif/soknad/types';
import { useMemo } from 'react';

import { Features } from '../../../../utils/Features';
import { SøknadStepId } from '../config/SøknadStepId';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '../constants';
import { MellomlagringMetaData, SøknadMellomlagring } from '../types/Mellomlagring';
import { useSøknadStore } from './useSøknadStore';

export const useSøknadMellomlagring = () => {
    const søknadState = useSøknadStore((s) => s.søknadState);
    const { søknadFormValues } = useSøknadFormValues();

    const metadata = useMemo<MellomlagringMetaData | undefined>(() => {
        if (!Features.useMellomlagring) return undefined;
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

    const lagreSøknadSteg = async (stegId: SøknadStepId, values: StepFormValues) => {
        const skjemadata = { [stegId]: values };
        await lagreSøknadOgSkjemadata(skjemadata);
    };

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

    if (!Features.useMellomlagring) {
        return {
            lagreSøknad: async () => {},
            opprettMellomlagring: async () => {},
            lagreSøknadOgSkjemadata: async () => {},
            lagreSøknadSteg: async () => {},
            slettMellomlagring: async () => {},
            isPending: false,
        };
    }

    return {
        lagreSøknad,
        opprettMellomlagring,
        lagreSøknadOgSkjemadata,
        lagreSøknadSteg,
        slettMellomlagring: mellomlagring.slett,
        isPending: mellomlagring.isPending,
    };
};
