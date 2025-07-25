import { MellomlagringController } from '@navikt/k9-brukerdialog-prosessering-api';
import { MellomlagringYtelse } from '../types/MellomlagringYtelse';
import { jsonParseUtils } from '../utils/jsonParseUtils';

/**
 * Henter mellomlagrede data for en spesifikk ytelse fra k9-brukerdialog-prosessering-api
 *
 * @param ytelse Ytelsen det skal hentes mellomlagring for
 * @returns Promise med mellomlagrede data
 * @throws Error hvis API-kallet feiler eller data ikke kan parses
 */
export const hentYtelseMellomlagring = async (ytelse: MellomlagringYtelse): Promise<Record<string, unknown>> => {
    const { data } = await MellomlagringController.getMellomlagring({
        path: { ytelse },
    });
    const parsedData = await jsonParseUtils.ytelseMellomlagringJsonParser(
        typeof data === 'string' ? data : JSON.stringify(data),
    );
    return parsedData;
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
export const oppdaterYtelseMellomlagring = async (ytelse: MellomlagringYtelse, data: Record<string, unknown>) => {
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
export const slettYtelseMellomlagring = async (ytelse: MellomlagringYtelse) => {
    const response = await MellomlagringController.deleteMellomlagring({
        path: { ytelse },
    });
    return response.data;
};
