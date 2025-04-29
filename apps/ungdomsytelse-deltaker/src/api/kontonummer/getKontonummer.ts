import { DeltakerService, KontonummerDto, zKontonummerDto } from '@navikt/ung-deltakelse-opplyser-api';
import { handleApiError } from '@navikt/ung-common';

export const getKontonummer = async (): Promise<KontonummerDto> => {
    try {
        const { data } = await DeltakerService.hentKontonummer();
        return zKontonummerDto.parse(data);
    } catch (e) {
        throw handleApiError(e, 'getKontonummer');
    }
};
