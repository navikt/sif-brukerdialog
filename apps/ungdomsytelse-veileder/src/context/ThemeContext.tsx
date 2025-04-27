import { Theme } from '@navikt/ds-react';
import { useContext, useState, createContext } from 'react';

interface ThemeContextType {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(localStorage.getItem(StorageKey) === 'dark');

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode: (useDarkMode: boolean) => {
                    setDarkMode(useDarkMode);
                    localStorage.setItem(StorageKey, useDarkMode ? 'dark' : 'light');
                },
            }}>
            <Theme theme={darkMode ? 'dark' : 'light'}>{children}</Theme>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
};

const StorageKey = 'veilederTheme';
