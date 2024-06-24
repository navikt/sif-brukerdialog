import { Behandlingsstatus } from '../../server/api-models/Behandlingsstatus';
import { Sak } from '../../server/api-models/SakSchema';
import { Venteårsak } from '../../types/Venteårsak';
import { erSaksbehandlingsfristPassert, getBehandlingsstatusISak } from '../sakUtils';

type Saksprofil = {
    profilVersjon: '1.0';
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
        profilVersjon: '1.0',
        status: statusISak?.status,
        venteårsak: statusISak?.venteårsak,
        harSaksbehandlingsfrist: !!sak.utledetStatus.saksbehandlingsFrist,
        harPassertSaksbehandlingsfrist:
            !!sak.utledetStatus.saksbehandlingsFrist &&
            erSaksbehandlingsfristPassert(sak.utledetStatus.saksbehandlingsFrist),
        antallSaker,
        antallBehandlinger: sak.behandlinger.length,
    };
};
