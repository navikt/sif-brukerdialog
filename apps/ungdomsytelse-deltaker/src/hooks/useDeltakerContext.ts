import { useContext } from 'react';

import { DeltakerContext, DeltakerContextType } from '../context/DeltakerContext';

export const useDeltakerContext = (): DeltakerContextType => {
    const context = useContext(DeltakerContext);
    if (!context) {
        throw new Error('useDeltakerContext must be used within a DeltakerContextProvider');
    }
    return context;
};
