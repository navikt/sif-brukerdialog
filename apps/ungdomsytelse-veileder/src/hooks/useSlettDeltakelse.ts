import { useState } from 'react';
import { veilederService } from '../api/services/veilederService';
import { Deltakelse } from '../api/types';

export const useSlettDeltakelse = (onDeltakelseSlettet: (deltakelse: Deltakelse) => void) => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string>();

    const slettDeltakelse = async (deltakelse: Deltakelse) => {
        setPending(true);
        veilederService
            .deleteDeltakelse(deltakelse.id)
            .catch((e) => {
                setError(e.message);
            })
            .finally(() => {
                onDeltakelseSlettet(deltakelse);
            });
    };

    return {
        pending,
        error,
        slettDeltakelse,
    };
};
