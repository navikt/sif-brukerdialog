import { IngenTilgangÅrsak } from '@app/types';
import { AxiosError } from 'axios';

vi.hoisted(() => {
    const appSettings = new Proxy({}, { get: () => 'test' });
    (globalThis as any).appSettings = appSettings;
    if (typeof window !== 'undefined') {
        (window as any).appSettings = appSettings;
    }
});

vi.mock('@sif/apm', () => ({
    appLogger: { logInfo: vi.fn(), logException: vi.fn(), logApiError: vi.fn() },
}));

vi.mock('../../api', () => ({
    default: { k9SakInnsyn: { get: vi.fn() } },
}));

import { appLogger } from '@sif/apm';

import api from '../../api';
import { IngenTilgangError } from '../initialDataError';
import { hentBackendTilgang, loggAvvik, verifiserTilgangMotBackend } from '../verifiserTilgangMotBackend';

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('verifiserTilgangMotBackend', () => {
    beforeEach(() => vi.clearAllMocks());

    it('feil fra backend gir undefined, ikke en reject', async () => {
        vi.mocked(api.k9SakInnsyn.get).mockRejectedValue(new AxiosError('feil'));
        expect(await hentBackendTilgang()).toBeUndefined();
    });

    it('venter ikke på backend og returnerer frontend-resultatet uendret', async () => {
        const backendSomAldriSvarer = new Promise<undefined>(() => {});
        await expect(verifiserTilgangMotBackend(Promise.resolve('ok'), backendSomAldriSvarer)).resolves.toBe('ok');
    });

    it('logger avvik når frontend avslår og backend gir tilgang', async () => {
        const error = new IngenTilgangError([IngenTilgangÅrsak.harIngenSak]);
        const backend = Promise.resolve({ kanBruke: true, årsaker: [] });
        await expect(verifiserTilgangMotBackend(Promise.reject(error), backend)).rejects.toBe(error);
        await flushPromises();
        expect(appLogger.logInfo).toHaveBeenCalledWith(
            'tilgangVerifisering.avvik frontend(kanBruke=false årsaker=[harIngenSak]) backend(kanBruke=true årsaker=[])',
        );
    });

    it('logger ikke når resultatene er like, uavhengig av rekkefølge på årsaker', () => {
        loggAvvik({ kanBruke: false, årsaker: ['a', 'b'] }, { kanBruke: false, årsaker: ['b', 'a'] });
        expect(appLogger.logInfo).not.toHaveBeenCalled();
    });
});
