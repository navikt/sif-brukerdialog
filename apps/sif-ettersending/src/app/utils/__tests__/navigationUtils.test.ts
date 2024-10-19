import { NavigateFunction } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { getRouteConfig } from '../../config/routeConfig';
import { Søknadstype } from '../../types/Søknadstype';
import { navigateToErrorPage, userIsCurrentlyOnErrorPage } from '../navigationUtils';

const navigate: NavigateFunction = vi.fn().mockImplementation(() => {});

vi.mock('@navikt/sif-common-env', () => {
    return { getRequiredEnv: () => '', commonEnv: { PUBLIC_PATH: '', SIF_PUBLIC_LOGIN_URL: '' } };
});

const søknadstype = Søknadstype.omsorgspenger;
const routeConfig = getRouteConfig(søknadstype);

// hacky workaround for this issue, which actually seems to be an issue
const setWindowLocationPathname = (pathname: string | undefined) => {
    const windowLocation = JSON.stringify(window.location);
    delete (window as any).location;
    Object.defineProperty(window, 'location', {
        value: { ...JSON.parse(windowLocation), pathname },
        configurable: true,
    });
};

describe('navigationUtils', () => {
    describe('navigateToErrorPage', () => {
        it('should navigate user to the path specified by routeConfig.ERROR_PAGE_ROUTE', () => {
            navigateToErrorPage(søknadstype, navigate);
            expect(navigate).toHaveBeenCalledWith(routeConfig.ERROR_PAGE_ROUTE);
        });
    });

    describe('userIsCurrentlyOnErrorPage', () => {
        it('should return true if current window.location.pathname is equal to routeConfig.ERROR_PAGE_ROUTE', () => {
            setWindowLocationPathname(routeConfig.ERROR_PAGE_ROUTE);
            expect(userIsCurrentlyOnErrorPage(søknadstype)).toBe(true);
        });

        it('should return false if current window.location.pathname is not equal to routeConfig.ERROR_PAGE_ROUTE', () => {
            setWindowLocationPathname(undefined);
            expect(userIsCurrentlyOnErrorPage(søknadstype)).toBe(false);
            setWindowLocationPathname('/foobar');
            expect(userIsCurrentlyOnErrorPage(søknadstype)).toBe(false);
        });
    });
});
