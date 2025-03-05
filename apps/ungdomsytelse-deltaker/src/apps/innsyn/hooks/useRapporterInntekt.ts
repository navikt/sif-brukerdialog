import { UngdomsytelseInntektsrapportering } from '@navikt/k9-brukerdialog-prosessering-api';
import { deltakerApiService } from '@navikt/ung-common';
import { useState } from 'react';

export const useRapporterInntekt = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inntektSendt, setInntektSendt] = useState(false);

    const rapporterInntekt = (inntekt: UngdomsytelseInntektsrapportering) => {
        setPending(true);
        return deltakerApiService
            .rapporterInntekt(inntekt)
            .then(() => {
                setInntektSendt(true);
            })
            .catch((error) => {
                setError('Rapporter inntekt feilet');
                console.log(error);
            })
            .finally(() => {
                setPending(false);
            });
    };
    return { rapporterInntekt, inntektSendt, pending, error };
};
