import { useContext } from 'react';

import { InnsynContext, InnsynContextType } from '../context/InnsynContext';

export const useInnsynContext = (): InnsynContextType => {
    const context = useContext(InnsynContext);
    if (!context) {
        throw new Error('useInnsynContext must be used within a InnsynContextProvider');
    }
    return context;
};
