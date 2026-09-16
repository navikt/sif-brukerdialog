import { IngenTilgangÅrsak, RequestStatus } from '@app/types';
import { Søker } from '@navikt/sif-common-api';
import { AxiosError } from 'axios';

import { IngenTilgangError, isSøknadInitialDataErrorState, mapInitialDataError } from '../initialDataError';

const søker = { fornavn: 'Ola', etternavn: 'Nordmann', fødselsnummer: '12345678901' } as unknown as Søker;

const httpError = (status: number) =>
    new AxiosError('feil', 'ERR_BAD_RESPONSE', {} as any, {}, { status, data: {} } as any);

describe('isSøknadInitialDataErrorState', () => {
    it('kjenner igjen en tilstand fra appen', () => {
        expect(isSøknadInitialDataErrorState({ status: RequestStatus.forbidden })).toBe(true);
    });

    /** En AxiosError har en numerisk status som ikke må forveksles med RequestStatus. */
    it('godtar ikke http-status som RequestStatus', () => {
        expect(isSøknadInitialDataErrorState(httpError(403))).toBe(false);
        expect(isSøknadInitialDataErrorState({ status: 403 })).toBe(false);
    });

    it('godtar ikke ukjente statusverdier, null eller primitiver', () => {
        expect(isSøknadInitialDataErrorState({ status: 'noe helt annet' })).toBe(false);
        expect(isSøknadInitialDataErrorState(null)).toBe(false);
        expect(isSøknadInitialDataErrorState('forbidden')).toBe(false);
    });
});

describe('mapInitialDataError', () => {
    it('mapper IngenTilgangError til success med kanBrukeSøknad false', () => {
        const error = new IngenTilgangError([IngenTilgangÅrsak.harMerEnnEnSak], { erArbeidstaker: true });

        expect(mapInitialDataError(error, søker)).toEqual({
            status: RequestStatus.success,
            kanBrukeSøknad: false,
            årsak: [IngenTilgangÅrsak.harMerEnnEnSak],
            ingenTilgangMeta: { erArbeidstaker: true },
            søker,
        });
    });

    it('mapper 401 til redirectingToLogin', () => {
        expect(mapInitialDataError(httpError(401), søker)).toEqual({ status: RequestStatus.redirectingToLogin });
    });

    it.each([403, 451])('mapper %i til forbidden', (status) => {
        expect(mapInitialDataError(httpError(status), søker)).toEqual({ status: RequestStatus.forbidden });
    });

    it('mapper ukjent http-status til error', () => {
        expect(mapInitialDataError(httpError(500), søker)).toMatchObject({ status: RequestStatus.error });
    });

    it('mapper feil som ikke er http-feil til error', () => {
        const error = new TypeError('uventet');
        expect(mapInitialDataError(error, søker)).toEqual({ status: RequestStatus.error, error });
    });

    it('beriker en allerede mappet tilstand med søker', () => {
        expect(mapInitialDataError({ status: RequestStatus.forbidden }, søker)).toEqual({
            status: RequestStatus.forbidden,
            søker,
        });
    });

    it('lar en allerede mappet tilstand stå urørt når søker mangler', () => {
        expect(mapInitialDataError({ status: RequestStatus.forbidden })).toEqual({
            status: RequestStatus.forbidden,
        });
    });
});
