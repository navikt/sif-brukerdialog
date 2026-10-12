import { jsonSort } from './jsonSort';

/**
 * SHA-256 av grunnlaget, uavhengig av nøkkelrekkefølge.
 * Kun hashen lagres i mellomlagringen — selve verdiene forlater aldri nettleseren.
 */
export const createGrunnlagHash = async (grunnlag: Record<string, unknown>): Promise<string> => {
    const data = new TextEncoder().encode(JSON.stringify(jsonSort(grunnlag)));
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
};
