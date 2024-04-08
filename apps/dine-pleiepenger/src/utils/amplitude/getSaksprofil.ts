import { Behandlingsstatus } from '../../server/api-models/Behandlingsstatus';
import { Sak } from '../../server/api-models/SakSchema';
import { Venteårsak } from '../../types/Venteårsak';
import { erSaksbehandlingsfristPassert, getBehandlingsstatusISak } from '../sakUtils';

type Saksprofil = {
    antallSaker: number;
    antallBehandlinger: number;
    harSaksbehandlingsfrist: boolean;
    harPassertSaksbehandlingsfrist: boolean;
    status?: Behandlingsstatus;
    venteårsak: Venteårsak | undefined;
};

export const getSaksprofil = (sak: Sak, antallSaker: number): Saksprofil => {
    const statusISak = getBehandlingsstatusISak(sak);
    return {
        status: statusISak?.status,
        venteårsak: statusISak?.venteårsak,
        harSaksbehandlingsfrist: !!sak.saksbehandlingsFrist,
        harPassertSaksbehandlingsfrist:
            !!sak.saksbehandlingsFrist && erSaksbehandlingsfristPassert(sak.saksbehandlingsFrist),
        antallSaker,
        antallBehandlinger: sak.behandlinger.length,
    };
};
