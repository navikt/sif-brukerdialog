import { handleApiError } from '@navikt/ung-common';
import { Deltaker, KontonummerDto, zKontonummerDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export const getKontonummer = async (): Promise<KontonummerDto | null> => {
    try {
        const { data } = await Deltaker.hentKontonummer();
        return zKontonummerDto.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getKontonummer');
    }
};
