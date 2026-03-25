import { useYtelseMellomlagring } from '@sif/api/k9-prosessering';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { SøknadFormValues, StepFormValues } from '@sif/soknad/types';
import { useMemo } from 'react';

import { MellomlagringMetaData, SøknadMellomlagring } from '../../types/Mellomlagring';
import { SøknadStepId } from '../config/soknadStepConfig';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '../constants';
import { useSøknadStore } from './useSoknadStore';

export const useSøknadMellomlagring = () => {
    const søknadState = useSøknadStore((s) => s.søknadState);

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

    return {
        lagreSøknad,
        opprettMellomlagring,
        lagreSøknadOgSkjemadata,
        lagreSøknadSteg,
        slettMellomlagring: mellomlagring.slett,
        isPending: mellomlagring.isPending,
    };
};
