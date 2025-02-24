import { useState } from 'react';
import { deltakerService, RapporterInntektDTO } from '@navikt/ung-common';

export const useRapporterInntekt = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inntektSendt, setInntektSendt] = useState(false);

    const rapporterInntekt = (inntekt: RapporterInntektDTO) => {
        setPending(true);
        return deltakerService
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
