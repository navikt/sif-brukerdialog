import { DeltakerService, KontonummerDto, zKontonummerDto } from '@navikt/ung-deltakelse-opplyser-api';
import { handleApiError } from '@navikt/ung-common';
import { isAxiosError } from 'axios';

export const getKontonummer = async (): Promise<KontonummerDto | null> => {
    try {
        const { data } = await DeltakerService.hentKontonummer();
        return zKontonummerDto.parse(data);
    } catch (e) {
        if (isAxiosError(e)) {
            if (e.status === 404) {
                return null;
            }
        }
        throw handleApiError(e, 'getKontonummer');
    }
};
