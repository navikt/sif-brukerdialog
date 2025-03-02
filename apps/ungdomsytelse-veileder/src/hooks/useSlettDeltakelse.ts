import { useState } from 'react';
import { Deltakelse } from '../api/types';
import { localVeilederService } from '../api/services/localVeilederService';

export const useSlettDeltakelse = (onDeltakelseSlettet: (deltakelse: Deltakelse) => void) => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string>();

    const slettDeltakelse = async (deltakelse: Deltakelse) => {
        setPending(true);
        localVeilederService
            .deleteDeltakelse(deltakelse.id)
            .catch((e) => {
                setPending(false);
                setError(e.message);
            })
            .finally(() => {
                setPending(false);
                onDeltakelseSlettet(deltakelse);
            });
    };

    return {
        pending,
        error,
        slettDeltakelse,
    };
};
