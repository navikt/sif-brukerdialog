import { SøknadApiData } from '@app/types/SoknadApiData';
import { commonRequestHeaders, handleApiError } from '@sif/api';
import { isProd } from '@sif/env';
import { aktivitetspenger } from '@sif/k9-brukerdialog-prosessering-api';

export const sendSøknad = async (data: SøknadApiData): Promise<void> => {
    // Startdato brukes i dev/test, så denne fjernes i produksjon
    const body: aktivitetspenger.Aktivitetspengersøknad = {
        ...data,
        ...(isProd() ? { startdato: undefined } : {}),
    } as aktivitetspenger.Aktivitetspengersøknad;

    try {
        await aktivitetspenger.AktivitetspengerController.innsendingAktivitetspengersøknad({
            body,
            headers: commonRequestHeaders,
        });
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
