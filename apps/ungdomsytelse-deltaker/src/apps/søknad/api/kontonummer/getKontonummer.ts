import { handleApiError } from '@navikt/ung-common';
import { DeltakerApi } from '@navikt/ung-deltakelse-opplyser-api';

export const getKontonummer = async (): Promise<DeltakerApi.KontonummerDto | null> => {
    try {
        const { data } = await DeltakerApi.Deltaker.hentKontonummer();
        return DeltakerApi.zKontonummerDto.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getKontonummer');
    }
};
