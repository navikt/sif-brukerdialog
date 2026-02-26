import { handleApiError } from '@navikt/sif-common-query';
import { Deltaker, KontonummerDto, zKontonummerDto } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export const hentKontonummer = async (): Promise<KontonummerDto | null> => {
    try {
        const { data } = await Deltaker.hentKontonummer();
        return zKontonummerDto.parse(data);
    } catch (e) {
        throw handleApiError(e, 'hentKontonummer');
    }
};
