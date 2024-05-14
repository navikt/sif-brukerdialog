import { ISODateToDate } from '@navikt/sif-common-utils';
import { Behandling } from '../../server/api-models/BehandlingSchema';
import { Behandlingsstatus } from '../../server/api-models/Behandlingsstatus';
import { getSisteBehandlingISak, sortBehandlingerNyesteFørst, sortSøknadshendelse } from '../sakUtils';
import { Sak } from '../../server/api-models/SakSchema';
import { Søknadshendelse, SøknadshendelseType } from '../../types/Søknadshendelse';
import { Innsendelsestype } from '../../server/api-models/Innsendelsestype';

const behandling1: Behandling = {
    status: Behandlingsstatus.UNDER_BEHANDLING,
    innsendelser: [] as any,
    opprettetTidspunkt: ISODateToDate('2020-01-01'),
    aksjonspunkter: [],
    avsluttetTidspunkt: null,
};
const behandling2: Behandling = {
    status: Behandlingsstatus.UNDER_BEHANDLING,
    innsendelser: [] as any,
    opprettetTidspunkt: ISODateToDate('2020-01-03'),
    aksjonspunkter: [],
    avsluttetTidspunkt: null,
};
const behandling3: Behandling = {
    status: Behandlingsstatus.UNDER_BEHANDLING,
    innsendelser: [] as any,
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

    describe('sortSøknadshendelse', () => {
        const hendelse1: Søknadshendelse = {
            dato: ISODateToDate('2020-01-01'),
            type: SøknadshendelseType.FERDIG_BEHANDLET,
        };
        const hendelse2: Søknadshendelse = {
            dato: ISODateToDate('2020-01-03'),
            type: SøknadshendelseType.MOTTATT_SØKNAD,
            innsendelse: {} as any,
        };
        const hendelse3: Søknadshendelse = {
            dato: ISODateToDate('2020-01-03'),
            type: SøknadshendelseType.FERDIG_BEHANDLET,
        };

        const hendelseForventetSvar: Søknadshendelse = {
            dato: ISODateToDate('2020-01-02'),
            type: SøknadshendelseType.FORVENTET_SVAR,
            søknadstyperIBehandling: [Innsendelsestype.SØKNAD],
        };

        it('sorterer riktig på hendelser som ikke er FORVENTET_SVAR', () => {
            const result = [hendelse1, hendelse2, hendelse3].sort(sortSøknadshendelse);
            expect(result).toEqual([hendelse1, hendelse3, hendelse2]);
        });
        it('sorterer alltid FORVENTET_SVAR sist', () => {
            const result = [hendelseForventetSvar, hendelse1, hendelse2, hendelse3].sort(sortSøknadshendelse);
            expect(result).toEqual([hendelse1, hendelse3, hendelse2, hendelseForventetSvar]);
        });
    });
});
