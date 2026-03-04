import { useCallback } from 'react';
import { useStepFormValuesStatus } from '@rammeverk/hooks';
import { SøknadStepId, søknadStepOrder as stepOrder } from '../config/søknadStepConfig';
import { useSøknadStore } from './useSøknadStore';
import { Søknadsdata } from '../types/Søknadsdata';
import { FormValuesToSøknadsdataFn } from '../../rammeverk/hooks/useStepFormValuesStatus';

type FormValues = Record<string, unknown>;

/**
 * Konverterer skjemadata til søknadsdata-format for et gitt steg.
 * I denne demo-appen er formatet identisk, men i en reell app
 * kan konverteringen være mer kompleks.
 */
const formValuesToSøknadsdata: FormValuesToSøknadsdataFn = (
    stepId: string,
    formValues: FormValues,
): Record<string, unknown> | undefined => {
    switch (stepId) {
        case SøknadStepId.PERSONALIA:
            return {
                navn: formValues.navn,
                harHobby: formValues.harHobby,
            };
        case SøknadStepId.HOBBY:
            return {
                navn: formValues.navn,
            };
        case SøknadStepId.KONTAKT:
            return {
                epost: formValues.epost,
            };
        default:
            return undefined;
    }
};

/**
 * Hook som sjekker om formValues for tidligere steg matcher lagret søknadsdata.
 * Brukes for å oppdage om bruker har endret data uten å submitte (f.eks. via nettleserens forward-knapp).
 */
export const useSøknadsdataStatus = (currentStepId: string) => {
    const søknadsdata = useSøknadStore((s) => s.søknadState?.søknadsdata);

    const getSøknadsdataForStep = useCallback(
        (stepId: string): Record<string, unknown> | undefined => {
            return søknadsdata?.[stepId as keyof Søknadsdata];
        },
        [søknadsdata],
    );

    return useStepFormValuesStatus({
        currentStepId,
        stepOrder,
        formValuesToSøknadsdata,
        getSøknadsdataForStep,
    });
};
