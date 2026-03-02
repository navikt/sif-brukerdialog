import { Navigate, Outlet } from 'react-router-dom';

import { useSøknadFlyt } from '../state';

interface Props {
    erInitialisert: boolean;
    velkommenPath?: string;
}

/**
 * Guard for steg-routes. Redirecter til velkommen hvis søknad ikke er startet
 * (currentStegId er null - f.eks. ved direktenavigasjon til /soknad/* uten gyldig mellomlagring).
 *
 * Venter med å redirecte til etter initialisering er ferdig (erInitialisert=true).
 */
export const StegRoute = ({ erInitialisert, velkommenPath = '/' }: Props) => {
    const currentStegId = useSøknadFlyt((s) => s.currentStegId);

    // Vent til initialisering er ferdig før vi sjekker
    if (!erInitialisert) {
        return null;
    }

    if (!currentStegId) {
        return <Navigate to={velkommenPath} replace />;
    }

    return <Outlet />;
};
