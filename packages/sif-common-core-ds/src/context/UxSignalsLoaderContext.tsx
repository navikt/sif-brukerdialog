import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface UxSignalsLoaderContextValue {
    loadUxSignals: () => void;
    isLoaded: boolean;
}

const UxSignalsLoaderContext = createContext<UxSignalsLoaderContextValue | undefined>(undefined);

interface UxSignalsLoaderProviderProps {
    children: ReactNode;
}

let isGloballyInitialized = false;

export const UxSignalsLoaderProvider = ({ children }: UxSignalsLoaderProviderProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const loadUxSignals = () => {
        // Dobbel-sjekk om script allerede eksisterer i DOM
        const existingScript = document.querySelector('script[src="https://widget.uxsignals.com/embed.js"]');
        if (existingScript || isGloballyInitialized) {
            setIsLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://widget.uxsignals.com/embed.js';
        document.body.appendChild(script);

        isGloballyInitialized = true;
        setIsLoaded(true);
    };

    return (
        <UxSignalsLoaderContext.Provider value={{ loadUxSignals, isLoaded }}>
            {children}
        </UxSignalsLoaderContext.Provider>
    );
};

export const useUxSignalsLoader = (autoLoad?: boolean): UxSignalsLoaderContextValue => {
    const context = useContext(UxSignalsLoaderContext);
    if (context === undefined) {
        throw new Error('useUxSignalsLoader must be used within a UxSignalsLoaderProvider');
    }

    const { loadUxSignals } = context;

    useEffect(() => {
        if (autoLoad) {
            loadUxSignals();
        }
    }, [autoLoad, loadUxSignals]);

    return context;
};

export default UxSignalsLoaderContext;
