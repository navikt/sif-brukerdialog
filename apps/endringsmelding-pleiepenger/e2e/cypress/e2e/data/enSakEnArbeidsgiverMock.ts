export const enSakEnArbeidsgiverMock = [
    {
        barn: {
            fødselsdato: '2020-04-20',
            fornavn: 'SKRIVEFØR',
            mellomnavn: null,
            etternavn: 'FRENDE',
            aktørId: '2990893847132',
            identitetsnummer: '20842099774',
        },
        søknad: {
            søknadId: 'generert',
            versjon: '1.0.0.',
            mottattDato: '2022-12-22T10:04:59.891Z',
            søker: { norskIdentitetsnummer: '00000000000' },
            ytelse: {
                type: 'PLEIEPENGER_SYKT_BARN',
                barn: { norskIdentitetsnummer: '00000000000', fødselsdato: null },
                søknadsperiode: [
                    '2022-11-03/2022-11-30',
                    '2022-12-05/2022-12-19',
                    '2023-01-17/2023-01-19',
                    '2023-01-24/2023-01-25',
                    '2023-01-27/2023-02-15',
                ],
                endringsperiode: [],
                trekkKravPerioder: [],
                opptjeningAktivitet: {},
                dataBruktTilUtledning: null,
                infoFraPunsj: null,
                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                tilsynsordning: {
                    perioder: {
                        '2022-08-09/2022-09-10': { etablertTilsynTimerPerDag: 'PT0S' },
                        '2022-11-03/2022-11-30': { etablertTilsynTimerPerDag: 'PT0S' },
                        '2022-12-05/2022-12-19': { etablertTilsynTimerPerDag: 'PT0S' },
                        '2023-01-17/2023-01-19': { etablertTilsynTimerPerDag: 'PT0S' },
                        '2023-01-24/2023-01-25': { etablertTilsynTimerPerDag: 'PT0S' },
                        '2023-01-27/2023-02-15': { etablertTilsynTimerPerDag: 'PT0S' },
                    },
                },
                lovbestemtFerie: {
                    perioder: {
                        '2022-11-05/2022-11-10': {
                            skalHaFerie: true,
                        },
                        '2023-02-01/2023-02-05': {
                            skalHaFerie: true,
                        },
                    },
                },
                arbeidstid: {
                    arbeidstakerList: [
                        {
                            norskIdentitetsnummer: null,
                            organisasjonsnummer: '947064649',
                            arbeidstidInfo: {
                                perioder: {
                                    '2022-11-03/2022-11-04': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT2H',
                                    },
                                    '2022-11-05/2022-11-06': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2022-11-07/2022-11-11': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT48M',
                                    },
                                    '2022-11-12/2022-11-13': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2022-11-14/2022-11-18': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT1H',
                                    },
                                    '2022-11-19/2022-11-20': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2022-11-21/2022-11-25': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT1H',
                                    },
                                    '2022-11-26/2022-11-27': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT2H',
                                    },
                                    '2022-11-28/2022-11-30': {
                                        jobberNormaltTimerPerDag: 'PT4H',
                                        faktiskArbeidTimerPerDag: 'PT1H40M',
                                    },
                                    '2022-12-05/2022-12-09': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT1H36M',
                                    },
                                    '2022-12-10/2022-12-11': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2022-12-12/2022-12-16': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT15M',
                                    },
                                    '2022-12-17/2022-12-19': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2023-01-17/2023-01-19': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2023-01-24/2023-01-25': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2023-01-27/2023-02-15': {
                                        jobberNormaltTimerPerDag: 'PT6H',
                                        faktiskArbeidTimerPerDag: 'PT6H',
                                    },
                                },
                            },
                        },
                    ],
                    frilanserArbeidstidInfo: {},
                    selvstendigNæringsdrivendeArbeidstidInfo: {},
                },
                uttak: { perioder: {} },
                omsorg: { relasjonTilBarnet: null, beskrivelseAvOmsorgsrollen: null },
            },
            språk: 'nb',
            journalposter: [],
            begrunnelseForInnsending: { tekst: null },
        },
    },
];
