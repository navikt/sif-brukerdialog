import { deltakerApiService } from '@navikt/ung-common';
import { RapporterInntektDTO } from '@navikt/ung-common/src/types/dto/RapporterinntektDTO';
import { useState } from 'react';

export const useRapporterInntekt = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inntektSendt, setInntektSendt] = useState(false);

    const rapporterInntekt = (inntekt: RapporterInntektDTO) => {
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
