import { useState } from 'react';
import { veilederService } from '../../api/services/veilederService';
import { Deltakelse } from '../../api/types';
import { EndreSluttdatoFormValues } from '../../forms/endre-sluttdato/EndreSluttdato';

export const useEndreDeltakelse = (onDeltakelseEndret: (deltakelse: Deltakelse) => void) => {
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const endreDeltakelse = async (deltakelse: Deltakelse, values: EndreSluttdatoFormValues) => {
        setError(undefined);
        setPending(true);
        if (deltakelse) {
            await veilederService
                .updateDeltakelse({
                    id: deltakelse.id,
                    deltakerIdent: deltakelse.deltaker.deltakerIdent,
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

    const endreStartdato = async (deltakelse: Deltakelse, startdato: Date) => {
        setError(undefined);
        setPending(true);
        if (deltakelse) {
            await veilederService
                .endreStartdato(deltakelse.id, startdato)
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
    const endreSluttdato = async (deltakelse: Deltakelse, sluttdato: Date) => {
        setError(undefined);
        setPending(true);
        if (deltakelse) {
            await veilederService
                .endreSluttdato(deltakelse.id, sluttdato)
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
        endreStartdato,
        endreSluttdato,
    };
};
