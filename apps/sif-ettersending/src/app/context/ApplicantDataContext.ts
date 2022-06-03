import * as React from 'react';
import { ApplicantData } from '../types/ApplicantData';

export const SøkerdataContext = React.createContext<ApplicantData | undefined>(undefined);

export const SøkerdataContextProvider = SøkerdataContext.Provider;
export const SøkerdataContextConsumer = SøkerdataContext.Consumer;
