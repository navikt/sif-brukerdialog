import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { handleApiError } from '@navikt/sif-common-query';

const commonRequestHeader = {
    'Content-type': 'application/json; charset=utf-8',
    'X-Brukerdialog-Git-Sha': 'overskrives-av-server',
} as any;

export const sendSøknad = async (data: aktivitetspenger.Aktivitetspengersøknad): Promise<any> => {
    try {
        await aktivitetspenger.AktivitetspengerController.innsendingAktivitetspengersøknad({
            body: data,
            headers: commonRequestHeader,
        });
        await Promise.resolve();
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
