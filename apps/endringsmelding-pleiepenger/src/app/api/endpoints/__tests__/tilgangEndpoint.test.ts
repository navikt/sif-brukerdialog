import { IngenTilgangÅrsak } from '@app/types';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { AxiosError } from 'axios';

vi.mock('@sif/apm', () => ({
    appLogger: { logInfo: vi.fn(), logException: vi.fn(), logApiError: vi.fn() },
}));

vi.mock('../../api', () => ({
    default: { k9SakInnsyn: { get: vi.fn() } },
}));

import { appLogger } from '@sif/apm';

import api from '../../api';
import { tilgangEndpoint } from '../tilgangEndpoint';

const svar = (data: unknown) => vi.mocked(api.k9SakInnsyn.get).mockResolvedValue({ data } as any);

describe('tilgangEndpoint.fetch', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('gir endringsperioden som datoer når bruker har tilgang', async () => {
        svar({ kanBruke: true, årsaker: [], tillattEndringsperiode: { fom: '2022-10-01', tom: '2024-01-31' } });
        await expect(tilgangEndpoint.fetch()).resolves.toEqual({
            kanBruke: true,
            tillattEndringsperiode: { from: ISODateToDate('2022-10-01'), to: ISODateToDate('2024-01-31') },
        });
    });

    it('beholder kjente årsaker og gjør ukjente om til ukjent, som logges', async () => {
        svar({ kanBruke: false, årsaker: ['harIngenSak', 'nyÅrsakFraBackend'] });
        await expect(tilgangEndpoint.fetch()).resolves.toEqual({
            kanBruke: false,
            årsaker: [IngenTilgangÅrsak.harIngenSak, IngenTilgangÅrsak.ukjent],
        });
        expect(appLogger.logInfo).toHaveBeenCalledWith('tilgangEndpoint.ukjentÅrsak: nyÅrsakFraBackend');
    });

    it('feiler når backend gir tilgang uten endringsperiode', async () => {
        svar({ kanBruke: true, årsaker: [], tillattEndringsperiode: null });
        await expect(tilgangEndpoint.fetch()).rejects.toThrow('tillattEndringsperiode mangler');
        expect(appLogger.logException).toHaveBeenCalled();
    });

    it('logger og videreformidler http-feil', async () => {
        const error = new AxiosError('feil', 'ERR_BAD_RESPONSE', {} as any, {}, { status: 500 } as any);
        vi.mocked(api.k9SakInnsyn.get).mockRejectedValue(error);
        await expect(tilgangEndpoint.fetch()).rejects.toBe(error);
        expect(appLogger.logApiError).toHaveBeenCalledWith(error, 'tilgangEndpoint.fetch');
    });
});
