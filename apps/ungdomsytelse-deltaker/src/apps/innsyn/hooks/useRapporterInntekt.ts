import { useState } from 'react';
import { deltakerService } from '../../../api/services/deltakerService';
import { InntektsrapporteringDTO } from '../../../api/types';

export const useRapporterInntekt = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inntektSendt, setInntektSendt] = useState(false);

    const rapporterInntekt = (deltakelseId: string, apiData: InntektsrapporteringDTO) => {
        setPending(true);
        return deltakerService
            .rapporterInntekt(deltakelseId, apiData)
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
