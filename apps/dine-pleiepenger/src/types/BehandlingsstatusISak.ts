import { BehandlingStatus, Venteårsak } from '.';

export interface BehandlingsstatusISak {
    status: BehandlingStatus;
    venteårsak?: Venteårsak;
}
