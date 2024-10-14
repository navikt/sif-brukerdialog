import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePrevious } from '@navikt/sif-common/src/hooks';

const isRouteAvailable = (route: string, availableRoutes: string[], welcomeRoute: string): boolean => {
    return route === welcomeRoute || availableRoutes.some((r) => r === route);
};

export enum EnsureCorrectSøknadRouteErrorType {
    'welcomePage' = 'welcomePage',
    'unavailableRoute' = 'unavailableRoute',
}

export const useEnsureCorrectSøknadRoute = (
    søknadRoute: string | undefined,
    welcomeRoute: string,
    availableRoutes: string[],
) => {
    const { pathname } = useLocation();
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [routeError, setRouteError] = useState<EnsureCorrectSøknadRouteErrorType | undefined>();

    const navigateTo = useNavigate();
    const previousPathname = usePrevious(pathname);

    const redirectToSøknadRoute = useCallback(() => {
        if (routeError) {
            setRouteError(undefined);
        }
        if (søknadRoute) {
            navigateTo(søknadRoute);
        }
    }, [søknadRoute, routeError, navigateTo]);

    useEffect(() => {
        if (søknadRoute) {
            const isAvailable = isRouteAvailable(søknadRoute, availableRoutes, welcomeRoute);
            if (isAvailable) {
                if (isFirstRender) {
                    setIsFirstRender(false);
                    redirectToSøknadRoute();
                    return;
                }
                if (pathname === welcomeRoute && søknadRoute !== welcomeRoute) {
                    if (pathname === previousPathname && routeError === undefined) {
                        redirectToSøknadRoute();
                    } else {
                        setRouteError(EnsureCorrectSøknadRouteErrorType.welcomePage);
                    }
                }
            } else {
                setRouteError(EnsureCorrectSøknadRouteErrorType.unavailableRoute);
            }
        }
    }, [
        pathname,
        søknadRoute,
        isFirstRender,
        previousPathname,
        routeError,
        redirectToSøknadRoute,
        welcomeRoute,
        availableRoutes,
    ]);

    const clearRouteError = () => {
        setRouteError(undefined);
    };

    return {
        routeError,
        redirectToSøknadRoute,
        clearRouteError,
    };
};
