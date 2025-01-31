import { useState } from 'react';
import { InntektsrapporteringDTO } from '../../../api/types';
import { k9BrukerdialogService } from '../../../api/services/k9BrukerdialogService';

export const useRapporterInntekt = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inntektSendt, setInntektSendt] = useState(false);

    const rapporterInntekt = (apiData: InntektsrapporteringDTO) => {
        setPending(true);
        return k9BrukerdialogService
            .rapporterInntekt(apiData)
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
