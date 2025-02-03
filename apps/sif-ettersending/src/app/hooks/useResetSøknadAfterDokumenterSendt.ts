import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { APPLICATION_SENDT_PAGE } from '../config/routeConfig';

const useResetSøknadAfterDokumenterSendt = (reset: () => void) => {
    const location = useLocation();
    const [previousPath, setPreviousPath] = useState<string | null>(null);

    useEffect(() => {
        if (previousPath?.includes(APPLICATION_SENDT_PAGE)) {
            reset();
        } else {
            setPreviousPath(location.pathname);
        }
    }, [location]);
};

export default useResetSøknadAfterDokumenterSendt;
