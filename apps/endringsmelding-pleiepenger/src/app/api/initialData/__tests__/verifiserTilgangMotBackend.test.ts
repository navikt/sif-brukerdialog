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
    default: { psb: { get: vi.fn() } },
}));

import { appLogger } from '@sif/apm';

import api from '../../api';
import { IngenTilgangError } from '../initialDataError';
import { hentBackendTilgang, loggAvvik, verifiserTilgangMotBackend } from '../verifiserTilgangMotBackend';

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('hentBackendTilgang', () => {
    beforeEach(() => vi.clearAllMocks());

    it('returnerer resultatet fra backend', async () => {
        vi.mocked(api.psb.get).mockResolvedValue({ data: { kanBruke: true, årsaker: [] } } as any);
        expect(await hentBackendTilgang()).toEqual({ kanBruke: true, årsaker: [] });
    });

    it('returnerer undefined og logger ved http-feil', async () => {
        const error = new AxiosError('feil', 'ERR_BAD_RESPONSE', {} as any, {}, { status: 500 } as any);
        vi.mocked(api.psb.get).mockRejectedValue(error);
        expect(await hentBackendTilgang()).toBeUndefined();
        expect(appLogger.logApiError).toHaveBeenCalledWith(error, 'tilgangVerifisering.hentBackendTilgang');
    });

    it('returnerer undefined ved ugyldig respons', async () => {
        vi.mocked(api.psb.get).mockResolvedValue({ data: null } as any);
        expect(await hentBackendTilgang()).toBeUndefined();
        expect(appLogger.logInfo).toHaveBeenCalledWith('tilgangVerifisering.ugyldigRespons');
    });
});

describe('loggAvvik', () => {
    beforeEach(() => vi.clearAllMocks());

    it('logger ikke når resultatene er like, uavhengig av rekkefølge på årsaker', () => {
        loggAvvik({ kanBruke: false, årsaker: ['a', 'b'] }, { kanBruke: false, årsaker: ['b', 'a'] });
        expect(appLogger.logInfo).not.toHaveBeenCalled();
    });

    it('logger ikke når backend-resultat mangler', () => {
        loggAvvik({ kanBruke: true, årsaker: [] }, undefined);
        expect(appLogger.logInfo).not.toHaveBeenCalled();
    });

    it('logger avvik med begge resultatene', () => {
        loggAvvik({ kanBruke: true, årsaker: [] }, { kanBruke: false, årsaker: ['harIngenSak'] });
        expect(appLogger.logInfo).toHaveBeenCalledWith(
            'tilgangVerifisering.avvik frontend(kanBruke=true årsaker=[]) backend(kanBruke=false årsaker=[harIngenSak])',
        );
    });
});

describe('verifiserTilgangMotBackend', () => {
    beforeEach(() => vi.clearAllMocks());

    it('returnerer frontend-resultatet og logger avvik når frontend gir tilgang', async () => {
        const backend = Promise.resolve({ kanBruke: false, årsaker: ['harIngenSak'] });
        await expect(verifiserTilgangMotBackend(Promise.resolve('ok'), backend)).resolves.toBe('ok');
        await flushPromises();
        expect(appLogger.logInfo).toHaveBeenCalledTimes(1);
    });

    it('videreformidler IngenTilgangError og sammenligner årsaker', async () => {
        const error = new IngenTilgangError([IngenTilgangÅrsak.harIngenSak]);
        const backend = Promise.resolve({ kanBruke: false, årsaker: ['harIngenSak'] });
        await expect(verifiserTilgangMotBackend(Promise.reject(error), backend)).rejects.toBe(error);
        await flushPromises();
        expect(appLogger.logInfo).not.toHaveBeenCalled();
    });

    it('sammenligner ikke ved tekniske feil i frontend', async () => {
        const backend = Promise.resolve({ kanBruke: true, årsaker: [] });
        const error = new Error('teknisk');
        await expect(verifiserTilgangMotBackend(Promise.reject(error), backend)).rejects.toBe(error);
        await flushPromises();
        expect(appLogger.logInfo).not.toHaveBeenCalled();
    });

    it('venter ikke på backend', async () => {
        const backend = new Promise<undefined>(() => {});
        await expect(verifiserTilgangMotBackend(Promise.resolve('ok'), backend)).resolves.toBe('ok');
    });
});
