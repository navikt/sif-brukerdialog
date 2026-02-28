import { StegConfig } from '../types';

/**
 * Henter URL-route for et steg (bruker route hvis definert, ellers id)
 */
export const getStegRoute = <TSøknadsdata>(stegConfig: StegConfig<TSøknadsdata>, stegId: string): string => {
    const steg = stegConfig[stegId];
    return steg?.route ?? steg?.id ?? stegId;
};

/**
 * Finner stegId basert på URL-route
 */
export const getStegIdFromRoute = <TSøknadsdata>(
    stegConfig: StegConfig<TSøknadsdata>,
    route: string,
): string | null => {
    for (const [stegId, steg] of Object.entries(stegConfig)) {
        const stegRoute = steg.route ?? steg.id;
        if (stegRoute === route) {
            return stegId;
        }
    }
    return null;
};
