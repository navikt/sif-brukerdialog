/**
 *
 * Mock data for en sak med pleiepenger for sykt barn. Data er den samme som kommer
 * fra api endepunktetene i nextjs, ikke fra k9 backend, så det er transformerte data.
 */

const søker = {
    aktørId: '2623120193326',
    fødselsdato: '1991-06-20',
    fødselsnummer: '20469134998',
    fornavn: 'SORGLØS',
    etternavn: 'FELTTOG',
};

const sakerMetadata = [
    {
        saksnummer: '100097Y',
        pleietrengende: {
            fødselsdato: '2017-04-14',
            aktørId: '2840470257247',
            fornavn: 'BEVISST',
            etternavn: 'SANS',
        },
        fagsakYtelseType: 'PSB',
        fagsakOpprettetTidspunkt: '2024-12-03T22:49:33.000Z',
    },
    {
        saksnummer: '1001F8G',
        pleietrengende: {
            fødselsdato: '2018-12-22',
            aktørId: '2959134453538',
            fornavn: 'GOD',
            etternavn: 'BALSAM',
        },
        fagsakYtelseType: 'PSB',
        fagsakOpprettetTidspunkt: '2022-01-06T22:49:33.000Z',
    },
];

const saker = [
    {
        saksnummer: '1001F8G',
        utledetStatus: { status: 'UNDER_BEHANDLING', aksjonspunkter: [], saksbehandlingsFrist: '2025-09-02' },
        saksbehandlingsFrist: '2025-09-02',
        fagsakYtelseType: 'PSB',
        ytelseType: 'PSB',
        behandlinger: [
            {
                status: 'UNDER_BEHANDLING',
                opprettetTidspunkt: '2025-07-22T05:56:49.000Z',
                innsendelser: [
                    {
                        søknadId: '5c013299-a5c2-4cf0-a89e-cebaa65b14fd',
                        mottattTidspunkt: '2025-07-22T05:55:36Z',
                        innsendelsestype: 'SØKNAD',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-07-22T05:55:17.450Z',
                            søknadId: '5c013299-a5c2-4cf0-a89e-cebaa65b14fd',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '22521885096' },
                                søknadsperiode: ['2025-07-01/2025-07-03'],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                annetDataBruktTilUtledning: {
                                    harForståttRettigheterOgPlikter: true,
                                    harBekreftetOpplysninger: true,
                                    soknadDialogCommitSha: '2025.07.22-05.43-2c89222',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: {
                                    perioder: { '2025-07-01/2025-07-03': { etablertTilsynTimerPerDag: 'PT0S' } },
                                },
                                lovbestemtFerie: { perioder: {} },
                                arbeidstid: {
                                    arbeidstakerList: [
                                        {
                                            organisasjonsnummer: '896929119',
                                            organisasjonsnavn: 'SAUEFABRIKK',
                                            arbeidstidInfo: {
                                                perioder: {
                                                    '2025-07-01/2025-07-03': {
                                                        jobberNormaltTimerPerDag: 'PT4H',
                                                        faktiskArbeidTimerPerDag: 'PT0S',
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                    frilanserArbeidstidInfo: {
                                        perioder: {
                                            '2025-07-01/2025-07-03': {
                                                jobberNormaltTimerPerDag: 'PT0S',
                                                faktiskArbeidTimerPerDag: 'PT0S',
                                            },
                                        },
                                    },
                                },
                                uttak: {
                                    perioder: { '2025-07-01/2025-07-03': { timerPleieAvBarnetPerDag: 'PT7H30M' } },
                                },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '454002269',
                                dokumentInfoId: '454410548',
                                saksnummer: '1001F8G',
                                tittel: 'Søknad om pleiepenger for sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454002269/454410548/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-07-22T07:55:36', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-07-22T07:55:36', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-07-22T07:55:44', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-07-22T07:55:17', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [{ organisasjonsnummer: '896929119', navn: 'SAUEFABRIKK' }],
                    },
                    {
                        søknadId: '32498b0f-e3d6-4691-981a-e7492274d6e3',
                        mottattTidspunkt: '2025-08-04T07:36:51.652Z',
                        innsendelsestype: 'ETTERSENDELSE',
                        k9FormatInnsendelse: {
                            versjon: '0.0.1',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-08-04T09:36:51.652Z',
                            søknadId: '32498b0f-e3d6-4691-981a-e7492274d6e3',
                            ytelse: 'PLEIEPENGER_SYKT_BARN',
                        },
                        dokumenter: [
                            {
                                journalpostId: '454004184',
                                dokumentInfoId: '454412718',
                                saksnummer: '1001F8G',
                                tittel: 'Ettersendelse av dokumentasjon til søknad om pleiepenger',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_ETTERSENDELSE',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454004184/454412718/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-08-04T11:37:01', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-08-04T11:37:01', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-08-04T11:37:08', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-08-04T11:36:51', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                            {
                                journalpostId: '454004184',
                                dokumentInfoId: '454412719',
                                saksnummer: '1001F8G',
                                tittel: 'Floral_Ornament.jpg',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_ETTERSENDELSE',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454004184/454412719/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-08-04T11:37:01', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-08-04T11:37:01', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-08-04T11:37:08', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-08-04T11:36:51', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                    },
                ],
                aksjonspunkter: [],
                utgåendeDokumenter: [],
            },
        ],
    },
    {
        saksnummer: '100097Y',
        utledetStatus: { status: 'UNDER_BEHANDLING', aksjonspunkter: [], saksbehandlingsFrist: '2025-02-27' },
        saksbehandlingsFrist: '2025-02-27',
        fagsakYtelseType: 'PSB',
        ytelseType: 'PSB',
        behandlinger: [
            {
                status: 'UNDER_BEHANDLING',
                opprettetTidspunkt: '2025-01-16T11:06:32.000Z',
                innsendelser: [
                    {
                        søknadId: '0741bf48-612e-4d91-9587-33640705b2b8',
                        mottattTidspunkt: '2025-01-16T11:05:27Z',
                        innsendelsestype: 'SØKNAD',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-01-16T11:05:25.841Z',
                            søknadId: '0741bf48-612e-4d91-9587-33640705b2b8',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049' },
                                søknadsperiode: ['2024-12-01/2025-02-28'],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                annetDataBruktTilUtledning: {
                                    harForståttRettigheterOgPlikter: true,
                                    harBekreftetOpplysninger: true,
                                    soknadDialogCommitSha: '2025.01.15-12.25-796e5c8',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: {
                                    perioder: { '2024-12-01/2025-02-28': { etablertTilsynTimerPerDag: 'PT0S' } },
                                },
                                lovbestemtFerie: { perioder: {} },
                                arbeidstid: {
                                    arbeidstakerList: [
                                        {
                                            organisasjonsnummer: '896929119',
                                            organisasjonsnavn: 'SAUEFABRIKK',
                                            arbeidstidInfo: {
                                                perioder: {
                                                    '2024-12-01/2025-02-28': {
                                                        jobberNormaltTimerPerDag: 'PT7H30M',
                                                        faktiskArbeidTimerPerDag: 'PT0S',
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                    frilanserArbeidstidInfo: {
                                        perioder: {
                                            '2024-12-01/2025-02-28': {
                                                jobberNormaltTimerPerDag: 'PT0S',
                                                faktiskArbeidTimerPerDag: 'PT0S',
                                            },
                                        },
                                    },
                                },
                                uttak: {
                                    perioder: { '2024-12-01/2025-02-28': { timerPleieAvBarnetPerDag: 'PT7H30M' } },
                                },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '453922065',
                                dokumentInfoId: '454323801',
                                saksnummer: '100097Y',
                                tittel: 'Søknad om pleiepenger for sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/453922065/454323801/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-01-16T12:05:27', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-01-16T12:05:27', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-01-16T12:05:32', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-01-16T12:05:25', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [{ organisasjonsnummer: '896929119', navn: 'SAUEFABRIKK' }],
                    },
                    {
                        søknadId: 'f5ea688c-c976-48b1-843c-64562da4b4ee',
                        mottattTidspunkt: '2025-08-01T07:36:17.362Z',
                        innsendelsestype: 'ETTERSENDELSE',
                        k9FormatInnsendelse: {
                            versjon: '0.0.1',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-08-01T09:36:17.362Z',
                            søknadId: 'f5ea688c-c976-48b1-843c-64562da4b4ee',
                            ytelse: 'PLEIEPENGER_SYKT_BARN',
                        },
                        dokumenter: [
                            {
                                journalpostId: '454003941',
                                dokumentInfoId: '454412463',
                                saksnummer: '100097Y',
                                tittel: 'Ettersendelse av dokumentasjon til søknad om pleiepenger',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_ETTERSENDELSE',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454003941/454412463/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-08-01T11:36:19', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-08-01T11:36:19', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-08-01T11:36:26', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-08-01T11:36:17', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                            {
                                journalpostId: '454003941',
                                dokumentInfoId: '454412464',
                                saksnummer: '100097Y',
                                tittel: 'Floral_Ornament.jpg',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_ETTERSENDELSE',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454003941/454412464/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-08-01T11:36:19', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-08-01T11:36:19', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-08-01T11:36:26', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-08-01T11:36:17', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                    },
                    {
                        søknadId: '95c04853-64a8-4f82-903f-fc97ac955c72',
                        mottattTidspunkt: '2025-07-16T10:17:53Z',
                        innsendelsestype: 'SØKNAD',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-07-16T10:17:45.888Z',
                            søknadId: '95c04853-64a8-4f82-903f-fc97ac955c72',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049' },
                                søknadsperiode: ['2025-07-01/2025-07-06'],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                annetDataBruktTilUtledning: {
                                    harForståttRettigheterOgPlikter: true,
                                    harBekreftetOpplysninger: true,
                                    soknadDialogCommitSha: '2025.07.16-09.58-fa776e1',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: {
                                    perioder: { '2025-07-01/2025-07-06': { etablertTilsynTimerPerDag: 'PT0S' } },
                                },
                                lovbestemtFerie: { perioder: {} },
                                arbeidstid: {
                                    arbeidstakerList: [
                                        {
                                            organisasjonsnummer: '896929119',
                                            organisasjonsnavn: 'SAUEFABRIKK',
                                            arbeidstidInfo: {
                                                perioder: {
                                                    '2025-07-01/2025-07-06': {
                                                        jobberNormaltTimerPerDag: 'PT4H',
                                                        faktiskArbeidTimerPerDag: 'PT0S',
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                    frilanserArbeidstidInfo: {
                                        perioder: {
                                            '2025-07-01/2025-07-06': {
                                                jobberNormaltTimerPerDag: 'PT0S',
                                                faktiskArbeidTimerPerDag: 'PT0S',
                                            },
                                        },
                                    },
                                },
                                uttak: {
                                    perioder: { '2025-07-01/2025-07-06': { timerPleieAvBarnetPerDag: 'PT7H30M' } },
                                },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '454001745',
                                dokumentInfoId: '454410007',
                                saksnummer: '100097Y',
                                tittel: 'Søknad om pleiepenger for sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454001745/454410007/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-07-16T12:17:53', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-07-16T12:17:53', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-07-16T12:18:02', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-07-16T12:17:45', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [{ organisasjonsnummer: '896929119', navn: 'SAUEFABRIKK' }],
                    },
                    {
                        søknadId: '128b8466-5507-4cd8-968d-e2c178d96f5e',
                        mottattTidspunkt: '2025-05-06T06:35:45Z',
                        innsendelsestype: 'SØKNAD',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-05-06T06:35:32.408Z',
                            søknadId: '128b8466-5507-4cd8-968d-e2c178d96f5e',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049' },
                                søknadsperiode: ['2025-05-01/2025-06-29'],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                annetDataBruktTilUtledning: {
                                    harForståttRettigheterOgPlikter: true,
                                    harBekreftetOpplysninger: true,
                                    soknadDialogCommitSha: '2025.05.06-05.58-fcf830d',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: {
                                    perioder: { '2025-05-01/2025-06-29': { etablertTilsynTimerPerDag: 'PT0S' } },
                                },
                                lovbestemtFerie: { perioder: {} },
                                arbeidstid: {
                                    arbeidstakerList: [
                                        {
                                            organisasjonsnummer: '896929119',
                                            organisasjonsnavn: 'SAUEFABRIKK',
                                            arbeidstidInfo: {
                                                perioder: {
                                                    '2025-05-01/2025-06-29': {
                                                        jobberNormaltTimerPerDag: 'PT4H',
                                                        faktiskArbeidTimerPerDag: 'PT0S',
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                    frilanserArbeidstidInfo: {
                                        perioder: {
                                            '2025-05-01/2025-06-09': {
                                                jobberNormaltTimerPerDag: 'PT0S',
                                                faktiskArbeidTimerPerDag: 'PT0S',
                                            },
                                            '2025-06-10/2025-06-29': {
                                                jobberNormaltTimerPerDag: 'PT3H',
                                                faktiskArbeidTimerPerDag: 'PT3H',
                                            },
                                        },
                                    },
                                },
                                uttak: {
                                    perioder: { '2025-05-01/2025-06-29': { timerPleieAvBarnetPerDag: 'PT7H30M' } },
                                },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '453985736',
                                dokumentInfoId: '454391616',
                                saksnummer: '100097Y',
                                tittel: 'Søknad om pleiepenger for sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/453985736/454391616/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-05-06T08:35:45', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-05-06T08:35:45', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-05-06T08:35:52', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-05-06T08:35:32', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [{ organisasjonsnummer: '896929119', navn: 'SAUEFABRIKK' }],
                    },
                    {
                        søknadId: '7245cd20-e3ca-4330-9e24-e4fd1f46d7e8',
                        mottattTidspunkt: '2025-08-28T06:56:42Z',
                        innsendelsestype: 'SØKNAD',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-08-28T06:56:41.736Z',
                            søknadId: '7245cd20-e3ca-4330-9e24-e4fd1f46d7e8',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049' },
                                søknadsperiode: ['2025-08-04/2025-08-10'],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                annetDataBruktTilUtledning: {
                                    harForståttRettigheterOgPlikter: true,
                                    harBekreftetOpplysninger: true,
                                    soknadDialogCommitSha: '2025.08.28-06.47-f8a2ac6',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: {
                                    perioder: { '2025-08-04/2025-08-10': { etablertTilsynTimerPerDag: 'PT0S' } },
                                },
                                lovbestemtFerie: { perioder: {} },
                                arbeidstid: {
                                    arbeidstakerList: [],
                                    frilanserArbeidstidInfo: {
                                        perioder: {
                                            '2025-08-04/2025-08-10': {
                                                jobberNormaltTimerPerDag: 'PT0S',
                                                faktiskArbeidTimerPerDag: 'PT0S',
                                            },
                                        },
                                    },
                                },
                                uttak: {
                                    perioder: { '2025-08-04/2025-08-10': { timerPleieAvBarnetPerDag: 'PT7H30M' } },
                                },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '454011451',
                                dokumentInfoId: '454420963',
                                saksnummer: '100097Y',
                                tittel: 'Søknad om pleiepenger for sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454011451/454420963/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-08-28T08:56:42', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-08-28T08:56:42', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-08-28T08:56:53', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-08-28T08:56:41', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [],
                    },
                    {
                        søknadId: 'd4c70ce5-6ec1-4320-8b9b-be0a63616d74',
                        mottattTidspunkt: '2025-08-28T06:45:06Z',
                        innsendelsestype: 'SØKNAD',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-08-28T06:45:04.475Z',
                            søknadId: 'd4c70ce5-6ec1-4320-8b9b-be0a63616d74',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049' },
                                søknadsperiode: ['2025-08-04/2025-08-10'],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                annetDataBruktTilUtledning: {
                                    harForståttRettigheterOgPlikter: true,
                                    harBekreftetOpplysninger: true,
                                    soknadDialogCommitSha: '2025.08.26-11.07-d1f7a0b',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: {
                                    perioder: { '2025-08-04/2025-08-10': { etablertTilsynTimerPerDag: 'PT0S' } },
                                },
                                lovbestemtFerie: { perioder: {} },
                                arbeidstid: {
                                    arbeidstakerList: [],
                                    frilanserArbeidstidInfo: {
                                        perioder: {
                                            '2025-08-04/2025-08-10': {
                                                jobberNormaltTimerPerDag: 'PT0S',
                                                faktiskArbeidTimerPerDag: 'PT0S',
                                            },
                                        },
                                    },
                                },
                                uttak: {
                                    perioder: { '2025-08-04/2025-08-10': { timerPleieAvBarnetPerDag: 'PT7H30M' } },
                                },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '454011447',
                                dokumentInfoId: '454420959',
                                saksnummer: '100097Y',
                                tittel: 'Søknad om pleiepenger for sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454011447/454420959/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-08-28T08:45:06', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-08-28T08:45:06', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-08-28T08:45:14', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-08-28T08:45:04', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [],
                    },
                    {
                        søknadId: 'cc700fb9-2482-4b64-b162-512e021934be',
                        mottattTidspunkt: '2025-07-24T13:19:31Z',
                        innsendelsestype: 'SØKNAD',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-07-24T13:19:18.826Z',
                            søknadId: 'cc700fb9-2482-4b64-b162-512e021934be',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049' },
                                søknadsperiode: ['2025-07-01/2025-07-06'],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                annetDataBruktTilUtledning: {
                                    harForståttRettigheterOgPlikter: true,
                                    harBekreftetOpplysninger: true,
                                    soknadDialogCommitSha: '2025.07.24-12.47-b07e021',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: {
                                    perioder: { '2025-07-01/2025-07-06': { etablertTilsynTimerPerDag: 'PT0S' } },
                                },
                                lovbestemtFerie: { perioder: {} },
                                arbeidstid: {
                                    arbeidstakerList: [
                                        {
                                            organisasjonsnummer: '896929119',
                                            organisasjonsnavn: 'SAUEFABRIKK',
                                            arbeidstidInfo: {
                                                perioder: {
                                                    '2025-07-01/2025-07-06': {
                                                        jobberNormaltTimerPerDag: 'PT4H',
                                                        faktiskArbeidTimerPerDag: 'PT0S',
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                    frilanserArbeidstidInfo: {
                                        perioder: {
                                            '2025-07-01/2025-07-06': {
                                                jobberNormaltTimerPerDag: 'PT0S',
                                                faktiskArbeidTimerPerDag: 'PT0S',
                                            },
                                        },
                                    },
                                },
                                uttak: {
                                    perioder: { '2025-07-01/2025-07-06': { timerPleieAvBarnetPerDag: 'PT7H30M' } },
                                },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '454003178',
                                dokumentInfoId: '454411547',
                                saksnummer: '100097Y',
                                tittel: 'Søknad om pleiepenger for sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454003178/454411547/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-07-24T15:19:31', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-07-24T15:19:31', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-07-24T15:19:38', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-07-24T15:19:18', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [{ organisasjonsnummer: '896929119', navn: 'SAUEFABRIKK' }],
                    },
                    {
                        søknadId: '838b8ff9-07f2-4b4c-a7ff-0a5fce5a5aa5',
                        mottattTidspunkt: '2025-04-20T07:52:14Z',
                        innsendelsestype: 'ENDRINGSMELDING',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-04-20T07:52:05.803Z',
                            søknadId: '838b8ff9-07f2-4b4c-a7ff-0a5fce5a5aa5',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049', fødselsdato: '2017-04-14' },
                                søknadsperiode: [],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                dataBruktTilUtledning: { ukjenteArbeidsforhold: [] },
                                annetDataBruktTilUtledning: {
                                    annetData: '{"valgteEndringer":{"arbeidstid":true,"lovbestemtFerie":true}}',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: { perioder: {} },
                                lovbestemtFerie: { perioder: { '2025-01-08/2025-01-09': { skalHaFerie: true } } },
                                arbeidstid: { arbeidstakerList: [] },
                                uttak: { perioder: {} },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '453982663',
                                dokumentInfoId: '454388232',
                                saksnummer: '100097Y',
                                tittel: 'Endringsmelding for pleiepenger sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/453982663/454388232/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-04-20T09:52:14', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-04-20T09:52:14', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-04-20T09:52:21', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-04-20T09:52:05', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [],
                    },
                    {
                        søknadId: 'ea290e47-21bd-4409-94e0-51d3f30cc103',
                        mottattTidspunkt: '2025-04-20T07:50:58Z',
                        innsendelsestype: 'SØKNAD',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-04-20T07:50:48.074Z',
                            søknadId: 'ea290e47-21bd-4409-94e0-51d3f30cc103',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049' },
                                søknadsperiode: ['2025-04-01/2025-04-06'],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                annetDataBruktTilUtledning: {
                                    harForståttRettigheterOgPlikter: true,
                                    harBekreftetOpplysninger: true,
                                    soknadDialogCommitSha: '2025.04.20-07.41-244461b',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: {
                                    perioder: { '2025-04-01/2025-04-06': { etablertTilsynTimerPerDag: 'PT0S' } },
                                },
                                lovbestemtFerie: { perioder: {} },
                                arbeidstid: {
                                    arbeidstakerList: [
                                        {
                                            organisasjonsnummer: '896929119',
                                            organisasjonsnavn: 'SAUEFABRIKK',
                                            arbeidstidInfo: {
                                                perioder: {
                                                    '2025-04-01/2025-04-04': {
                                                        jobberNormaltTimerPerDag: 'PT6H',
                                                        faktiskArbeidTimerPerDag: 'PT30M',
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                    frilanserArbeidstidInfo: {
                                        perioder: {
                                            '2025-04-01/2025-04-06': {
                                                jobberNormaltTimerPerDag: 'PT0S',
                                                faktiskArbeidTimerPerDag: 'PT0S',
                                            },
                                        },
                                    },
                                },
                                uttak: {
                                    perioder: { '2025-04-01/2025-04-06': { timerPleieAvBarnetPerDag: 'PT7H30M' } },
                                },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '453982662',
                                dokumentInfoId: '454388231',
                                saksnummer: '100097Y',
                                tittel: 'Søknad om pleiepenger for sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/453982662/454388231/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-04-20T09:50:58', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-04-20T09:50:58', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-04-20T09:51:05', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-04-20T09:50:48', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [{ organisasjonsnummer: '896929119', navn: 'SAUEFABRIKK' }],
                    },
                    {
                        søknadId: '5b7ebdc3-41fe-46de-8c55-2a03abcef988',
                        mottattTidspunkt: '2025-11-10T06:52:11Z',
                        innsendelsestype: 'ENDRINGSMELDING',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-11-10T06:51:59.251Z',
                            søknadId: '5b7ebdc3-41fe-46de-8c55-2a03abcef988',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049', fødselsdato: '2017-04-14' },
                                søknadsperiode: [],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                dataBruktTilUtledning: { ukjenteArbeidsforhold: [] },
                                annetDataBruktTilUtledning: {
                                    annetData: '{"valgteEndringer":{"arbeidstid":false,"lovbestemtFerie":true}}',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: { perioder: {} },
                                lovbestemtFerie: { perioder: { '2025-08-05/2025-08-07': { skalHaFerie: true } } },
                                arbeidstid: { arbeidstakerList: [] },
                                uttak: { perioder: {} },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '454043721',
                                dokumentInfoId: '454457251',
                                saksnummer: '100097Y',
                                tittel: 'Endringsmelding for pleiepenger sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454043721/454457251/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-11-10T07:52:11', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-11-10T07:52:11', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-11-10T07:52:19', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-11-10T07:51:59', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [],
                    },
                    {
                        søknadId: 'e18b14bf-5ac1-4a8c-be51-4a3f2ebf39cc',
                        mottattTidspunkt: '2025-09-13T12:21:58Z',
                        innsendelsestype: 'SØKNAD',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-09-13T12:21:55.418Z',
                            søknadId: 'e18b14bf-5ac1-4a8c-be51-4a3f2ebf39cc',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049' },
                                søknadsperiode: ['2025-09-08/2025-09-19'],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                annetDataBruktTilUtledning: {
                                    harForståttRettigheterOgPlikter: true,
                                    harBekreftetOpplysninger: true,
                                    soknadDialogCommitSha: '2025.09.13-12.14-d6f2537',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: {
                                    perioder: {
                                        '2025-09-08/2025-09-08': { etablertTilsynTimerPerDag: 'PT0S' },
                                        '2025-09-09/2025-09-09': { etablertTilsynTimerPerDag: 'PT4H' },
                                        '2025-09-10/2025-09-10': { etablertTilsynTimerPerDag: 'PT0S' },
                                        '2025-09-11/2025-09-11': { etablertTilsynTimerPerDag: 'PT0S' },
                                        '2025-09-12/2025-09-12': { etablertTilsynTimerPerDag: 'PT0S' },
                                        '2025-09-13/2025-09-19': { etablertTilsynTimerPerDag: 'PT0S' },
                                    },
                                },
                                lovbestemtFerie: { perioder: {} },
                                arbeidstid: {
                                    arbeidstakerList: [
                                        {
                                            organisasjonsnummer: '896929119',
                                            organisasjonsnavn: 'SAUEFABRIKK',
                                            arbeidstidInfo: {
                                                perioder: {
                                                    '2025-09-08/2025-09-19': {
                                                        jobberNormaltTimerPerDag: 'PT4H36M',
                                                        faktiskArbeidTimerPerDag: 'PT0S',
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                    frilanserArbeidstidInfo: {
                                        perioder: {
                                            '2025-09-08/2025-09-19': {
                                                jobberNormaltTimerPerDag: 'PT0S',
                                                faktiskArbeidTimerPerDag: 'PT0S',
                                            },
                                        },
                                    },
                                },
                                uttak: {
                                    perioder: { '2025-09-08/2025-09-19': { timerPleieAvBarnetPerDag: 'PT7H30M' } },
                                },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '454017605',
                                dokumentInfoId: '454427849',
                                saksnummer: '100097Y',
                                tittel: 'Søknad om pleiepenger for sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454017605/454427849/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-09-13T14:21:58', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-09-13T14:21:58', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-09-13T14:22:06', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-09-13T14:21:55', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [{ organisasjonsnummer: '896929119', navn: 'SAUEFABRIKK' }],
                    },
                    {
                        søknadId: 'b6d83bac-4935-4f2b-be82-49cb858f8a20',
                        mottattTidspunkt: '2025-08-28T09:35:36Z',
                        innsendelsestype: 'SØKNAD',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-08-28T09:35:35.495Z',
                            søknadId: 'b6d83bac-4935-4f2b-be82-49cb858f8a20',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049' },
                                søknadsperiode: ['2025-08-04/2025-08-10'],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                annetDataBruktTilUtledning: {
                                    harForståttRettigheterOgPlikter: true,
                                    harBekreftetOpplysninger: true,
                                    soknadDialogCommitSha: '2025.08.28-09.21-fae5117',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: {
                                    perioder: { '2025-08-04/2025-08-10': { etablertTilsynTimerPerDag: 'PT0S' } },
                                },
                                lovbestemtFerie: { perioder: {} },
                                arbeidstid: {
                                    arbeidstakerList: [
                                        {
                                            organisasjonsnummer: '896929119',
                                            organisasjonsnavn: 'SAUEFABRIKK',
                                            arbeidstidInfo: {
                                                perioder: {
                                                    '2025-08-04/2025-08-10': {
                                                        jobberNormaltTimerPerDag: 'PT6H',
                                                        faktiskArbeidTimerPerDag: 'PT0S',
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                    frilanserArbeidstidInfo: {
                                        perioder: {
                                            '2025-08-04/2025-08-10': {
                                                jobberNormaltTimerPerDag: 'PT0S',
                                                faktiskArbeidTimerPerDag: 'PT0S',
                                            },
                                        },
                                    },
                                },
                                uttak: {
                                    perioder: { '2025-08-04/2025-08-10': { timerPleieAvBarnetPerDag: 'PT7H30M' } },
                                },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '454011556',
                                dokumentInfoId: '454421075',
                                saksnummer: '100097Y',
                                tittel: 'Søknad om pleiepenger for sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454011556/454421075/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-08-28T11:35:36', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-08-28T11:35:36', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-08-28T11:35:45', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-08-28T11:35:35', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [{ organisasjonsnummer: '896929119', navn: 'SAUEFABRIKK' }],
                    },
                    {
                        søknadId: '9c87b7c2-3ea1-40c0-93be-63dcb5648326',
                        mottattTidspunkt: '2025-04-22T10:26:51Z',
                        innsendelsestype: 'SØKNAD',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-04-22T10:26:41.736Z',
                            søknadId: '9c87b7c2-3ea1-40c0-93be-63dcb5648326',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049' },
                                søknadsperiode: ['2025-04-07/2025-04-13'],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                annetDataBruktTilUtledning: {
                                    harForståttRettigheterOgPlikter: true,
                                    harBekreftetOpplysninger: true,
                                    soknadDialogCommitSha: '2025.04.22-10.16-a73ccd2',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: {
                                    perioder: { '2025-04-07/2025-04-13': { etablertTilsynTimerPerDag: 'PT0S' } },
                                },
                                lovbestemtFerie: { perioder: {} },
                                arbeidstid: {
                                    arbeidstakerList: [
                                        {
                                            organisasjonsnummer: '896929119',
                                            organisasjonsnavn: 'SAUEFABRIKK',
                                            arbeidstidInfo: {
                                                perioder: {
                                                    '2025-04-07/2025-04-13': {
                                                        jobberNormaltTimerPerDag: 'PT4H',
                                                        faktiskArbeidTimerPerDag: 'PT0S',
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                    frilanserArbeidstidInfo: {
                                        perioder: {
                                            '2025-04-07/2025-04-13': {
                                                jobberNormaltTimerPerDag: 'PT0S',
                                                faktiskArbeidTimerPerDag: 'PT0S',
                                            },
                                        },
                                    },
                                },
                                uttak: {
                                    perioder: { '2025-04-07/2025-04-13': { timerPleieAvBarnetPerDag: 'PT7H30M' } },
                                },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '453982807',
                                dokumentInfoId: '454388376',
                                saksnummer: '100097Y',
                                tittel: 'Søknad om pleiepenger for sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/453982807/454388376/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-04-22T12:26:51', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-04-22T12:26:51', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-04-22T12:27:01', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-04-22T12:26:41', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [{ organisasjonsnummer: '896929119', navn: 'SAUEFABRIKK' }],
                    },
                    {
                        søknadId: '212c4ae0-0a34-4493-a39b-0b51af9d9b9a',
                        mottattTidspunkt: '2025-08-03T06:21:24.452Z',
                        innsendelsestype: 'ETTERSENDELSE',
                        k9FormatInnsendelse: {
                            versjon: '0.0.1',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-08-03T08:21:24.452Z',
                            søknadId: '212c4ae0-0a34-4493-a39b-0b51af9d9b9a',
                            ytelse: 'PLEIEPENGER_SYKT_BARN',
                        },
                        dokumenter: [
                            {
                                journalpostId: '454004138',
                                dokumentInfoId: '454412640',
                                saksnummer: '100097Y',
                                tittel: 'Ettersendelse av dokumentasjon til søknad om pleiepenger',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_ETTERSENDELSE',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454004138/454412640/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-08-03T10:21:27', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-08-03T10:21:27', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-08-03T10:21:36', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-08-03T10:21:24', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                            {
                                journalpostId: '454004138',
                                dokumentInfoId: '454412641',
                                saksnummer: '100097Y',
                                tittel: 'Floral_Ornament.jpg',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_ETTERSENDELSE',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454004138/454412641/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-08-03T10:21:27', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-08-03T10:21:27', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-08-03T10:21:36', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-08-03T10:21:24', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                    },
                    {
                        søknadId: '9c6fec9d-7614-48e6-abf9-7fe05da4db56',
                        mottattTidspunkt: '2025-08-05T11:11:14Z',
                        innsendelsestype: 'SØKNAD',
                        k9FormatInnsendelse: {
                            versjon: '1.0.0',
                            søker: { norskIdentitetsnummer: '20469134998' },
                            mottattDato: '2025-08-05T11:11:12.086Z',
                            søknadId: '9c6fec9d-7614-48e6-abf9-7fe05da4db56',
                            ytelse: {
                                type: 'PLEIEPENGER_SYKT_BARN',
                                barn: { norskIdentitetsnummer: '14441750049' },
                                søknadsperiode: ['2025-08-12/2025-08-12'],
                                endringsperiode: [],
                                trekkKravPerioder: [],
                                opptjeningAktivitet: {},
                                annetDataBruktTilUtledning: {
                                    harForståttRettigheterOgPlikter: true,
                                    harBekreftetOpplysninger: true,
                                    soknadDialogCommitSha: '2025.08.05-09.39-4f56e63',
                                },
                                bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                                utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                                beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                                nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                                tilsynsordning: {
                                    perioder: { '2025-08-12/2025-08-12': { etablertTilsynTimerPerDag: 'PT0S' } },
                                },
                                lovbestemtFerie: { perioder: {} },
                                arbeidstid: {
                                    arbeidstakerList: [
                                        {
                                            organisasjonsnummer: '896929119',
                                            organisasjonsnavn: 'SAUEFABRIKK',
                                            arbeidstidInfo: {
                                                perioder: {
                                                    '2025-08-12/2025-08-12': {
                                                        jobberNormaltTimerPerDag: 'PT2H',
                                                        faktiskArbeidTimerPerDag: 'PT0S',
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                    frilanserArbeidstidInfo: {
                                        perioder: {
                                            '2025-08-12/2025-08-12': {
                                                jobberNormaltTimerPerDag: 'PT0S',
                                                faktiskArbeidTimerPerDag: 'PT0S',
                                            },
                                        },
                                    },
                                },
                                uttak: {
                                    perioder: { '2025-08-12/2025-08-12': { timerPleieAvBarnetPerDag: 'PT7H30M' } },
                                },
                                omsorg: {},
                            },
                        },
                        dokumenter: [
                            {
                                journalpostId: '454004464',
                                dokumentInfoId: '454413013',
                                saksnummer: '100097Y',
                                tittel: 'Søknad om pleiepenger for sykt barn',
                                dokumentType: 'PLEIEPENGER_SYKT_BARN_SOKNAD',
                                filtype: 'PDF',
                                harTilgang: true,
                                url: 'http://sif-innsyn-api/dokument/454004464/454413013/ARKIV',
                                relevanteDatoer: [
                                    { dato: '2025-08-05T13:11:14', datotype: 'DATO_OPPRETTET' },
                                    { dato: '2025-08-05T13:11:14', datotype: 'DATO_DOKUMENT' },
                                    { dato: '2025-08-05T13:11:21', datotype: 'DATO_JOURNALFOERT' },
                                    { dato: '2025-08-05T13:11:12', datotype: 'DATO_REGISTRERT' },
                                ],
                            },
                        ],
                        arbeidsgivere: [{ organisasjonsnummer: '896929119', navn: 'SAUEFABRIKK' }],
                    },
                ],
                aksjonspunkter: [],
                utgåendeDokumenter: [],
            },
        ],
    },
];

const saksbehandlingstid = { saksbehandlingstidUker: 7 };

export const toSakerMockData = {
    søker,
    sakerMetadata,
    saker,
    saksbehandlingstid,
};
