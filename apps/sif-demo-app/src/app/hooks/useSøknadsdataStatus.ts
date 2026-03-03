import { useCallback } from 'react';
import { useStepFormValuesStatus } from '@rammeverk/hooks';
import { StegId, stegRekkefølge } from '../config/stegConfig';
import { useSøknadStore } from './useSøknadStore';
import { Søknadsdata } from '../types/Søknadsdata';

type FormValues = Record<string, unknown>;

/**
 * Konverterer skjemadata til søknadsdata-format for et gitt steg.
 * I denne demo-appen er formatet identisk, men i en reell app
 * kan konverteringen være mer kompleks.
 */
const formValuesToSøknadsdata = (stegId: string, formValues: FormValues): Record<string, unknown> | undefined => {
    switch (stegId) {
        case StegId.PERSONALIA:
            return {
                navn: formValues.navn,
                harKjæledyr: formValues.harKjæledyr,
            };
        case StegId.KJÆLEDYR:
            return {
                navn: formValues.navn,
            };
        case StegId.KONTAKT:
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
export const useSøknadsdataStatus = (currentStegId: string) => {
    const søknadsdata = useSøknadStore((s) => s.søknadState?.søknadsdata);

    const getSøknadsdataForSteg = useCallback(
        (stegId: string): Record<string, unknown> | undefined => {
            return søknadsdata?.[stegId as keyof Søknadsdata];
        },
        [søknadsdata],
    );

    return useStepFormValuesStatus({
        currentStepId: currentStegId,
        stepOrder: stegRekkefølge,
        formValuesToSøknadsdata,
        getSøknadsdataForStep: getSøknadsdataForSteg,
    });
};
