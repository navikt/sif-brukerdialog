import { useState } from 'react';
import { Deltakelse } from '../../api/types';
import { DeltakelseFormValues } from '../components/forms/old/EndreDeltakelseForm';
import { veilederService } from '../../api/services/veilederService';

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
