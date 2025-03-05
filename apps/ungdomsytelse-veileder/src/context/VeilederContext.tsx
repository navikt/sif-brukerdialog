import { createContext, ReactNode, useContext } from 'react';
import { Veileder } from '../types/Veileder';

interface VeilederContextProps {
    veileder: Veileder;
}

const VeilederContext = createContext<VeilederContextProps | undefined>(undefined);

interface VeilederProviderProps {
    children: ReactNode;
    veileder: Veileder;
}
export const VeilederProvider = ({ children, veileder }: VeilederProviderProps) => {
    return (
        <VeilederContext.Provider
            value={{
                veileder,
            }}>
            {children}
        </VeilederContext.Provider>
    );
};

export const useVeileder = () => {
    const context = useContext(VeilederContext);
    if (context === undefined) {
        throw new Error('useVeileder must be used within a VeilederProvider');
    }
    return context;
};
