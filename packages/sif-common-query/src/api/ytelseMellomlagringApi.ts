import { MellomlagringController } from '@navikt/k9-brukerdialog-prosessering-api';

import { MellomlagringYtelse } from '../types/MellomlagringYtelse';
import { ytelseMellomlagringJsonParser } from '../utils/ytelseMellomlagringJsonParser';
import { handleApiError } from '../utils/errorHandlers';

/**
 * Henter mellomlagrede data for en spesifikk ytelse fra k9-brukerdialog-prosessering-api
 *
 * @param ytelse Ytelsen det skal hentes mellomlagring for
 * @returns Promise med mellomlagrede data
 * @throws Error hvis API-kallet feiler eller data ikke kan parses
 */
export const hentYtelseMellomlagring = async (
    ytelse: MellomlagringYtelse,
): Promise<Record<string, unknown> | undefined> => {
    try {
        const { data } = await MellomlagringController.getMellomlagring({
            path: { ytelse },
        });
        return ytelseMellomlagringJsonParser<Record<string, unknown>>(
            typeof data === 'string' ? data : JSON.stringify(data),
        );
    } catch (e) {
        throw handleApiError(e, 'hentYtelseMellomlagring');
    }
};

/**
 * Oppretter mellomlagring for en spesifikk ytelse i k9-brukerdialog-prosessering-api
 *
 * @param ytelse Ytelsen det skal opprettes mellomlagring for
 * @param data Data som skal mellomlagres
 * @returns Promise med opprettingsrespons
 * @throws Error hvis API-kallet feiler
 */
export const opprettYtelseMellomlagring = async (ytelse: MellomlagringYtelse, data: Record<string, unknown>) => {
    try {
        const response = await MellomlagringController.createMellomlagring({
            path: { ytelse },
            body: data,
        });
        return response.data;
    } catch (e) {
        throw handleApiError(e, 'opprettYtelseMellomlagring');
    }
};

/**
 * Oppdaterer mellomlagrede data for en spesifikk ytelse i k9-brukerdialog-prosessering-api
 *
 * @param ytelse Ytelsen det skal oppdateres mellomlagring for
 * @param data Nye data som skal mellomlagres
 * @returns Promise med oppdateringsrespons
 * @throws Error hvis API-kallet feiler
 */
export const oppdaterYtelseMellomlagring = async (ytelse: MellomlagringYtelse, data: Record<string, unknown>) => {
    try {
        const response = await MellomlagringController.updateMellomlagring({
            path: { ytelse },
            body: data,
        });
        return response.data;
    } catch (e) {
        throw handleApiError(e, 'oppdaterYtelseMellomlagring');
    }
};

/**
 * Sletter mellomlagrede data for en spesifikk ytelse fra k9-brukerdialog-prosessering-api
 *
 * @param ytelse Ytelsen det skal slettes mellomlagring for
 * @returns Promise med slettingsrespons
 * @throws Error hvis API-kallet feiler
 */
export const slettYtelseMellomlagring = async (ytelse: MellomlagringYtelse) => {
    try {
        const response = await MellomlagringController.deleteMellomlagring({
            path: { ytelse },
        });
        return response.data;
    } catch (e) {
        throw handleApiError(e, 'hentArbeidsgivere');
    }
};
