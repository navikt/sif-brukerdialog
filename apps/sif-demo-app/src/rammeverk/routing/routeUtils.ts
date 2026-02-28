import { StegConfig } from '../types';

/**
 * Henter URL-route for et steg
 */
export const getStegRoute = <TSøknadsdata>(stegConfig: StegConfig<TSøknadsdata>, stegId: string): string => {
    return stegConfig[stegId]?.route ?? stegId;
};

/**
 * Finner stegId basert på URL-route
 */
export const getStegIdFromRoute = <TSøknadsdata>(
    stegConfig: StegConfig<TSøknadsdata>,
    route: string,
): string | null => {
    const entry = Object.entries(stegConfig).find(([id, def]) => (def.route ?? id) === route);
    return entry ? entry[0] : null;
};
