export const ensureBaseNameForReactRouter = (routerBaseUrl: string) => {
    if (!window.location.pathname.includes(routerBaseUrl)) {
        window.history.replaceState('', '', routerBaseUrl + window.location.pathname);
    }
};
