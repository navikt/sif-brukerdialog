export default [
    {
        barn: {
            fødselsdato: '2008-07-27',
            fornavn: 'RAVGUL',
            mellomnavn: null,
            etternavn: 'LØVETANN',
            aktørId: '2175638020356',
            identitetsnummer: '27870899799',
        },
        søknad: {
            søknadId: 'generert',
            versjon: '1.0.0',
            mottattDato: '2024-12-10T08:47:11.929Z',
            søker: {
                norskIdentitetsnummer: '00000000000',
            },
            språk: null,
            ytelse: {
                type: 'PLEIEPENGER_SYKT_BARN',
                barn: {
                    norskIdentitetsnummer: '00000000000',
                    fødselsdato: null,
                },
                søknadsperiode: ['2024-12-03/2024-12-05'],
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
                        '2024-12-03/2024-12-05': {
                            etablertTilsynTimerPerDag: 'PT0S',
                        },
                    },
                },
                lovbestemtFerie: {
                    perioder: {
                        '2024-12-04/2024-12-05': {
                            skalHaFerie: false,
                        },
                    },
                },
                arbeidstid: {
                    arbeidstakerList: [],
                    frilanserArbeidstidInfo: {
                        perioder: {
                            '2024-12-03/2024-12-05': {
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
