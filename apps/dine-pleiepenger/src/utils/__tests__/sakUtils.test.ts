import { ISODateToDate } from '@navikt/sif-common-utils';
import { Behandling } from '../../server/api-models/BehandlingSchema';
import { Behandlingsstatus } from '../../server/api-models/Behandlingsstatus';
import { getSisteBehandlingISak, sortBehandlingerNyesteFørst } from '../sakUtils';
import { Sak } from '../../server/api-models/SakSchema';

const behandling1: Behandling = {
    status: Behandlingsstatus.UNDER_BEHANDLING,
    søknader: [] as any,
    opprettetTidspunkt: ISODateToDate('2020-01-01'),
    aksjonspunkter: [],
    avsluttetTidspunkt: null,
};
const behandling2: Behandling = {
    status: Behandlingsstatus.UNDER_BEHANDLING,
    søknader: [] as any,
    opprettetTidspunkt: ISODateToDate('2020-01-03'),
    aksjonspunkter: [],
    avsluttetTidspunkt: null,
};
const behandling3: Behandling = {
    status: Behandlingsstatus.UNDER_BEHANDLING,
    søknader: [] as any,
    opprettetTidspunkt: ISODateToDate('2020-01-02'),
    aksjonspunkter: [],
    avsluttetTidspunkt: null,
};

describe('sakUtils', () => {
    describe('sortBehandlinger', () => {
        it('sorterer behandlinger på sak riktig', () => {
            const sorterteBehandlinger = sortBehandlingerNyesteFørst([behandling1, behandling2, behandling3]);
            expect(sorterteBehandlinger).toEqual([behandling2, behandling3, behandling1]);
        });
    });

    describe('getSisteBehandlingISak', () => {
        it('returnerer siste behandling i sak', () => {
            const sak: Sak = {
                saksnummer: '123',
                behandlinger: [behandling1, behandling2, behandling3],
            };
            const sisteBehandling = getSisteBehandlingISak(sak);
            expect(sisteBehandling).toEqual(behandling2);
        });
    });
});
