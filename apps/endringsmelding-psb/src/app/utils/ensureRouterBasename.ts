export const ensureRouterBasename = (publicPath: string) => {
    if (!window.location.pathname.includes(publicPath)) {
        window.history.replaceState('', '', publicPath + window.location.pathname);
    }
};
