export default [
    {
        barn: {
            fødselsdato: '2023-01-24',
            fornavn: 'GEOMETRISK',
            mellomnavn: null,
            etternavn: 'RIST',
            aktørId: '2487158514882',
            identitetsnummer: '24412358038',
        },
        søknad: {
            søknadId: 'generert',
            versjon: '1.0.0',
            mottattDato: '2025-01-24T07:51:23.794Z',
            søker: {
                norskIdentitetsnummer: '00000000000',
            },
            språk: 'nb',
            ytelse: {
                type: 'PLEIEPENGER_SYKT_BARN',
                barn: {
                    norskIdentitetsnummer: '00000000000',
                    fødselsdato: null,
                },
                søknadsperiode: ['2024-11-01/2025-02-28'],
                endringsperiode: [],
                trekkKravPerioder: [],
                opptjeningAktivitet: {},
                dataBruktTilUtledning: null,
                annetDataBruktTilUtledning: null,
                infoFraPunsj: null,
                bosteder: {
                    perioder: {},
                    perioderSomSkalSlettes: {},
                },
                utenlandsopphold: {
                    perioder: {},
                    perioderSomSkalSlettes: {},
                },
                beredskap: {
                    perioder: {},
                    perioderSomSkalSlettes: {},
                },
                nattevåk: {
                    perioder: {},
                    perioderSomSkalSlettes: {},
                },
                tilsynsordning: {
                    perioder: {
                        '2024-11-01/2025-02-28': {
                            etablertTilsynTimerPerDag: 'PT0S',
                        },
                    },
                },
                lovbestemtFerie: {
                    perioder: {},
                },
                arbeidstid: {
                    arbeidstakerList: [
                        {
                            norskIdentitetsnummer: null,
                            organisasjonsnummer: '896929119',
                            organisasjonsnavn: null,
                            arbeidstidInfo: {
                                perioder: {
                                    '2024-11-01/2024-11-30': {
                                        jobberNormaltTimerPerDag: 'PT7H30M',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                    '2024-12-01/2025-02-28': {
                                        jobberNormaltTimerPerDag: 'PT8H',
                                        faktiskArbeidTimerPerDag: 'PT0S',
                                    },
                                },
                            },
                        },
                    ],
                    frilanserArbeidstidInfo: {
                        perioder: {
                            '2024-11-01/2025-02-28': {
                                jobberNormaltTimerPerDag: 'PT0S',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                        },
                    },
                    selvstendigNæringsdrivendeArbeidstidInfo: null,
                },
                uttak: {
                    perioder: {},
                },
                omsorg: {
                    relasjonTilBarnet: null,
                    beskrivelseAvOmsorgsrollen: null,
                },
                erSammenMedBarnet: null,
            },
            journalposter: [],
            begrunnelseForInnsending: {
                tekst: null,
            },
            kildesystem: null,
        },
    },
];
