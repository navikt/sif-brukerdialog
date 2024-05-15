export const enSakEnArbeidsgiverEnPeriodeMock = [
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
                søknadsperiode: ['2023-01-27/2023-02-15'],
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
                        '2023-01-27/2023-02-15': { etablertTilsynTimerPerDag: 'PT0S' },
                    },
                },
                lovbestemtFerie: {
                    perioder: {
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
