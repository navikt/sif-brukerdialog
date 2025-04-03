import { useState } from 'react';
import { UngdomsytelseInntektsrapportering } from '@navikt/k9-brukerdialog-prosessering-api';
import { deltakerApiService } from '../../../api/deltakerApiService';

export const useRapporterInntekt = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inntektSendt, setInntektSendt] = useState(false);

    const rapporterInntekt = async (inntekt: UngdomsytelseInntektsrapportering) => {
        setPending(true);
        return deltakerApiService
            .rapporterInntekt(inntekt)
            .then(() => {
                setInntektSendt(true);
            })
            .catch((error) => {
                setError('Rapporter inntekt feilet');
                console.error(error);
            })
            .finally(() => {
                setPending(false);
            });
    };
    return { rapporterInntekt, inntektSendt, pending, error };
};
