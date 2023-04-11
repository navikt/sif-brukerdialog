import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePrevious } from '@navikt/sif-common-core-ds/lib/hooks/usePrevious';

export const useEnsureCorrectSøknadRoute = (søknadRoute: string | undefined, welcomeRoute: string) => {
    const { pathname } = useLocation();
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [showWarning, setShowWarning] = useState(false);

    const navigateTo = useNavigate();
    const previousPathname = usePrevious(pathname);

    const redirectToSøknadRoute = useCallback(() => {
        if (showWarning) {
            setShowWarning(false);
        }
        if (søknadRoute) {
            navigateTo(søknadRoute);
        }
    }, [søknadRoute, showWarning, navigateTo]);

    useEffect(() => {
        if (søknadRoute) {
            if (isFirstRender) {
                setIsFirstRender(false);
                redirectToSøknadRoute();
                return;
            }
            if (pathname === welcomeRoute && søknadRoute !== welcomeRoute) {
                if (pathname === previousPathname && showWarning === false) {
                    redirectToSøknadRoute();
                } else {
                    setShowWarning(true);
                }
            }
        }
    }, [pathname, søknadRoute, isFirstRender, previousPathname, showWarning, redirectToSøknadRoute]);

    return {
        showWarning,
        redirectToSøknadRoute,
    };
};
