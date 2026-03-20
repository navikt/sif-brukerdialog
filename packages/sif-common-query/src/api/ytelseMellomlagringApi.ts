import { MellomlagringController } from '@navikt/k9-brukerdialog-prosessering-api';

import { MellomlagringYtelse } from '../types/MellomlagringYtelse';
import { handleApiError } from '../utils/errorHandlers';
import { ytelseMellomlagringJsonParser } from '../utils/ytelseMellomlagringJsonParser';

export const hentYtelseMellomlagring = async (
    ytelse: MellomlagringYtelse,
): Promise<Record<string, unknown> | undefined> => {
    try {
        const { data } = await MellomlagringController.getMellomlagring({
            path: { ytelse },
        });
        if (typeof data === 'string') {
            return ytelseMellomlagringJsonParser<Record<string, unknown>>(data);
        }
        return data as Record<string, unknown> | undefined;
    } catch (e) {
        throw handleApiError(e, 'hentYtelseMellomlagring');
    }
};

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

export const slettYtelseMellomlagring = async (ytelse: MellomlagringYtelse) => {
    try {
        const response = await MellomlagringController.deleteMellomlagring({
            path: { ytelse },
        });
        return response.data;
    } catch (e) {
        throw handleApiError(e, 'slettYtelseMellomlagring');
    }
};
