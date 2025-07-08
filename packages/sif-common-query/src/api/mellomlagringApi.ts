import { MellomlagringController, zGetMellomlagringResponse } from '@navikt/k9-brukerdialog-prosessering-api';
import { MellomlagringYtelse } from '../types/mellomlagring';
import { jsonResponseParser } from '../utils/jsonResponseParser';

/**
 * Henter mellomlagrede data for en spesifikk ytelse fra k9-brukerdialog-prosessering-api
 *
 * @param ytelse Ytelsen det skal hentes mellomlagring for
 * @returns Promise med mellomlagrede data
 * @throws Error hvis API-kallet feiler eller data ikke kan parses
 */
export const hentMellomlagring = async (ytelse: MellomlagringYtelse) => {
    const response = await MellomlagringController.getMellomlagring({
        path: { ytelse },
    });
    // Apply storage parser to convert date strings to Date objects
    const parsedData = jsonResponseParser(JSON.stringify(response.data));
    return zGetMellomlagringResponse.parse(parsedData);
};

/**
 * Oppretter mellomlagring for en spesifikk ytelse i k9-brukerdialog-prosessering-api
 *
 * @param ytelse Ytelsen det skal opprettes mellomlagring for
 * @param data Data som skal mellomlagres
 * @returns Promise med opprettingsrespons
 * @throws Error hvis API-kallet feiler
 */
export const createMellomlagring = async (ytelse: MellomlagringYtelse, data: Record<string, unknown>) => {
    const response = await MellomlagringController.createMellomlagring({
        path: { ytelse },
        body: data,
    });
    return response.data;
};

/**
 * Oppdaterer mellomlagrede data for en spesifikk ytelse i k9-brukerdialog-prosessering-api
 *
 * @param ytelse Ytelsen det skal oppdateres mellomlagring for
 * @param data Nye data som skal mellomlagres
 * @returns Promise med oppdateringsrespons
 * @throws Error hvis API-kallet feiler
 */
export const updateMellomlagring = async (ytelse: MellomlagringYtelse, data: Record<string, unknown>) => {
    const response = await MellomlagringController.updateMellomlagring({
        path: { ytelse },
        body: data,
    });
    return response.data;
};

/**
 * Sletter mellomlagrede data for en spesifikk ytelse fra k9-brukerdialog-prosessering-api
 *
 * @param ytelse Ytelsen det skal slettes mellomlagring for
 * @returns Promise med slettingsrespons
 * @throws Error hvis API-kallet feiler
 */
export const deleteMellomlagring = async (ytelse: MellomlagringYtelse) => {
    const response = await MellomlagringController.deleteMellomlagring({
        path: { ytelse },
    });
    return response.data;
};
