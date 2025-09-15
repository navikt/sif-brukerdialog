import { useEffectOnce } from '@navikt/sif-common-hooks';

import { Oppgave } from '../../../types/Oppgave';
import { useMarkerOppgaveSomÅpnet } from './api/useMarkerOppgaveSomÅpnet';

export const useRegistrerOppgaveSomÅpnet = (oppgave?: Oppgave) => {
    const { mutateAsync } = useMarkerOppgaveSomÅpnet();
    useEffectOnce(async () => {
        if (!oppgave) {
            return;
        }
        if (oppgave.åpnetDato === undefined) {
            await mutateAsync(oppgave.oppgaveReferanse);
        }
    });
};
