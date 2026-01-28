import { ISODateToDate } from '@navikt/sif-common-utils';

import { Behandling, BehandlingStatus, SøknadISak } from '../../types';
import { Innsendelsestype } from '../../types/Innsendelsestype';
import { harBehandlingSøknadEllerEndringsmelding, sortBehandlingerNyesteFørst } from '../sakUtils';

const behandling1: Behandling = {
    status: BehandlingStatus.UNDER_BEHANDLING,
    innsendelser: [] as any,
    opprettetTidspunkt: ISODateToDate('2020-01-01'),
    avsluttetTidspunkt: undefined,
    aksjonspunkter: [],
};
const behandling2: Behandling = {
    status: BehandlingStatus.UNDER_BEHANDLING,
    innsendelser: [] as any,
    opprettetTidspunkt: ISODateToDate('2020-01-03'),
    aksjonspunkter: [],
    avsluttetTidspunkt: undefined,
};
const behandling3: Behandling = {
    status: BehandlingStatus.UNDER_BEHANDLING,
    innsendelser: [] as any,
    opprettetTidspunkt: ISODateToDate('2020-01-02'),
    aksjonspunkter: [],
    avsluttetTidspunkt: undefined,
};

const innsendtSøknad: SøknadISak = {
    innsendelsestype: Innsendelsestype.SØKNAD,
    mottattTidspunkt: '2020-01-01T10:00:00Z',
} as any;

const innsendtEndringsmelding: SøknadISak = {
    innsendelsestype: Innsendelsestype.ENDRINGSMELDING,
    mottattTidspunkt: '2020-01-01T10:00:00Z',
} as any;

const innsendtEttersendelse: SøknadISak = {
    innsendelsestype: Innsendelsestype.ETTERSENDELSE,
    mottattTidspunkt: '2020-01-01T10:00:00Z',
} as any;

describe('sakUtils', () => {
    describe('sortBehandlinger', () => {
        it('sorterer behandlinger på sak riktig', () => {
            const sorterteBehandlinger = sortBehandlingerNyesteFørst([behandling1, behandling2, behandling3]);
            expect(sorterteBehandlinger).toEqual([behandling2, behandling3, behandling1]);
        });
    });

    describe('harBehandlingSøknadEllerEndringsmelding', () => {
        it('returnerer true hvis behandling har kun søknad', () => {
            const medSøknad: Behandling = { ...behandling1, innsendelser: [innsendtSøknad] };
            expect(harBehandlingSøknadEllerEndringsmelding(medSøknad)).toBeTruthy();
        });
        it('returnerer true hvis behandling har kun endringsmelding', () => {
            const medSøknad: Behandling = { ...behandling1, innsendelser: [innsendtEndringsmelding] };
            expect(harBehandlingSøknadEllerEndringsmelding(medSøknad)).toBeTruthy();
        });
        it('returnerer false hvis behandling har kun ettersendelse', () => {
            const medSøknad: Behandling = { ...behandling1, innsendelser: [innsendtEttersendelse] };
            expect(harBehandlingSøknadEllerEndringsmelding(medSøknad)).toBeFalsy();
        });
        it('returnerer true hvis behandling har søknad + ettersendelse', () => {
            const medSøknad: Behandling = { ...behandling1, innsendelser: [innsendtSøknad, innsendtEttersendelse] };
            expect(harBehandlingSøknadEllerEndringsmelding(medSøknad)).toBeTruthy();
        });
        it('returnerer true hvis behandling har endringsmelding + ettersendelse', () => {
            const medSøknad: Behandling = { ...behandling1, innsendelser: [innsendtSøknad, innsendtEndringsmelding] };
            expect(harBehandlingSøknadEllerEndringsmelding(medSøknad)).toBeTruthy();
        });
    });
});
