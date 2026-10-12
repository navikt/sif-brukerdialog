import { SøknadApiData } from '@app/types/SoknadApiData';
import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { isProd } from '@navikt/sif-common-env';
import { commonRequestHeader, handleApiError } from '@sif/api';

export const sendSøknad = async (data: SøknadApiData): Promise<void> => {
    // Stardato brukes i test, så denne fjernes i produksjon
    const body: aktivitetspenger.Aktivitetspengersøknad = {
        ...data,
        ...(isProd() ? { startdato: undefined } : {}),
    } as aktivitetspenger.Aktivitetspengersøknad;

    try {
        await aktivitetspenger.AktivitetspengerController.innsendingAktivitetspengersøknad({
            body,
            headers: commonRequestHeader,
        });
    } catch (e) {
        throw handleApiError(e, 'sendSøknad');
    }
};
