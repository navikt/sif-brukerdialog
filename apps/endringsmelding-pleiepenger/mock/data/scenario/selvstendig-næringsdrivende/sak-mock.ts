export default [
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
                    '2022-08-09/2022-09-10',
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
                lovbestemtFerie: { perioder: {} },
                arbeidstid: {
                    arbeidstakerList: [],
                    frilanserArbeidstidInfo: {
                        perioder: {
                            '2022-08-09/2022-09-10': {
                                jobberNormaltTimerPerDag: 'PT0S',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                            '2022-11-03/2022-11-08': {
                                jobberNormaltTimerPerDag: 'PT0S',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                            '2022-11-09/2022-11-25': {
                                jobberNormaltTimerPerDag: 'PT1H',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                            '2022-11-28/2022-11-30': {
                                jobberNormaltTimerPerDag: 'PT1H',
                                faktiskArbeidTimerPerDag: 'PT1H40M',
                            },
                            '2022-12-05/2022-12-19': {
                                jobberNormaltTimerPerDag: 'PT6H',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                            '2023-01-17/2023-01-19': {
                                jobberNormaltTimerPerDag: 'PT2H',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                            '2023-01-24/2023-01-25': {
                                jobberNormaltTimerPerDag: 'PT24M',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                            '2023-01-27/2023-02-15': {
                                jobberNormaltTimerPerDag: 'PT1H',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                        },
                    },
                    selvstendigNæringsdrivendeArbeidstidInfo: {
                        perioder: {
                            '2022-12-10/2022-12-11': {
                                jobberNormaltTimerPerDag: 'PT8H',
                                faktiskArbeidTimerPerDag: 'PT0S',
                            },
                        },
                    },
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
