import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SkyraHandler = () => {
    const location = useLocation();
    useEffect(() => {
        const skyra = (globalThis as any).skyra;
        if (skyra?.reload) {
            skyra.reload();
        }
    }, [location.pathname]);
    return null;
};
