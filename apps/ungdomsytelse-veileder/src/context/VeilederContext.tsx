import { createContext, ReactNode, useContext } from 'react';
import { Veileder } from '../types/Veileder';
import { parsedVeilederMock } from '../../mock/msw/mocks/mockUtils';

interface VeilederContextProps {
    veileder: Veileder;
}

const VeilederContext = createContext<VeilederContextProps | undefined>(undefined);

const getUserFromHtml = (): Veileder => {
    const userInfoNode = document.getElementById('nav:userInfo') as HTMLScriptElement;
    const userInfoInline = userInfoNode ? userInfoNode.text : JSON.stringify(parsedVeilederMock);
    return JSON.parse(userInfoInline);
};

interface VeilederProviderProps {
    children: ReactNode;
}
export const VeilederProvider = ({ children }: VeilederProviderProps) => {
    const veileder = getUserFromHtml();
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
