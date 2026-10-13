import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';

import { handleApiError } from '../../utils/errorHandlers';
import { commonRequestHeader } from '../../utils/initApiClient';

export const rapporterInntektAktivitetspenger = async (
    data: aktivitetspenger.AktivitetspengerInntektsrapportering,
): Promise<void> => {
    try {
        await aktivitetspenger.AktivitetspengerController.inntektrapportering({
            body: data,
            headers: commonRequestHeader,
        });
    } catch (e) {
        throw handleApiError(e, 'rapporterInntektAktivitetspenger');
    }
};
