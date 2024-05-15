export default [
    {
        barn: {
            fødselsdato: '2017-03-03',
            fornavn: 'Nora',
            mellomnavn: null,
            etternavn: 'Nordmann',
            aktørId: '2559652436225',
            identitetsnummer: '03831799748',
        },
        søknad: {
            søknadId: 'generert',
            versjon: '1.0.0.',
            mottattDato: '2023-01-18T08:13:37.525Z',
            søker: { norskIdentitetsnummer: '00000000000' },
            ytelse: {
                type: 'PLEIEPENGER_SYKT_BARN',
                barn: { norskIdentitetsnummer: '00000000000', fødselsdato: null },
                søknadsperiode: ['2022-12-01/2024-05-31'],
                endringsperiode: [],
                trekkKravPerioder: [],
                opptjeningAktivitet: {},
                dataBruktTilUtledning: null,
                infoFraPunsj: null,
                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                utenlandsopphold: {
                    perioder: {
                        '2018-12-30/2019-10-20': {
                            land: 'DNK',
                            årsak: 'barnetInnlagtIHelseinstitusjonForNorskOffentligRegning',
                        },
                    },
                },
                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                tilsynsordning: {
                    perioder: {
                        '2022-12-01/2023-01-31': { etablertTilsynTimerPerDag: 'PT8H' },
                        '2023-02-14/2023-03-16': { etablertTilsynTimerPerDag: 'PT8H' },
                    },
                },
                lovbestemtFerie: {
                    perioder: {
                        '2023-01-01/2023-01-10': {
                            skalHaFerie: true,
                        },
                        '2023-01-12/2023-01-15': {
                            skalHaFerie: false,
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
                                    '2022-12-01/2022-12-02': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT4H32M24S',
                                    },
                                    '2022-12-05/2022-12-09': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT4H32M24S',
                                    },
                                    '2022-12-12/2022-12-16': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT4H32M24S',
                                    },
                                    '2022-12-19/2022-12-23': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT4H32M24S',
                                    },
                                    '2022-12-26/2022-12-30': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT4H32M24S',
                                    },
                                    '2023-01-02/2023-01-06': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT4H32M24S',
                                    },
                                    '2023-01-09/2023-01-13': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT4H32M24S',
                                    },
                                    '2023-01-16/2023-01-20': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT4H32M24S',
                                    },
                                    '2023-01-23/2023-01-27': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT4H32M24S',
                                    },
                                    '2023-01-30/2024-05-31': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT4H32M24S',
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
