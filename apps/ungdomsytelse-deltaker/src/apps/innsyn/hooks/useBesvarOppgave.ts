import { useState } from 'react';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { deltakerApiService } from '../../../api/deltakerApiService';

export const useBesvarOppgave = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [besvart, setBesvart] = useState(false);

    const sendSvar = (svar: UngdomsytelseOppgavebekreftelse) => {
        setPending(true);
        return deltakerApiService
            .sendOppgavebekreftelse(svar)
            .then(() => {
                setBesvart(true);
            })
            .catch((error) => {
                setError('Besvar endret oppgave feiler');
                console.log(error);
            })
            .finally(() => {
                setPending(false);
            });
    };
    return { sendSvar, besvart, pending, error };
};
