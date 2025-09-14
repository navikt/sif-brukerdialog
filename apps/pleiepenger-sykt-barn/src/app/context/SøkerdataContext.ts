import React from 'react';

import { Søkerdata } from '../types/Søkerdata';

export const SøkerdataContext = React.createContext<Søkerdata | undefined>(undefined);

export const SøkerdataContextProvider = SøkerdataContext.Provider;
export const SøkerdataContextConsumer = SøkerdataContext.Consumer;
