import { createContext, useContext } from 'react';
import { RegistrertBarn } from '../types/RegistrertBarn';
import { Søker } from '../types/Søker';
import { SøknadFormValues } from '../types/SøknadFormValues';
import { StepID } from './søknadStepsConfig';

export interface SøknadContextState {
    søker: Søker;
    barn: RegistrertBarn[];
    step?: StepID;
    søknadFormValues?: SøknadFormValues;
}

export const SøknadContext = createContext<SøknadContextState | undefined>(undefined);

export const SøknadsdataContextProvider = SøknadContext.Provider;

export const SøknadsdataContextConsumer = SøknadContext.Consumer;

export const useSøknadContext = () => {
    const context = useContext(SøknadContext);
    if (context === undefined) {
        throw new Error('useSoknadContext needs to be called within a SøknadsdataContextProvider');
    }
    return context;
};
