import { commonRequestHeaders } from '@sif/api-client';
import { aktivitetspenger, ungdomsytelse } from '@sif/k9-brukerdialog-prosessering-api';

import { handleApiError } from '../../shared/errorHandlers';

export const rapporterInntektAktivitetspenger = async (
    data: aktivitetspenger.AktivitetspengerInntektsrapportering,
): Promise<void> => {
    try {
        await aktivitetspenger.AktivitetspengerController.inntektrapportering({
            body: data,
            headers: commonRequestHeaders,
        });
    } catch (e) {
        throw handleApiError(e, 'rapporterInntektAktivitetspenger');
    }
};

export const rapporterInntektUngdomsytelse = async (
    data: ungdomsytelse.UngdomsytelseInntektsrapportering,
): Promise<void> => {
    try {
        await ungdomsytelse.UngdomsytelseController.inntektrapportering({
            body: data,
            headers: commonRequestHeaders,
        });
    } catch (e) {
        throw handleApiError(e, 'rapporterInntektUngdomsytelse');
    }
};
