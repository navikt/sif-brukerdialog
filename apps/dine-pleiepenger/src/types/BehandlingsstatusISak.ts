import { Behandlingsstatus } from '../server/api-models/Behandlingsstatus';
import { Venteårsak } from './Venteårsak';

export interface BehandlingsstatusISak {
    status: Behandlingsstatus;
    venteårsak?: Venteårsak;
}
