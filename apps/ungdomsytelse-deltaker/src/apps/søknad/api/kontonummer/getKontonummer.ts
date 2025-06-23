import { handleApiError } from '@navikt/ung-common';
import { Deltaker as DeltakerService, KontonummerDto, zKontonummerDto } from '@navikt/ung-deltakelse-opplyser-api';

export const getKontonummer = async (): Promise<KontonummerDto | null> => {
    try {
        const { data } = await DeltakerService.hentKontonummer();
        return zKontonummerDto.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getKontonummer');
    }
};
