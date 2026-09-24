import { IngenTilgangÅrsak } from '@app/types';
import { describe, expect, it } from 'vitest';

import { lagSak, periode } from '../../../tilgang/__tests__/testdata';
import { IngenTilgangError } from '../initialDataError';
import { HentArbeidsgivere, TilgangKontroll,tilgangKontrollV1, tilgangKontrollV2 } from '../tilgangKontroll';

const tillattEndringsperiode = periode('2024-01-01/2024-12-31');
const ingenArbeidsgivere: HentArbeidsgivere = async () => [];

const fangstAvslag = async (kontroll: TilgangKontroll, saker: any[], eldreSaker: any[] = []) => {
    try {
        await kontroll(saker, eldreSaker, tillattEndringsperiode, ingenArbeidsgivere);
        return undefined;
    } catch (error) {
        return error as IngenTilgangError;
    }
};

/**
 * Loggmetadataen som følger med avslag må være lik i v1 og v2. Uten den mister
 * analytics informasjonen om hvilke arbeidsforhold de avviste faktisk har.
 */
describe.each([
    ['v1', tilgangKontrollV1],
    ['v2', tilgangKontrollV2],
])('tilgangKontroll (%s) - ingenTilgangMeta', (_navn, kontroll) => {
    it('sender med meta når arbeidsforholdene gir avslag', async () => {
        const avslag = await fangstAvslag(kontroll, [lagSak({ snTimerPerDag: 'PT7H30M' })]);

        expect(avslag?.årsak).toEqual([IngenTilgangÅrsak.harArbeidstidSomSelvstendigNæringsdrivende]);
        expect(avslag?.ingenTilgangMeta).toEqual({ erArbeidstaker: false, erFrilanser: false, erSN: true });
    });

    it('sender ikke med meta når avslaget kommer fra sakene', async () => {
        const avslag = await fangstAvslag(kontroll, [lagSak(), lagSak()]);

        expect(avslag?.årsak).toEqual([IngenTilgangÅrsak.harMerEnnEnSak]);
        expect(avslag?.ingenTilgangMeta).toBeUndefined();
    });
});
