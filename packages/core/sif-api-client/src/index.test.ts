import axios, { AxiosError, type AxiosResponse } from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { commonRequestHeaders, initApiClient, normalizeResponseData } from './index';

const responseError = (status: number) =>
    new AxiosError(
        'Request failed',
        undefined,
        undefined,
        undefined,
        {
            status,
        } as AxiosResponse,
    );

describe('normalizeResponseData', () => {
    it('normaliserer null i vanlige objekter', () => {
        expect(normalizeResponseData({ verdi: null, nestet: { verdi: null } })).toEqual({
            verdi: undefined,
            nestet: { verdi: undefined },
        });
    });

    it('bevarer Blob', () => {
        const blob = new Blob(['innhold']);

        expect(normalizeResponseData(blob)).toBe(blob);
    });
});

describe('commonRequestHeaders', () => {
    it('inneholder påkrevd git SHA-header', () => {
        expect(commonRequestHeaders['X-Brukerdialog-Git-Sha']).toBe('overskrives-av-server');
    });
});

describe('initApiClient', () => {
    afterEach(() => vi.unstubAllGlobals());

    it('setter ikke Content-Type som instansstandard', () => {
        const setConfig = vi.fn();

        initApiClient(
            {
                instance: axios.create(),
                setConfig,
            },
            {
                frontendPath: '/api',
                loginURL: '/login',
            },
        );

        expect(setConfig).toHaveBeenCalledWith({
            baseURL: '/api',
            headers: {
                'X-Brukerdialog-Git-Sha': 'overskrives-av-server',
            },
            withCredentials: false,
        });
    });

    it('kaller callback og omdirigerer ved 401', async () => {
        const onUnauthorized = vi.fn();
        const assign = vi.fn();
        const instance = axios.create();
        const responseUse = vi.spyOn(instance.interceptors.response, 'use');
        vi.stubGlobal('window', { location: { assign, href: '/app' } });

        initApiClient(
            {
                instance,
                setConfig: vi.fn(),
            },
            {
                frontendPath: '/api',
                loginURL: '/login',
                onUnauthorized,
            },
        );

        const onRejected = responseUse.mock.calls[0]?.[1];
        expect(onRejected).toBeDefined();
        await expect(onRejected?.(responseError(401))).rejects.toThrow('Request failed');

        expect(onUnauthorized).toHaveBeenCalledOnce();
        expect(assign).toHaveBeenCalledWith('/login');
    });

    it('bruker tilpasset 401-regel uten omdirigering', async () => {
        const onUnauthorized = vi.fn();
        const assign = vi.fn();
        const isUnauthorized = vi.fn(() => true);
        const instance = axios.create();
        const responseUse = vi.spyOn(instance.interceptors.response, 'use');
        vi.stubGlobal('window', { location: { assign, href: '/app' } });

        initApiClient(
            {
                instance,
                setConfig: vi.fn(),
            },
            {
                frontendPath: '/api',
                loginURL: '/login',
                onUnauthorized,
                isUnauthorized,
                redirectOnUnauthorized: false,
            },
        );

        const onRejected = responseUse.mock.calls[0]?.[1];
        expect(onRejected).toBeDefined();
        await expect(onRejected?.(responseError(403))).rejects.toThrow('Request failed');

        expect(isUnauthorized).toHaveBeenCalledOnce();
        expect(onUnauthorized).toHaveBeenCalledOnce();
        expect(assign).not.toHaveBeenCalled();
    });
});
