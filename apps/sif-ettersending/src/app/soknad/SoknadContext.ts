import { createContext, useContext } from 'react';
import { initial } from '@devexperts/remote-data-ts';
import { SendSoknadStatusInterface, SoknadContextInterface } from '@navikt/sif-common-soknad-ds';
import { SoknadApiData } from '../types/SoknadApiData';
import { StepID } from './soknadStepsConfig';

export type SendSoknadStatus = SendSoknadStatusInterface<SoknadApiData>;
export type SoknadContext = SoknadContextInterface<StepID, SoknadApiData>;

const soknadContext = createContext<SoknadContextInterface<StepID, SoknadApiData> | undefined>(undefined);

export const SoknadContextProvider = soknadContext.Provider;
export const SoknadContextConsumer = soknadContext.Consumer;

export const useSoknadContext = (): SoknadContextInterface<StepID, SoknadApiData> => {
    const context = useContext(soknadContext);
    if (context === undefined) {
        throw new Error('useSoknadContext needs to be called within a SoknadContext');
    }
    return context;
};

export const initialSendSoknadState: SendSoknadStatus = {
    failures: 0,
    status: initial,
};
