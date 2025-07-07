import { useMutation } from '@tanstack/react-query';
import { FeltValideringController } from '@navikt/k9-brukerdialog-prosessering-api';
import type { Friteksfelt } from '../types/validerFritekst';

export const useValiderFritekst = () => {
    return useMutation({
        mutationFn: async (friteksfelt: Friteksfelt) => {
            const response = await FeltValideringController.validerFriteksfelt({
                body: friteksfelt,
            });
            return response.data;
        },
    });
};
