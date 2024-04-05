import { Behandlingsstatus } from '../../server/api-models/Behandlingsstatus';
import { Sak } from '../../server/api-models/SakSchema';
import { Venteårsak } from '../../types/Venteårsak';
import { erSaksbehandlingsfristPassert, getBehandlingsstatusISak } from '../sakUtils';

type Saksprofil = {
    status?: Behandlingsstatus;
    venteårsak: Venteårsak | undefined;
    harSaksbehandlingsfrist: boolean;
    harPassertSaksbehandlingsfrist: boolean;
    harBehandlinger: boolean;
    antallSaker: number;
};

export const getSaksprofil = (sak: Sak, antallSaker: number): Saksprofil => {
    const statusISak = getBehandlingsstatusISak(sak);
    return {
        status: statusISak?.status,
        venteårsak: statusISak?.venteårsak,
        harSaksbehandlingsfrist: !!sak.saksbehandlingsFrist,
        harPassertSaksbehandlingsfrist:
            !!sak.saksbehandlingsFrist && erSaksbehandlingsfristPassert(sak.saksbehandlingsFrist),
        harBehandlinger: sak.behandlinger.length > 0,
        antallSaker,
    };
};
