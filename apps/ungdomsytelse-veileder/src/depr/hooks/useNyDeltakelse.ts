import { useState } from 'react';
import { veilederService } from '../../api/services/veilederService';
import { Deltakelse, Deltaker } from '../../api/types';
import { DeltakelseFormValues } from '../../forms/ny-deltakelse-form/NyDeltakelseForm';

export const useNyDeltakelse = (deltaker: Deltaker, onDeltakelseOpprettet: (deltakelse: Deltakelse) => void) => {
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const opprettDeltakelse = async (values: DeltakelseFormValues) => {
        setError(undefined);
        setPending(true);

        await veilederService
            .meldInnDeltaker({
                deltakerIdent: deltaker.deltakerIdent,
                startdato: values.fom,
            })
            .catch((e) => {
                setError(e.message);
            })
            .then((r) => {
                if (r) {
                    onDeltakelseOpprettet(r);
                }
                setPending(false);
            });
    };

    return {
        pending,
        error,
        opprettDeltakelse,
    };
};
