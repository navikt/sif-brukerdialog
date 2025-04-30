import { useState } from 'react';
import { Ungdomsytelsesøknad } from '@navikt/k9-brukerdialog-prosessering-api';
import { ApiError } from '@navikt/ung-common';
import { deltakerApiService } from '../../../api/deltakerApiService';
import { markerDeltakelseSomSøkt } from '../../../api/deltakelse/markerDeltakelseSomSøkt';

export const useSendSøknad = (deltakelseId: string) => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<ApiError | undefined>();
    const [søknadSendt, setSøknadSendt] = useState(false);

    const sendSøknad = async (søknad: Ungdomsytelsesøknad) => {
        setError(undefined);
        setPending(true);
        try {
            await deltakerApiService.sendSøknad(søknad);

            try {
                await markerDeltakelseSomSøkt(deltakelseId);
            } catch {
                /** Ignorer hvis denne feiler - settes av ung-sak til slutt */
            }
            setSøknadSendt(true);
        } catch (e) {
            setError(e);
            throw e;
        } finally {
            setPending(false);
        }
    };
    return { sendSøknad, søknadSendt, pending, error };
};
