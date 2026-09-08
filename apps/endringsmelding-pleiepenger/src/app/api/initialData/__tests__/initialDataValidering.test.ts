import { IngenTilgangÅrsak, K9Sak, UgyldigK9SakFormat } from '@app/types';
import { ISODateRangeToDateRange, ISODateToDate } from '@navikt/sif-common-utils';

vi.mock('@sif/apm', () => ({
    appLogger: { logInfo: vi.fn(), logError: vi.fn(), logException: vi.fn(), logApiError: vi.fn() },
}));

/** Har egne tester i utils/__tests__/tilgangskontroll.test.ts */
vi.mock('../../../utils/tilgangskontroll', () => ({
    tilgangskontroll: vi.fn(() => ({ kanBrukeSøknad: true })),
}));

import { appLogger } from '@sif/apm';

import { tilgangskontroll } from '../../../utils/tilgangskontroll';
import { IngenTilgangError } from '../initialDataError';
import { assertHarTilgang, loggIngenSaker, validerK9Saker } from '../initialDataValidering';

const tillattEndringsperiode = ISODateRangeToDateRange('2024-01-01/2024-12-31');

const sakMedPeriode = (fom: string, tom: string) =>
    ({
        ytelse: {
            søknadsperioder: [{ from: ISODateToDate(fom), to: ISODateToDate(tom) }],
        },
    }) as unknown as K9Sak;

const ugyldigSak = (detaljer?: any): UgyldigK9SakFormat => ({
    erUgyldigK9SakFormat: true,
    detaljer,
});

describe('validerK9Saker', () => {
    it('returnerer sakene og den samlede perioden når alt er gyldig', () => {
        const sak = sakMedPeriode('2024-02-01', '2024-03-01');
        const { k9saker, samletPeriode } = validerK9Saker([sak], [], tillattEndringsperiode);

        expect(k9saker).toEqual([sak]);
        expect(samletPeriode).toEqual({ from: ISODateToDate('2024-02-01'), to: ISODateToDate('2024-03-01') });
    });

    it('kaster harIngenSak når bruker verken har saker i eller før endringsperioden', () => {
        expect(() => validerK9Saker([], [], tillattEndringsperiode)).toThrowError(
            expect.objectContaining({ årsak: [IngenTilgangÅrsak.harIngenSak] }),
        );
    });

    it('kaster søknadsperioderUtenforTillattEndringsperiode når bruker kun har eldre saker', () => {
        expect(() =>
            validerK9Saker([], [sakMedPeriode('2020-01-01', '2020-02-01')], tillattEndringsperiode),
        ).toThrowError(
            expect.objectContaining({
                årsak: [IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode],
            }),
        );
    });

    it('kaster harUgyldigK9FormatSak og tar med detaljer fra første ugyldige sak', () => {
        const detaljer = { ugyldigeFelt: ['barn.fødselsdato'] };

        expect(() =>
            validerK9Saker(
                [ugyldigSak(detaljer), sakMedPeriode('2024-02-01', '2024-03-01')],
                [],
                tillattEndringsperiode,
            ),
        ).toThrowError(
            expect.objectContaining({
                årsak: [IngenTilgangÅrsak.harUgyldigK9FormatSak],
                ingenTilgangMeta: { error: detaljer },
            }),
        );
    });

    it('kaster harUgyldigK9FormatSak uten meta når detaljer mangler', () => {
        expect(() => validerK9Saker([ugyldigSak(undefined)], [], tillattEndringsperiode)).toThrowError(
            expect.objectContaining({
                årsak: [IngenTilgangÅrsak.harUgyldigK9FormatSak],
                ingenTilgangMeta: undefined,
            }),
        );
    });

    it('kaster harIngenPerioder når sakene ikke har søknadsperioder', () => {
        const utenPerioder = { ytelse: { søknadsperioder: [] } } as unknown as K9Sak;

        expect(() => validerK9Saker([utenPerioder], [], tillattEndringsperiode)).toThrowError(
            expect.objectContaining({ årsak: [IngenTilgangÅrsak.harIngenPerioder] }),
        );
    });

    it('kaster søknadsperioderUtenforTillattEndringsperiode når periodene ikke overlapper', () => {
        expect(() =>
            validerK9Saker([sakMedPeriode('2020-01-01', '2020-02-01')], [], tillattEndringsperiode),
        ).toThrowError(
            expect.objectContaining({
                årsak: [IngenTilgangÅrsak.søknadsperioderUtenforTillattEndringsperiode],
            }),
        );
    });
});

describe('assertHarTilgang', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('slipper gjennom når tilgangskontrollen godkjenner', () => {
        vi.mocked(tilgangskontroll).mockReturnValue({ kanBrukeSøknad: true });

        expect(() => assertHarTilgang([], tillattEndringsperiode)).not.toThrow();
    });

    it('kaster IngenTilgangError med årsak og meta fra tilgangskontrollen', () => {
        vi.mocked(tilgangskontroll).mockReturnValue({
            kanBrukeSøknad: false,
            årsak: [IngenTilgangÅrsak.harMerEnnEnSak],
            ingenTilgangMeta: { erArbeidstaker: true },
        });

        expect(() => assertHarTilgang([], tillattEndringsperiode)).toThrowError(
            expect.objectContaining({
                årsak: [IngenTilgangÅrsak.harMerEnnEnSak],
                ingenTilgangMeta: { erArbeidstaker: true },
            }),
        );
    });

    it('kaster en IngenTilgangError, ikke en vanlig Error', () => {
        vi.mocked(tilgangskontroll).mockReturnValue({
            kanBrukeSøknad: false,
            årsak: [IngenTilgangÅrsak.harMerEnnEnSak],
        });

        expect(() => assertHarTilgang([], tillattEndringsperiode)).toThrow(IngenTilgangError);
    });
});

describe('loggIngenSaker', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('logger når bruker verken har saker i eller før endringsperioden', () => {
        loggIngenSaker([], []);
        expect(appLogger.logInfo).toHaveBeenCalledWith('fetchInitialData.ingenSaker');
    });

    it('logger ikke når bruker har en eldre sak', () => {
        loggIngenSaker([], [sakMedPeriode('2020-01-01', '2020-02-01')]);
        expect(appLogger.logInfo).not.toHaveBeenCalled();
    });
});
