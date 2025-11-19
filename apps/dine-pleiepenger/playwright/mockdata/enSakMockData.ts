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
        saksnummer: '1001F8G',
        pleietrengende: {
            identitetsnummer: '22521885096',
            fødselsdato: '2018-12-22',
            aktørId: '2959134453538',
            fornavn: 'GOD',
            etternavn: 'BALSAM',
        },
        fagsakYtelseType: 'PSB',
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
];

const saksbehandlingstid = { saksbehandlingstidUker: 7 };

export const enSakMockData = {
    søker,
    sakerMetadata,
    saker,
    saksbehandlingstid,
};
