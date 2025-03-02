import { useState } from 'react';
import { Deltakelse } from '../api/types';
import { veilederService } from '@navikt/ung-common';

export const useSlettDeltakelse = (onDeltakelseSlettet: (deltakelse: Deltakelse) => void) => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string>();

    const slettDeltakelse = async (deltakelse: Deltakelse) => {
        setPending(true);
        veilederService
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
