import { useState } from 'react';
import { veilederService } from '../api/services/veilederService';
import { Deltakelse } from '../api/types';
import { DeltakelseFormValues } from '../components/forms/EndreDeltakelseForm';

export const useEndreDeltakelse = (onDeltakelseEndret: (deltakelse: Deltakelse) => void) => {
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const endreDeltakelse = async (deltakelse: Deltakelse, values: DeltakelseFormValues) => {
        setError(undefined);
        setPending(true);
        if (deltakelse) {
            await veilederService
                .updateDeltakelse({
                    id: deltakelse.id,
                    deltakerIdent: deltakelse.deltakerIdent,
                    fraOgMed: values.fom,
                    tilOgMed: values.tom,
                    harSøkt: deltakelse.harSøkt,
                })
                .catch((e) => {
                    setError(e.message);
                })
                .then((r) => {
                    if (r) {
                        onDeltakelseEndret(r);
                    }
                    setPending(false);
                });
        }
    };

    return {
        pending,
        error,
        endreDeltakelse,
    };
};
