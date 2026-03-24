import { AktivitetspengerController, Aktivitetspengersøknad } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeader, handleApiError } from '@navikt/ung-common';

export const sendSøknad = async (data: Aktivitetspengersøknad): Promise<any> => {
    try {
        await AktivitetspengerController.innsendingAktivitetspengersøknad({
            body: data,
            headers: commonRequestHeader,
        });
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
