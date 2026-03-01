import { StegConfig } from '../types';

/**
 * Finner stegId basert på URL-route
 */
export const getStegIdFromRoute = <TSøknadsdata>(
    stegConfig: StegConfig<TSøknadsdata>,
    route: string,
): string | null => {
    for (const [stegId, steg] of Object.entries(stegConfig)) {
        if (steg.route === route) {
            return stegId;
        }
    }
    return null;
};
