import { Theme } from '@navikt/ds-react';
import { useContext, useState, createContext } from 'react';

interface DevContextType {
    todosVisible: boolean;
    setTodosVisible: (visible: boolean) => void;
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

const DevContext = createContext<DevContextType | undefined>(undefined);

export const DevProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [todosVisible, setTodosVisible] = useState<boolean>(getIsTodosVisible());
    const [darkMode, setDarkMode] = useState<boolean>(getDarkMode());

    const setIsTodosVisible = (visible: boolean) => {
        setTodosVisible(visible);
        saveTodosVisible(visible);
    };

    const setIsDarkMode = (darkMode: boolean) => {
        setDarkMode(darkMode);
        saveDarkMode(darkMode);
    };

    return (
        <DevContext.Provider
            value={{ todosVisible, setTodosVisible: setIsTodosVisible, darkMode, setDarkMode: setIsDarkMode }}>
            <Theme theme={darkMode ? 'dark' : 'light'}>{children}</Theme>
        </DevContext.Provider>
    );
};

export const useDevContext = (): DevContextType => {
    const context = useContext(DevContext);
    if (!context) {
        throw new Error('useDevContext must be used within a DevProvider');
    }
    return context;
};

const StorageKey = 'DevToggle';

export const getIsTodosVisible = (): boolean => {
    return localStorage.getItem(StorageKey) === 'on';
};

export const saveTodosVisible = (visible: boolean) => {
    localStorage.setItem(StorageKey, visible ? 'on' : 'off');
};

export const getDarkMode = (): boolean => {
    return localStorage.getItem('darkMode') === 'on';
};

export const saveDarkMode = (visible: boolean) => {
    localStorage.setItem('darkMode', visible ? 'on' : 'off');
};
