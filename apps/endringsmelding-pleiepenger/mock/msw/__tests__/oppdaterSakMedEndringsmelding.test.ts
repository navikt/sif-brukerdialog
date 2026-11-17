import { K9Format, SøknadApiData } from '@app/types';

import brukertestSaker from '../../data/scenario/brukertest-2026/sak-mock';
import { oppdaterSakMedEndringsmelding } from '../oppdaterSakMedEndringsmelding';

const sak = brukertestSaker[0] as unknown as K9Format;

const lagEndringsmelding = (ytelse: Partial<SøknadApiData['ytelse']>): SøknadApiData =>
    ({ ytelse: { barn: { norskIdentitetsnummer: sak.barn.identitetsnummer }, ...ytelse } }) as SøknadApiData;

describe('oppdaterSakMedEndringsmelding', () => {
    it('splitter eksisterende arbeidstidsperiode rundt endret uke', () => {
        const endringsmelding = lagEndringsmelding({
            arbeidstid: {
                arbeidstakerList: [
                    {
                        organisasjonsnummer: '947064649',
                        organisasjonsnavn: 'Arbeidsgiver',
                        _erUkjentArbeidsforhold: false,
                        arbeidstidInfo: {
                            perioder: {
                                '2026-10-05/2026-10-09': {
                                    jobberNormaltTimerPerDag: 'PT8H00M',
                                    faktiskArbeidTimerPerDag: 'PT2H0M',
                                    _opprinneligNormaltPerDag: 'PT8H00M',
                                },
                            },
                        },
                    },
                ],
            },
        });

        const resultat = oppdaterSakMedEndringsmelding(sak, endringsmelding);

        expect(resultat.søknad.ytelse.arbeidstid.arbeidstakerList[0].arbeidstidInfo.perioder).toEqual({
            '2026-09-07/2026-10-02': { jobberNormaltTimerPerDag: 'PT8H00M', faktiskArbeidTimerPerDag: 'PT4H0M' },
            '2026-10-05/2026-10-09': { jobberNormaltTimerPerDag: 'PT8H00M', faktiskArbeidTimerPerDag: 'PT2H0M' },
            '2026-10-12/2027-01-29': { jobberNormaltTimerPerDag: 'PT8H00M', faktiskArbeidTimerPerDag: 'PT4H0M' },
        });
    });

    it('legger til ny ferie og fjerner ferie som er tatt bort', () => {
        const endringsmelding = lagEndringsmelding({
            lovbestemtFerie: {
                perioder: {
                    '2026-12-28/2026-12-31': { skalHaFerie: false },
                    '2026-10-12/2026-10-14': { skalHaFerie: true },
                },
            },
        });

        const resultat = oppdaterSakMedEndringsmelding(sak, endringsmelding);

        expect(resultat.søknad.ytelse.lovbestemtFerie.perioder).toEqual({
            '2026-10-12/2026-10-14': { skalHaFerie: true },
        });
    });
});
