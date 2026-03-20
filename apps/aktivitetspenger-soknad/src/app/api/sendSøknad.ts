import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeader, handleApiError } from '@navikt/ung-common';

export const sendSøknad = async (data: aktivitetspenger.Aktivitetspengersøknad): Promise<any> => {
    try {
        await aktivitetspenger.AktivitetspengerController.innsendingAktivitetspengersøknad({
            body: data,
            headers: commonRequestHeader,
        });
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
