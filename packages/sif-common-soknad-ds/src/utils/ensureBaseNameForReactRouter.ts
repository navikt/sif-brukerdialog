export const ensureBaseNameForReactRouter = (routerBaseUrl: string) => {
    /** Todo - får dobbelt url av og til */
    if (!window.location.pathname.includes(routerBaseUrl)) {
        window.history.replaceState('', '', routerBaseUrl + window.location.pathname);
    }
};
