export const søknaderMockData = [
    {
        søknadId: '9054ab9e-2b82-4998-9f10-9a82827f06e9',
        søknadstype: 'PP_SYKT_BARN_ENDRINGSMELDING',
        status: 'MOTTATT',
        søknad: {
            søker: {
                fornavn: 'KRIMINELL',
                aktørId: '2391969373424',
                etternavn: 'MULDVARP',
                fødselsnummer: '17097721564',
            },
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiJiM2VlZDljMy0zNDhjLTQ2NGEtYWRkNS1lYmQ3ZGFlMzU5ZGYifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiJmZjMwZGRhZi1lN2M3LTRlY2UtOWZhNC03ODZmZGVhZDg2MDEifQ',
                ],
            ],
            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '17097721564' },
                ytelse: {
                    barn: { fødselsdato: '2009-07-31', norskIdentitetsnummer: '31070968161' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: {} },
                    omsorg: {},
                    bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                    beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                    nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2021-12-07/2021-12-07': {
                                            faktiskArbeidTimerPerDag: 'PT2M',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                    },
                    tilsynsordning: { perioder: {} },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: {} },
                    søknadsperiode: [],
                    utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: {},
                },
                versjon: '1.0.0',
                søknadId: '9054ab9e-2b82-4998-9f10-9a82827f06e9',
                mottattDato: '2022-01-31T13:40:00.621Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
        },
        saksId: '1DMR9RQ',
        journalpostId: '524277209',
        dokumenter: [
            {
                journalpostId: '524277209',
                dokumentInfoId: '548469861',
                sakId: '1DMR9RQ',
                tittel: 'Endringsmelding om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'https://sif-innsyn-api.dev.nav.no/dokument/524277209/548469861/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-01-31T14:40:02', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-01-31T14:40:02', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-01-31T14:40:06', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-01-31T01:00', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2023-01-31T13:40:00.621Z',
        endret: '2023-01-31T14:40:11',
        behandlingsdato: null,
    },
    {
        søknadId: '9a562927-bd1c-4b4f-b901-07180ff67b66',
        søknadstype: 'PP_SYKT_BARN',
        status: 'MOTTATT',
        søknad: {
            barn: {
                navn: 'ALFABETISK FAGOTT',
                aktørId: '2811762539343',
                fødselsdato: '2019-06-08',
                fødselsnummer: '08861999573',
            },
            språk: 'nb',
            søker: {
                fornavn: 'PRESENTABEL',
                aktørId: '2320509955297',
                etternavn: 'HOFTE',
                fødselsnummer: '02869599258',
            },
            frilans: {
                startdato: '2022-10-10',
                arbeidsforhold: {
                    arbeidIPeriode: {
                        type: 'ARBEIDER_ULIKE_UKER_PROSENT',
                        arbeidsuker: [
                            {
                                periode: { fraOgMed: '2022-10-10', tilOgMed: '2022-10-13' },
                                prosentAvNormalt: 20,
                            },
                        ],
                        arbeiderIPerioden: 'REDUSERT',
                    },
                    normalarbeidstid: { timerPerUkeISnitt: 'PT5H' },
                },
                harInntektSomFrilanser: true,
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2022-10-26T23:17:30.794068129Z',
            fraOgMed: '2022-10-03',
            tilOgMed: '2022-10-13',
            søknadId: '9a562927-bd1c-4b4f-b901-07180ff67b66',
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiJkYWUzNjliZS1iMjMzLTRhM2MtOWYxNy0zMzdjNjRkOGEyNzUifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiIzYzlhYWRiNi03OWRjLTRjODYtYjFlZi05YTBlNjIyNjNmZjUifQ',
                ],
            ],
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: false,
                harBoddIUtlandetSiste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            },
            harMedsøker: false,
            arbeidsgivere: {
                organisasjoner: [
                    {
                        navn: 'SJOKKERENDE ELEKTRIKER',
                        skalJobbe: true,
                        skalJobbeProsent: 10,
                        vetIkkeEkstrainfo: undefined,
                        jobberNormaltTimer: 10,
                        organisasjonsnummer: '234',
                    },
                ],
            },

            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '02869599258' },
                ytelse: {
                    barn: { norskIdentitetsnummer: '08861999573' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: { '2022-10-03/2022-10-13': { timerPleieAvBarnetPerDag: 'PT7H30M' } } },
                    omsorg: {},
                    bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                    beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                    nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2022-10-03/2022-10-13': {
                                            faktiskArbeidTimerPerDag: 'PT30M',
                                            jobberNormaltTimerPerDag: 'PT1H',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                        frilanserArbeidstidInfo: {
                            perioder: {
                                '2022-10-03/2022-10-09': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT0S',
                                },
                                '2022-10-10/2022-10-13': {
                                    faktiskArbeidTimerPerDag: 'PT12M',
                                    jobberNormaltTimerPerDag: 'PT1H',
                                },
                            },
                        },
                    },
                    tilsynsordning: {
                        perioder: { '2022-10-03/2022-10-13': { etablertTilsynTimerPerDag: 'PT0S' } },
                    },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: {} },
                    søknadsperiode: ['2022-10-03/2022-10-13'],
                    utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: { frilanser: { startdato: '2022-10-10' } },
                    dataBruktTilUtledning: {
                        harMedsøker: false,
                        harBekreftetOpplysninger: true,
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                versjon: '1.0.0',
                søknadId: '9a562927-bd1c-4b4f-b901-07180ff67b66',
                mottattDato: '2022-10-26T23:17:30.794Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
            utenlandskNæring: [],
            ferieuttakIPerioden: { ferieuttak: [], skalTaUtFerieIPerioden: false },
            opptjeningIUtlandet: [],
            harBekreftetOpplysninger: true,
            utenlandsoppholdIPerioden: { opphold: [], skalOppholdeSegIUtlandetIPerioden: false },
            selvstendigNæringsdrivende: { harInntektSomSelvstendig: false },
            harForstattRettigheterOgPlikter: true,
        },
        saksId: '1DNM1SM',
        journalpostId: '573788132',
        dokumenter: [
            {
                journalpostId: '573788132',
                dokumentInfoId: '599051418',
                sakId: '1DNM1SM',
                tittel: 'Søknad om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573788132/599051418/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-10-27T01:17:36', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-10-27T01:17:36', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-10-27T01:17:42', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-10-27T01:17:30', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-10-26T23:17:30.794Z',
        endret: '2022-10-26T23:17:47',
        behandlingsdato: null,
    },
    {
        søknadId: '64f75397-b4f7-419a-9147-0cd803446f4b',
        søknadstype: 'PP_SYKT_BARN',
        status: 'MOTTATT',
        søknad: {
            barn: {
                navn: 'ALFABETISK FAGOTT',
                aktørId: '2811762539343',
                fødselsdato: '2019-06-08',
                fødselsnummer: '08861999573',
            },
            språk: 'nb',
            søker: {
                fornavn: 'PRESENTABEL',
                aktørId: '2320509955297',
                etternavn: 'HOFTE',
                fødselsnummer: '02869599258',
            },
            frilans: {
                startdato: '2014-10-16',
                arbeidsforhold: {
                    arbeidIPeriode: { type: 'ARBEIDER_IKKE', arbeiderIPerioden: 'HELT_FRAVÆR' },
                    normalarbeidstid: { erLiktHverUke: true, timerPerUkeISnitt: 'PT5H' },
                },
                harInntektSomFrilanser: true,
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2022-10-13T14:44:14.834424102Z',
            fraOgMed: '2022-10-01',
            tilOgMed: '2022-10-30',
            søknadId: '64f75397-b4f7-419a-9147-0cd803446f4b',
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiIwOTA4ODg4OC0zZTcxLTQ0OGEtYTZmMy1hZDg4ZDI4NDViZGQifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiI3ZjJlYWIyMS04MjEwLTRiZmQtODc0NS1kYzFiZDU0MTAxMzIifQ',
                ],
            ],
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: false,
                harBoddIUtlandetSiste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            },
            harMedsøker: false,
            arbeidsgivere: [
                {
                    navn: 'SJOKKERENDE ELEKTRIKER',
                    erAnsatt: true,
                    arbeidsforhold: {
                        arbeidIPeriode: {
                            type: 'ARBEIDER_PROSENT_AV_NORMALT',
                            prosentAvNormalt: 50,
                            arbeiderIPerioden: 'REDUSERT',
                        },
                        normalarbeidstid: { erLiktHverUke: true, timerPerUkeISnitt: 'PT20H' },
                    },
                    organisasjonsnummer: '947064649',
                    sluttetFørSøknadsperiode: false,
                },
            ],
            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '02869599258' },
                ytelse: {
                    barn: { norskIdentitetsnummer: '08861999573' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: { '2022-10-01/2022-10-30': { timerPleieAvBarnetPerDag: 'PT7H30M' } } },
                    omsorg: {},
                    bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                    beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                    nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2022-10-01/2022-10-30': {
                                            faktiskArbeidTimerPerDag: 'PT2H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                        frilanserArbeidstidInfo: {
                            perioder: {
                                '2022-10-01/2022-10-30': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT1H',
                                },
                            },
                        },
                    },
                    tilsynsordning: {
                        perioder: { '2022-10-01/2022-10-30': { etablertTilsynTimerPerDag: 'PT0S' } },
                    },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: {} },
                    søknadsperiode: ['2022-10-01/2022-10-30'],
                    utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: { frilanser: { startdato: '2014-10-16' } },
                    dataBruktTilUtledning: {
                        harMedsøker: false,
                        harBekreftetOpplysninger: true,
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                versjon: '1.0.0',
                søknadId: '64f75397-b4f7-419a-9147-0cd803446f4b',
                mottattDato: '2022-10-13T14:44:14.834Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
            utenlandskNæring: [],
            ferieuttakIPerioden: { ferieuttak: [], skalTaUtFerieIPerioden: false },
            opptjeningIUtlandet: [],
            harBekreftetOpplysninger: true,
            utenlandsoppholdIPerioden: { opphold: [], skalOppholdeSegIUtlandetIPerioden: false },
            selvstendigNæringsdrivende: { harInntektSomSelvstendig: false },
            harForstattRettigheterOgPlikter: true,
        },
        saksId: '1DNM1SM',
        journalpostId: '573786100',
        dokumenter: [
            {
                journalpostId: '573786100',
                dokumentInfoId: '599048863',
                sakId: '1DNM1SM',
                tittel: 'Søknad om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573786100/599048863/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-10-13T16:44:18', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-10-13T16:44:18', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-10-13T16:44:24', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-10-13T16:44:14', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-10-13T14:44:14.834Z',
        endret: '2022-10-13T14:44:28',
        behandlingsdato: null,
    },
    {
        søknadId: '14a13a07-8634-4c8e-88c9-49e25823260a',
        søknadstype: 'PP_SYKT_BARN',
        status: 'MOTTATT',
        søknad: {
            barn: { navn: 'SKRIVEFØR FRENDE', fødselsdato: '2020-04-20', fødselsnummer: '20842099774' },
            språk: 'nb',
            søker: {
                fornavn: 'PRESENTABEL',
                aktørId: '2320509955297',
                etternavn: 'HOFTE',
                fødselsnummer: '02869599258',
            },
            frilans: { harInntektSomFrilanser: false },
            mottatt: '2022-08-25T09:43:41.082124107Z',
            fraOgMed: '2022-08-09',
            tilOgMed: '2022-09-10',
            søknadId: '14a13a07-8634-4c8e-88c9-49e25823260a',
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiIzYTA2MWI1ZS1hNGIwLTQ1MTMtYmRjNC1jY2I1YWViNjZiMWEifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiJkMTA1YWExNS02ZWVhLTQ1MDAtOTZjOC0wYzJjNzg1YjhlMjMifQ',
                ],
            ],
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: false,
                harBoddIUtlandetSiste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            },
            harMedsøker: false,
            arbeidsgivere: [
                {
                    navn: 'SJOKKERENDE ELEKTRIKER',
                    erAnsatt: true,
                    arbeidsforhold: {
                        arbeidIPeriode: {
                            type: 'ARBEIDER_ENKELTDAGER',
                            enkeltdager: [
                                {
                                    dato: '2022-08-09',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-08-10',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-08-15',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-08-16',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-08-17',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT3H' },
                                },
                                {
                                    dato: '2022-08-22',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-08-23',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-08-24',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT3H' },
                                },
                                {
                                    dato: '2022-08-29',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-08-30',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-08-31',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT3H' },
                                },
                                {
                                    dato: '2022-09-05',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-09-06',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-09-07',
                                    arbeidstimer: { normalTimer: 'PT4H', faktiskTimer: 'PT3H' },
                                },
                            ],
                            arbeiderIPerioden: 'REDUSERT',
                        },
                        normalarbeidstid: {
                            erLiktHverUke: true,
                            timerFasteDager: { mandag: 'PT4H', onsdag: 'PT4H', tirsdag: 'PT4H' },
                        },
                    },
                    organisasjonsnummer: '947064649',
                    sluttetFørSøknadsperiode: false,
                },
            ],
            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '02869599258' },
                ytelse: {
                    barn: { norskIdentitetsnummer: '20842099774' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: { '2022-08-09/2022-09-10': { timerPleieAvBarnetPerDag: 'PT7H30M' } } },
                    omsorg: {},
                    bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                    beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                    nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2022-08-09/2022-08-09': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-10/2022-08-10': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-15/2022-08-15': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-16/2022-08-16': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-17/2022-08-17': {
                                            faktiskArbeidTimerPerDag: 'PT3H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-22/2022-08-22': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-23/2022-08-23': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-24/2022-08-24': {
                                            faktiskArbeidTimerPerDag: 'PT3H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-29/2022-08-29': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-30/2022-08-30': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-31/2022-08-31': {
                                            faktiskArbeidTimerPerDag: 'PT3H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-09-05/2022-09-05': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-09-06/2022-09-06': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-09-07/2022-09-07': {
                                            faktiskArbeidTimerPerDag: 'PT3H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                        frilanserArbeidstidInfo: {
                            perioder: {
                                '2022-08-09/2022-09-10': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT0S',
                                },
                            },
                        },
                    },
                    tilsynsordning: {
                        perioder: { '2022-08-09/2022-09-10': { etablertTilsynTimerPerDag: 'PT0S' } },
                    },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: {} },
                    søknadsperiode: ['2022-08-09/2022-09-10'],
                    utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: {},
                    dataBruktTilUtledning: {
                        harMedsøker: false,
                        harBekreftetOpplysninger: true,
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                versjon: '1.0.0',
                søknadId: '14a13a07-8634-4c8e-88c9-49e25823260a',
                mottattDato: '2022-08-25T09:43:41.082Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
            utenlandskNæring: [],
            ferieuttakIPerioden: { ferieuttak: [], skalTaUtFerieIPerioden: false },
            opptjeningIUtlandet: [],
            harBekreftetOpplysninger: true,
            utenlandsoppholdIPerioden: { opphold: [], skalOppholdeSegIUtlandetIPerioden: false },
            selvstendigNæringsdrivende: { harInntektSomSelvstendig: false },
            harForstattRettigheterOgPlikter: true,
        },
        saksId: '1DNKKFS',
        journalpostId: '573776664',
        dokumenter: [
            {
                journalpostId: '573776664',
                dokumentInfoId: '599037904',
                sakId: '1DNKKFS',
                tittel: 'Søknad om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573776664/599037904/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-08-25T11:43:43', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-08-25T11:43:43', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-08-25T11:43:48', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-08-25T11:43:41', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-08-25T09:43:41.082Z',
        endret: '2022-08-25T09:43:54',
        behandlingsdato: null,
    },
    {
        søknadId: '6de9b420-c11a-4722-b7a1-63e63c73f329',
        søknadstype: 'PP_ETTERSENDELSE',
        status: 'MOTTATT',
        søknad: {
            sprak: 'nb',
            søker: {
                fornavn: 'PRESENTABEL',
                aktørId: '2320509955297',
                etternavn: 'HOFTE',
                fødselsdato: '1995-06-02',
                fødselsnummer: '02869599258',
            },
            titler: ['IMG_1616.jpg'],
            mottatt: '2022-11-07T19:20:13.969148693Z',
            k9Format: {
                søker: { norskIdentitetsnummer: '02869599258' },
                ytelse: 'PLEIEPENGER_SYKT_BARN',
                versjon: '0.0.1',
                søknadId: '6de9b420-c11a-4722-b7a1-63e63c73f329',
                mottattDato: '2022-11-07T19:20:13.969Z',
            },
            soknadId: '6de9b420-c11a-4722-b7a1-63e63c73f329',
            vedleggId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiJmZTEzZDM1ZS00YzVmLTQwZGQtOGRlNy1iN2Q3OTE0NzllNzgifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiIzNWE5ZTlkYS1hNDg4LTQ4NTMtODRhNC1jNjhlYzVjZjRjYmQifQ',
                ],
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiI0OTljMjQ1NC0wOWE3LTQ0NTUtYmJmYS1iYmFjNGUwM2UzOWUifQ',
                ],
            ],
            beskrivelse: 'Dette er en liten tset',
            søknadstype: 'PLEIEPENGER_SYKT_BARN',
            harBekreftetOpplysninger: true,
            harForstattRettigheterOgPlikter: true,
        },
        saksId: null,
        journalpostId: '573802533',
        dokumenter: [
            {
                journalpostId: '573802533',
                dokumentInfoId: '599105542',
                sakId: null,
                tittel: 'Ettersendelse pleiepenger sykt barn',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573802533/599105542/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-11-07T20:20:26', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-11-07T20:20:26', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-11-07T20:20:13', datotype: 'DATO_REGISTRERT' },
                ],
            },
            {
                journalpostId: '573802533',
                dokumentInfoId: '599105543',
                sakId: null,
                tittel: 'IMG_1616.jpg',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573802533/599105543/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-11-07T20:20:26', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-11-07T20:20:26', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-11-07T20:20:13', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-11-07T19:20:13.969Z',
        endret: '2022-11-07T19:20:26',
        behandlingsdato: null,
    },
    {
        søknadId: '8f968f00-6ecc-4e78-a5ab-11ff175db3bb',
        søknadstype: 'PP_SYKT_BARN',
        status: 'MOTTATT',
        søknad: {
            barn: {
                navn: 'ALFABETISK FAGOTT',
                aktørId: '2811762539343',
                fødselsdato: '2019-06-08',
                fødselsnummer: '08861999573',
            },
            språk: 'nb',
            søker: {
                fornavn: 'PRESENTABEL',
                aktørId: '2320509955297',
                etternavn: 'HOFTE',
                fødselsnummer: '02869599258',
            },
            frilans: {
                startdato: '2016-11-08',
                arbeidsforhold: {
                    arbeidIPeriode: {
                        type: 'ARBEIDER_ULIKE_UKER_TIMER',
                        arbeidsuker: [
                            { timer: 'PT2H', periode: { fraOgMed: '2022-11-01', tilOgMed: '2022-11-06' } },
                            { timer: 'PT2H', periode: { fraOgMed: '2022-11-07', tilOgMed: '2022-11-13' } },
                            { timer: 'PT5H', periode: { fraOgMed: '2022-11-14', tilOgMed: '2022-11-19' } },
                        ],
                        arbeiderIPerioden: 'REDUSERT',
                    },
                    normalarbeidstid: { timerPerUkeISnitt: 'PT5H' },
                },
                harInntektSomFrilanser: true,
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2022-11-08T07:00:06.249453556Z',
            fraOgMed: '2022-11-01',
            tilOgMed: '2022-11-19',
            søknadId: '8f968f00-6ecc-4e78-a5ab-11ff175db3bb',
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiI1ZDExZjE5Yy1mZTY5LTRkOWYtYTY5Ni00M2YxNDY0M2QzYjgifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiI4MGIxOWZhNS1mZDUzLTQ0MmItYWJmYy05ZTE4NTA3ZDBlODYifQ',
                ],
            ],
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: true,
                harBoddIUtlandetSiste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [
                    {
                        fraOgMed: '2022-11-23',
                        landkode: 'ASM',
                        landnavn: 'Amerikansk Samoa',
                        tilOgMed: '2022-12-23',
                    },
                ],
                utenlandsoppholdSiste12Mnd: [],
            },
            harMedsøker: false,
            arbeidsgivere: [
                {
                    navn: 'SJOKKERENDE ELEKTRIKER',
                    erAnsatt: true,
                    arbeidsforhold: {
                        arbeidIPeriode: {
                            type: 'ARBEIDER_PROSENT_AV_NORMALT',
                            prosentAvNormalt: 50,
                            arbeiderIPerioden: 'REDUSERT',
                        },
                        normalarbeidstid: { timerPerUkeISnitt: 'PT20H' },
                    },
                    organisasjonsnummer: '947064649',
                    sluttetFørSøknadsperiode: false,
                },
            ],
            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '02869599258' },
                ytelse: {
                    barn: { norskIdentitetsnummer: '08861999573' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: { '2022-11-01/2022-11-19': { timerPleieAvBarnetPerDag: 'PT7H30M' } } },
                    omsorg: {},
                    bosteder: {
                        perioder: { '2022-11-23/2022-12-23': { land: 'ASM' } },
                        perioderSomSkalSlettes: {},
                    },
                    beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                    nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2022-11-01/2022-11-19': {
                                            faktiskArbeidTimerPerDag: 'PT2H',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                        frilanserArbeidstidInfo: {
                            perioder: {
                                '2022-11-01/2022-11-04': {
                                    faktiskArbeidTimerPerDag: 'PT30M',
                                    jobberNormaltTimerPerDag: 'PT1H',
                                },
                                '2022-11-07/2022-11-11': {
                                    faktiskArbeidTimerPerDag: 'PT24M',
                                    jobberNormaltTimerPerDag: 'PT1H',
                                },
                                '2022-11-14/2022-11-18': {
                                    faktiskArbeidTimerPerDag: 'PT1H',
                                    jobberNormaltTimerPerDag: 'PT1H',
                                },
                            },
                        },
                    },
                    tilsynsordning: {
                        perioder: { '2022-11-01/2022-11-19': { etablertTilsynTimerPerDag: 'PT0S' } },
                    },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: {} },
                    søknadsperiode: ['2022-11-01/2022-11-19'],
                    utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: { frilanser: { startdato: '2016-11-08' } },
                    dataBruktTilUtledning: {
                        harMedsøker: false,
                        harBekreftetOpplysninger: true,
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                versjon: '1.0.0',
                søknadId: '8f968f00-6ecc-4e78-a5ab-11ff175db3bb',
                mottattDato: '2022-11-08T07:00:06.249Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
            utenlandskNæring: [],
            ferieuttakIPerioden: { ferieuttak: [], skalTaUtFerieIPerioden: false },
            opptjeningIUtlandet: [],
            harBekreftetOpplysninger: true,
            utenlandsoppholdIPerioden: { opphold: [], skalOppholdeSegIUtlandetIPerioden: false },
            selvstendigNæringsdrivende: { harInntektSomSelvstendig: false },
            harForstattRettigheterOgPlikter: true,
        },
        saksId: null,
        journalpostId: '573802547',
        dokumenter: [
            {
                journalpostId: '573802547',
                dokumentInfoId: '599105571',
                sakId: null,
                tittel: 'Søknad om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573802547/599105571/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-11-08T08:00:10', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-11-08T08:00:10', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-11-08T08:00:06', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-11-08T07:00:06.249Z',
        endret: '2022-11-08T07:00:10',
        behandlingsdato: null,
    },
    {
        søknadId: '863d6bd3-b939-47aa-9653-cbfc7cc11367',
        søknadstype: 'PP_SYKT_BARN',
        status: 'MOTTATT',
        søknad: {
            barn: {
                navn: 'ALFABETISK FAGOTT',
                aktørId: '2811762539343',
                fødselsdato: '2019-06-08',
                fødselsnummer: '08861999573',
            },
            språk: 'nb',
            søker: {
                fornavn: 'PRESENTABEL',
                aktørId: '2320509955297',
                etternavn: 'HOFTE',
                fødselsnummer: '02869599258',
            },
            frilans: {
                startdato: '2016-09-07',
                arbeidsforhold: {
                    arbeidIPeriode: {
                        type: 'ARBEIDER_PROSENT_AV_NORMALT',
                        prosentAvNormalt: 10,
                        arbeiderIPerioden: 'REDUSERT',
                    },
                    normalarbeidstid: { erLiktHverUke: false, timerPerUkeISnitt: 'PT20H' },
                },
                harInntektSomFrilanser: true,
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2022-09-02T08:20:45.437124664Z',
            fraOgMed: '2022-08-01',
            tilOgMed: '2022-09-30',
            beredskap: { beredskap: true, tilleggsinformasjon: 'Beskrivelse av beredskap' },
            nattevåk: { harNattevåk: true, tilleggsinformasjon: 'Beskrivelse av nattevåk' },
            søknadId: '863d6bd3-b939-47aa-9653-cbfc7cc11367',
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiI0NzE4Y2NjYi02ZmQ0LTQxOTgtYTU5NS0xMzUyYWMzMDZjOTQifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiIwMjRmNDM3MC1mMGY3LTRkNmItYWUwZS01YmI0YmZjZDNhZGQifQ',
                ],
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiIzMjhkZDllNi1hNzVmLTQ2ZWUtOGZiNi05MzNhODYwZjA4MDMifQ',
                ],
            ],
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: true,
                harBoddIUtlandetSiste12Mnd: true,
                utenlandsoppholdNeste12Mnd: [
                    {
                        fraOgMed: '2022-09-02',
                        landkode: 'ASM',
                        landnavn: 'Amerikansk Samoa',
                        tilOgMed: '2022-11-19',
                    },
                ],
                utenlandsoppholdSiste12Mnd: [
                    { fraOgMed: '2022-06-13', landkode: 'ALB', landnavn: 'Albania', tilOgMed: '2022-09-01' },
                ],
            },
            harMedsøker: true,
            arbeidsgivere: [
                {
                    navn: 'SJOKKERENDE ELEKTRIKER',
                    erAnsatt: true,
                    arbeidsforhold: {
                        arbeidIPeriode: {
                            type: 'ARBEIDER_FASTE_UKEDAGER',
                            fasteDager: {
                                fredag: 'PT5M',
                                mandag: 'PT1M',
                                onsdag: 'PT3M',
                                tirsdag: 'PT2M',
                                torsdag: 'PT4M',
                            },
                            erLiktHverUke: true,
                            arbeiderIPerioden: 'REDUSERT',
                        },
                        normalarbeidstid: {
                            erLiktHverUke: true,
                            timerFasteDager: {
                                fredag: 'PT5H',
                                mandag: 'PT1H',
                                onsdag: 'PT3H',
                                tirsdag: 'PT2H',
                                torsdag: 'PT4H',
                            },
                        },
                    },
                    organisasjonsnummer: '947064649',
                    sluttetFørSøknadsperiode: false,
                },
            ],
            omsorgstilbud: {
                ukedager: {
                    fredag: 'PT1H5M',
                    mandag: 'PT5H1M',
                    onsdag: 'PT3H3M',
                    tirsdag: 'PT4H3M',
                    torsdag: 'PT2H4M',
                },
                erLiktHverUke: true,
            },
            samtidigHjemme: true,
            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '02869599258' },
                ytelse: {
                    barn: { norskIdentitetsnummer: '08861999573' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: { '2022-08-01/2022-09-30': { timerPleieAvBarnetPerDag: 'PT7H30M' } } },
                    omsorg: {},
                    bosteder: {
                        perioder: {
                            '2022-06-13/2022-09-01': { land: 'ALB' },
                            '2022-09-02/2022-11-19': { land: 'ASM' },
                        },
                        perioderSomSkalSlettes: {},
                    },
                    beredskap: {
                        perioder: {
                            '2022-08-01/2022-09-30': { tilleggsinformasjon: 'Beskrivelse av beredskap' },
                        },
                        perioderSomSkalSlettes: {},
                    },
                    nattevåk: {
                        perioder: {
                            '2022-08-01/2022-09-30': { tilleggsinformasjon: 'Beskrivelse av nattevåk' },
                        },
                        perioderSomSkalSlettes: {},
                    },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2022-08-01/2022-08-01': {
                                            faktiskArbeidTimerPerDag: 'PT1M',
                                            jobberNormaltTimerPerDag: 'PT1H',
                                        },
                                        '2022-08-02/2022-08-02': {
                                            faktiskArbeidTimerPerDag: 'PT2M',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-08-03/2022-08-03': {
                                            faktiskArbeidTimerPerDag: 'PT3M',
                                            jobberNormaltTimerPerDag: 'PT3H',
                                        },
                                        '2022-08-04/2022-08-04': {
                                            faktiskArbeidTimerPerDag: 'PT4M',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-05/2022-08-05': {
                                            faktiskArbeidTimerPerDag: 'PT5M',
                                            jobberNormaltTimerPerDag: 'PT5H',
                                        },
                                        '2022-08-08/2022-08-08': {
                                            faktiskArbeidTimerPerDag: 'PT1M',
                                            jobberNormaltTimerPerDag: 'PT1H',
                                        },
                                        '2022-08-09/2022-08-09': {
                                            faktiskArbeidTimerPerDag: 'PT2M',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-08-10/2022-08-10': {
                                            faktiskArbeidTimerPerDag: 'PT3M',
                                            jobberNormaltTimerPerDag: 'PT3H',
                                        },
                                        '2022-08-11/2022-08-11': {
                                            faktiskArbeidTimerPerDag: 'PT4M',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-12/2022-08-12': {
                                            faktiskArbeidTimerPerDag: 'PT5M',
                                            jobberNormaltTimerPerDag: 'PT5H',
                                        },
                                        '2022-08-15/2022-08-15': {
                                            faktiskArbeidTimerPerDag: 'PT1M',
                                            jobberNormaltTimerPerDag: 'PT1H',
                                        },
                                        '2022-08-16/2022-08-16': {
                                            faktiskArbeidTimerPerDag: 'PT2M',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-08-17/2022-08-17': {
                                            faktiskArbeidTimerPerDag: 'PT3M',
                                            jobberNormaltTimerPerDag: 'PT3H',
                                        },
                                        '2022-08-18/2022-08-18': {
                                            faktiskArbeidTimerPerDag: 'PT4M',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-19/2022-08-19': {
                                            faktiskArbeidTimerPerDag: 'PT5M',
                                            jobberNormaltTimerPerDag: 'PT5H',
                                        },
                                        '2022-08-22/2022-08-22': {
                                            faktiskArbeidTimerPerDag: 'PT1M',
                                            jobberNormaltTimerPerDag: 'PT1H',
                                        },
                                        '2022-08-23/2022-08-23': {
                                            faktiskArbeidTimerPerDag: 'PT2M',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-08-24/2022-08-24': {
                                            faktiskArbeidTimerPerDag: 'PT3M',
                                            jobberNormaltTimerPerDag: 'PT3H',
                                        },
                                        '2022-08-25/2022-08-25': {
                                            faktiskArbeidTimerPerDag: 'PT4M',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-08-26/2022-08-26': {
                                            faktiskArbeidTimerPerDag: 'PT5M',
                                            jobberNormaltTimerPerDag: 'PT5H',
                                        },
                                        '2022-08-29/2022-08-29': {
                                            faktiskArbeidTimerPerDag: 'PT1M',
                                            jobberNormaltTimerPerDag: 'PT1H',
                                        },
                                        '2022-08-30/2022-08-30': {
                                            faktiskArbeidTimerPerDag: 'PT2M',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-08-31/2022-08-31': {
                                            faktiskArbeidTimerPerDag: 'PT3M',
                                            jobberNormaltTimerPerDag: 'PT3H',
                                        },
                                        '2022-09-01/2022-09-01': {
                                            faktiskArbeidTimerPerDag: 'PT4M',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-09-02/2022-09-02': {
                                            faktiskArbeidTimerPerDag: 'PT5M',
                                            jobberNormaltTimerPerDag: 'PT5H',
                                        },
                                        '2022-09-05/2022-09-05': {
                                            faktiskArbeidTimerPerDag: 'PT1M',
                                            jobberNormaltTimerPerDag: 'PT1H',
                                        },
                                        '2022-09-06/2022-09-06': {
                                            faktiskArbeidTimerPerDag: 'PT2M',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-07/2022-09-07': {
                                            faktiskArbeidTimerPerDag: 'PT3M',
                                            jobberNormaltTimerPerDag: 'PT3H',
                                        },
                                        '2022-09-08/2022-09-08': {
                                            faktiskArbeidTimerPerDag: 'PT4M',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-09-09/2022-09-09': {
                                            faktiskArbeidTimerPerDag: 'PT5M',
                                            jobberNormaltTimerPerDag: 'PT5H',
                                        },
                                        '2022-09-12/2022-09-12': {
                                            faktiskArbeidTimerPerDag: 'PT1M',
                                            jobberNormaltTimerPerDag: 'PT1H',
                                        },
                                        '2022-09-13/2022-09-13': {
                                            faktiskArbeidTimerPerDag: 'PT2M',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-14/2022-09-14': {
                                            faktiskArbeidTimerPerDag: 'PT3M',
                                            jobberNormaltTimerPerDag: 'PT3H',
                                        },
                                        '2022-09-15/2022-09-15': {
                                            faktiskArbeidTimerPerDag: 'PT4M',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-09-16/2022-09-16': {
                                            faktiskArbeidTimerPerDag: 'PT5M',
                                            jobberNormaltTimerPerDag: 'PT5H',
                                        },
                                        '2022-09-19/2022-09-19': {
                                            faktiskArbeidTimerPerDag: 'PT1M',
                                            jobberNormaltTimerPerDag: 'PT1H',
                                        },
                                        '2022-09-20/2022-09-20': {
                                            faktiskArbeidTimerPerDag: 'PT2M',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-21/2022-09-21': {
                                            faktiskArbeidTimerPerDag: 'PT3M',
                                            jobberNormaltTimerPerDag: 'PT3H',
                                        },
                                        '2022-09-22/2022-09-22': {
                                            faktiskArbeidTimerPerDag: 'PT4M',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-09-23/2022-09-23': {
                                            faktiskArbeidTimerPerDag: 'PT5M',
                                            jobberNormaltTimerPerDag: 'PT5H',
                                        },
                                        '2022-09-26/2022-09-26': {
                                            faktiskArbeidTimerPerDag: 'PT1M',
                                            jobberNormaltTimerPerDag: 'PT1H',
                                        },
                                        '2022-09-27/2022-09-27': {
                                            faktiskArbeidTimerPerDag: 'PT2M',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-28/2022-09-28': {
                                            faktiskArbeidTimerPerDag: 'PT3M',
                                            jobberNormaltTimerPerDag: 'PT3H',
                                        },
                                        '2022-09-29/2022-09-29': {
                                            faktiskArbeidTimerPerDag: 'PT4M',
                                            jobberNormaltTimerPerDag: 'PT4H',
                                        },
                                        '2022-09-30/2022-09-30': {
                                            faktiskArbeidTimerPerDag: 'PT5M',
                                            jobberNormaltTimerPerDag: 'PT5H',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                        frilanserArbeidstidInfo: {
                            perioder: {
                                '2022-08-01/2022-09-30': {
                                    faktiskArbeidTimerPerDag: 'PT24M',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                            },
                        },
                        selvstendigNæringsdrivendeArbeidstidInfo: {
                            perioder: {
                                '2022-08-01/2022-09-30': {
                                    faktiskArbeidTimerPerDag: 'PT1H',
                                    jobberNormaltTimerPerDag: 'PT2H',
                                },
                            },
                        },
                    },
                    tilsynsordning: {
                        perioder: {
                            '2022-08-01/2022-08-01': { etablertTilsynTimerPerDag: 'PT5H1M' },
                            '2022-08-02/2022-08-02': { etablertTilsynTimerPerDag: 'PT4H3M' },
                            '2022-08-03/2022-08-03': { etablertTilsynTimerPerDag: 'PT3H3M' },
                            '2022-08-04/2022-08-04': { etablertTilsynTimerPerDag: 'PT2H4M' },
                            '2022-08-05/2022-08-05': { etablertTilsynTimerPerDag: 'PT1H5M' },
                            '2022-08-08/2022-08-08': { etablertTilsynTimerPerDag: 'PT5H1M' },
                            '2022-08-09/2022-08-09': { etablertTilsynTimerPerDag: 'PT4H3M' },
                            '2022-08-10/2022-08-10': { etablertTilsynTimerPerDag: 'PT3H3M' },
                            '2022-08-11/2022-08-11': { etablertTilsynTimerPerDag: 'PT2H4M' },
                            '2022-08-12/2022-08-12': { etablertTilsynTimerPerDag: 'PT1H5M' },
                            '2022-08-15/2022-08-15': { etablertTilsynTimerPerDag: 'PT5H1M' },
                            '2022-08-16/2022-08-16': { etablertTilsynTimerPerDag: 'PT4H3M' },
                            '2022-08-17/2022-08-17': { etablertTilsynTimerPerDag: 'PT3H3M' },
                            '2022-08-18/2022-08-18': { etablertTilsynTimerPerDag: 'PT2H4M' },
                            '2022-08-19/2022-08-19': { etablertTilsynTimerPerDag: 'PT1H5M' },
                            '2022-08-22/2022-08-22': { etablertTilsynTimerPerDag: 'PT5H1M' },
                            '2022-08-23/2022-08-23': { etablertTilsynTimerPerDag: 'PT4H3M' },
                            '2022-08-24/2022-08-24': { etablertTilsynTimerPerDag: 'PT3H3M' },
                            '2022-08-25/2022-08-25': { etablertTilsynTimerPerDag: 'PT2H4M' },
                            '2022-08-26/2022-08-26': { etablertTilsynTimerPerDag: 'PT1H5M' },
                            '2022-08-29/2022-08-29': { etablertTilsynTimerPerDag: 'PT5H1M' },
                            '2022-08-30/2022-08-30': { etablertTilsynTimerPerDag: 'PT4H3M' },
                            '2022-08-31/2022-08-31': { etablertTilsynTimerPerDag: 'PT3H3M' },
                            '2022-09-01/2022-09-01': { etablertTilsynTimerPerDag: 'PT2H4M' },
                            '2022-09-02/2022-09-02': { etablertTilsynTimerPerDag: 'PT1H5M' },
                            '2022-09-05/2022-09-05': { etablertTilsynTimerPerDag: 'PT5H1M' },
                            '2022-09-06/2022-09-06': { etablertTilsynTimerPerDag: 'PT4H3M' },
                            '2022-09-07/2022-09-07': { etablertTilsynTimerPerDag: 'PT3H3M' },
                            '2022-09-08/2022-09-08': { etablertTilsynTimerPerDag: 'PT2H4M' },
                            '2022-09-09/2022-09-09': { etablertTilsynTimerPerDag: 'PT1H5M' },
                            '2022-09-12/2022-09-12': { etablertTilsynTimerPerDag: 'PT5H1M' },
                            '2022-09-13/2022-09-13': { etablertTilsynTimerPerDag: 'PT4H3M' },
                            '2022-09-14/2022-09-14': { etablertTilsynTimerPerDag: 'PT3H3M' },
                            '2022-09-15/2022-09-15': { etablertTilsynTimerPerDag: 'PT2H4M' },
                            '2022-09-16/2022-09-16': { etablertTilsynTimerPerDag: 'PT1H5M' },
                            '2022-09-19/2022-09-19': { etablertTilsynTimerPerDag: 'PT5H1M' },
                            '2022-09-20/2022-09-20': { etablertTilsynTimerPerDag: 'PT4H3M' },
                            '2022-09-21/2022-09-21': { etablertTilsynTimerPerDag: 'PT3H3M' },
                            '2022-09-22/2022-09-22': { etablertTilsynTimerPerDag: 'PT2H4M' },
                            '2022-09-23/2022-09-23': { etablertTilsynTimerPerDag: 'PT1H5M' },
                            '2022-09-26/2022-09-26': { etablertTilsynTimerPerDag: 'PT5H1M' },
                            '2022-09-27/2022-09-27': { etablertTilsynTimerPerDag: 'PT4H3M' },
                            '2022-09-28/2022-09-28': { etablertTilsynTimerPerDag: 'PT3H3M' },
                            '2022-09-29/2022-09-29': { etablertTilsynTimerPerDag: 'PT2H4M' },
                            '2022-09-30/2022-09-30': { etablertTilsynTimerPerDag: 'PT1H5M' },
                        },
                    },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: { '2022-09-12/2022-09-24': { skalHaFerie: true } } },
                    søknadsperiode: ['2022-08-01/2022-09-30'],
                    utenlandsopphold: {
                        perioder: {
                            '2022-09-12/2022-09-12': { land: 'ALB' },
                            '2022-09-13/2022-09-23': {
                                land: 'ALB',
                                årsak: 'barnetInnlagtIHelseinstitusjonForNorskOffentligRegning',
                            },
                            '2022-09-24/2022-09-30': { land: 'ALB' },
                        },
                        perioderSomSkalSlettes: {},
                    },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: {
                        frilanser: { startdato: '2016-09-07' },
                        selvstendigNæringsdrivende: [
                            {
                                perioder: {
                                    '2009-09-02/..': {
                                        landkode: 'ASM',
                                        endringDato: '2022-09-01',
                                        bruttoInntekt: 123,
                                        erNyoppstartet: false,
                                        erVarigEndring: true,
                                        virksomhetstyper: ['JORDBRUK_SKOGBRUK'],
                                        endringBegrunnelse: 'WhoaWhoa',
                                        registrertIUtlandet: true,
                                    },
                                },
                                virksomhetNavn: 'ABC',
                            },
                        ],
                    },
                    dataBruktTilUtledning: {
                        harMedsøker: true,
                        samtidigHjemme: true,
                        harBekreftetOpplysninger: true,
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                versjon: '1.0.0',
                søknadId: '863d6bd3-b939-47aa-9653-cbfc7cc11367',
                mottattDato: '2022-09-02T08:20:45.437Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
            utenlandskNæring: [
                {
                    land: { landkode: 'IRL', landnavn: 'Irland' },
                    fraOgMed: '2022-09-01',
                    næringstype: 'ANNEN',
                    navnPåVirksomheten: 'NæringAnnetEØSLand',
                    organisasjonsnummer: '123123123',
                },
            ],
            ferieuttakIPerioden: {
                ferieuttak: [{ fraOgMed: '2022-09-12', tilOgMed: '2022-09-24' }],
                skalTaUtFerieIPerioden: true,
            },
            opptjeningIUtlandet: [
                {
                    land: { landkode: 'BEL', landnavn: 'Belgia' },
                    navn: 'FreeBelgia',
                    fraOgMed: '2022-09-13',
                    tilOgMed: '2022-09-23',
                    opptjeningType: 'FRILANSER',
                },
                {
                    land: { landkode: 'BGR', landnavn: 'Bulgaria' },
                    navn: 'BulgArbeidsgiverNavn',
                    fraOgMed: '2022-09-14',
                    tilOgMed: '2022-09-15',
                    opptjeningType: 'ARBEIDSTAKER',
                },
            ],
            harBekreftetOpplysninger: true,
            utenlandsoppholdIPerioden: {
                opphold: [
                    {
                        årsak: 'BARNET_INNLAGT_I_HELSEINSTITUSJON_FOR_NORSK_OFFENTLIG_REGNING',
                        fraOgMed: '2022-09-12',
                        landkode: 'ALB',
                        landnavn: 'Albania',
                        tilOgMed: '2022-09-30',
                        erUtenforEøs: true,
                        erBarnetInnlagt: true,
                        perioderBarnetErInnlagt: [{ fraOgMed: '2022-09-13', tilOgMed: '2022-09-23' }],
                    },
                ],
                skalOppholdeSegIUtlandetIPerioden: true,
            },
            selvstendigNæringsdrivende: {
                virksomhet: {
                    fraOgMed: '2009-09-02',
                    næringstype: 'JORDBRUK_SKOGBRUK',
                    varigEndring: { dato: '2022-09-01', forklaring: 'WhoaWhoa', inntektEtterEndring: 123 },
                    fiskerErPåBladB: false,
                    registrertINorge: false,
                    navnPåVirksomheten: 'ABC',
                    registrertIUtlandet: { landkode: 'ASM', landnavn: 'Amerikansk Samoa' },
                    harFlereAktiveVirksomheter: true,
                },
                arbeidsforhold: {
                    arbeidIPeriode: {
                        type: 'ARBEIDER_TIMER_I_SNITT_PER_UKE',
                        timerPerUke: 'PT5H',
                        arbeiderIPerioden: 'REDUSERT',
                    },
                    normalarbeidstid: { erLiktHverUke: false, timerPerUkeISnitt: 'PT10H' },
                },
                harInntektSomSelvstendig: true,
            },
            harForstattRettigheterOgPlikter: true,
        },
        saksId: '1DNM1SM',
        journalpostId: '573777622',
        dokumenter: [
            {
                journalpostId: '573777622',
                dokumentInfoId: '599039030',
                sakId: '1DNM1SM',
                tittel: 'Søknad om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573777622/599039030/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-09-02T10:20:56', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-09-02T10:20:56', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-09-02T10:21:02', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-09-02T10:20:45', datotype: 'DATO_REGISTRERT' },
                ],
            },
            {
                journalpostId: '573777622',
                dokumentInfoId: '599039031',
                sakId: '1DNM1SM',
                tittel: 'IMG_1075 (1).JPG',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573777622/599039031/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-09-02T10:20:56', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-09-02T10:20:56', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-09-02T10:21:02', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-09-02T10:20:45', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-09-02T08:20:45.437Z',
        endret: '2022-09-02T08:22:08',
        behandlingsdato: null,
    },
    {
        søknadId: '7202fa92-721f-4049-96c8-e44feed96586',
        søknadstype: 'PP_SYKT_BARN',
        status: 'MOTTATT',
        søknad: {
            barn: {
                navn: 'ALFABETISK FAGOTT',
                aktørId: '2811762539343',
                fødselsdato: '2019-06-08',
                fødselsnummer: '08861999573',
            },
            språk: 'nb',
            søker: {
                fornavn: 'PRESENTABEL',
                aktørId: '2320509955297',
                etternavn: 'HOFTE',
                fødselsnummer: '02869599258',
            },
            frilans: {
                startdato: '2011-09-07',
                arbeidsforhold: {
                    arbeidIPeriode: {
                        type: 'ARBEIDER_PROSENT_AV_NORMALT',
                        prosentAvNormalt: 5,
                        arbeiderIPerioden: 'REDUSERT',
                    },
                    normalarbeidstid: { erLiktHverUke: false, timerPerUkeISnitt: 'PT20H' },
                },
                harInntektSomFrilanser: true,
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2022-09-02T09:41:33.411524928Z',
            fraOgMed: '2022-09-01',
            tilOgMed: '2022-09-17',
            søknadId: '7202fa92-721f-4049-96c8-e44feed96586',
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiIxZDUwNTkxMC1kNmE1LTQyZjMtYjJiMS0zZjdjMDhhOGJiMTkifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiI2MWNhNGFhMy1lOTFiLTQ3YjQtYTVkYi0zMzViNzExN2EyYWIifQ',
                ],
            ],
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: false,
                harBoddIUtlandetSiste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            },
            harMedsøker: false,
            arbeidsgivere: [
                {
                    navn: 'SJOKKERENDE ELEKTRIKER',
                    erAnsatt: true,
                    arbeidsforhold: {
                        arbeidIPeriode: {
                            type: 'ARBEIDER_ENKELTDAGER',
                            enkeltdager: [
                                {
                                    dato: '2022-09-01',
                                    arbeidstimer: { normalTimer: 'PT2H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-09-02',
                                    arbeidstimer: { normalTimer: 'PT2H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-09-05',
                                    arbeidstimer: { normalTimer: 'PT2H', faktiskTimer: 'PT1H' },
                                },
                                {
                                    dato: '2022-09-06',
                                    arbeidstimer: { normalTimer: 'PT2H', faktiskTimer: 'PT5H' },
                                },
                                {
                                    dato: '2022-09-07',
                                    arbeidstimer: { normalTimer: 'PT2H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-09-08',
                                    arbeidstimer: { normalTimer: 'PT2H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-09-09',
                                    arbeidstimer: { normalTimer: 'PT2H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-09-12',
                                    arbeidstimer: { normalTimer: 'PT2H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-09-13',
                                    arbeidstimer: { normalTimer: 'PT2H', faktiskTimer: 'PT5H' },
                                },
                                {
                                    dato: '2022-09-14',
                                    arbeidstimer: { normalTimer: 'PT2H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-09-15',
                                    arbeidstimer: { normalTimer: 'PT2H', faktiskTimer: 'PT0S' },
                                },
                                {
                                    dato: '2022-09-16',
                                    arbeidstimer: { normalTimer: 'PT2H', faktiskTimer: 'PT0S' },
                                },
                            ],
                            arbeiderIPerioden: 'REDUSERT',
                        },
                        normalarbeidstid: {
                            erLiktHverUke: true,
                            timerFasteDager: {
                                fredag: 'PT2H',
                                mandag: 'PT2H',
                                onsdag: 'PT2H',
                                tirsdag: 'PT2H',
                                torsdag: 'PT2H',
                            },
                        },
                    },
                    organisasjonsnummer: '947064649',
                    sluttetFørSøknadsperiode: false,
                },
            ],
            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '02869599258' },
                ytelse: {
                    barn: { norskIdentitetsnummer: '08861999573' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: { '2022-09-01/2022-09-17': { timerPleieAvBarnetPerDag: 'PT7H30M' } } },
                    omsorg: {},
                    bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                    beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                    nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2022-09-01/2022-09-01': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-02/2022-09-02': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-05/2022-09-05': {
                                            faktiskArbeidTimerPerDag: 'PT1H',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-06/2022-09-06': {
                                            faktiskArbeidTimerPerDag: 'PT5H',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-07/2022-09-07': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-08/2022-09-08': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-09/2022-09-09': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-12/2022-09-12': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-13/2022-09-13': {
                                            faktiskArbeidTimerPerDag: 'PT5H',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-14/2022-09-14': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-15/2022-09-15': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                        '2022-09-16/2022-09-16': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT2H',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                        frilanserArbeidstidInfo: {
                            perioder: {
                                '2022-09-01/2022-09-17': {
                                    faktiskArbeidTimerPerDag: 'PT12M',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                            },
                        },
                    },
                    tilsynsordning: {
                        perioder: { '2022-09-01/2022-09-17': { etablertTilsynTimerPerDag: 'PT0S' } },
                    },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: {} },
                    søknadsperiode: ['2022-09-01/2022-09-17'],
                    utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: { frilanser: { startdato: '2011-09-07' } },
                    dataBruktTilUtledning: {
                        harMedsøker: false,
                        harBekreftetOpplysninger: true,
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                versjon: '1.0.0',
                søknadId: '7202fa92-721f-4049-96c8-e44feed96586',
                mottattDato: '2022-09-02T09:41:33.411Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
            utenlandskNæring: [],
            ferieuttakIPerioden: { ferieuttak: [], skalTaUtFerieIPerioden: false },
            opptjeningIUtlandet: [],
            harBekreftetOpplysninger: true,
            utenlandsoppholdIPerioden: { opphold: [], skalOppholdeSegIUtlandetIPerioden: false },
            selvstendigNæringsdrivende: { harInntektSomSelvstendig: false },
            harForstattRettigheterOgPlikter: true,
        },
        saksId: '1DNM1SM',
        journalpostId: '573777659',
        dokumenter: [
            {
                journalpostId: '573777659',
                dokumentInfoId: '599039072',
                sakId: '1DNM1SM',
                tittel: 'Søknad om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573777659/599039072/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-09-02T11:41:35', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-09-02T11:41:35', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-09-02T11:41:40', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-09-02T11:41:33', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-09-02T09:41:33.411Z',
        endret: '2022-09-02T09:41:45',
        behandlingsdato: null,
    },
    {
        søknadId: '68e5ae8d-d003-40ee-ae86-767f76b2c7bb',
        søknadstype: 'PP_SYKT_BARN',
        status: 'MOTTATT',
        søknad: {
            barn: {
                navn: 'ALFABETISK FAGOTT',
                aktørId: '2811762539343',
                fødselsdato: '2019-06-08',
                fødselsnummer: '08861999573',
            },
            språk: 'nb',
            søker: {
                fornavn: 'PRESENTABEL',
                aktørId: '2320509955297',
                etternavn: 'HOFTE',
                fødselsnummer: '02869599258',
            },
            frilans: {
                startdato: '2022-09-01',
                arbeidsforhold: {
                    arbeidIPeriode: { type: 'ARBEIDER_IKKE', arbeiderIPerioden: 'HELT_FRAVÆR' },
                    normalarbeidstid: { erLiktHverUke: false, timerPerUkeISnitt: 'PT5H' },
                },
                harInntektSomFrilanser: true,
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2022-09-02T12:11:24.261628944Z',
            fraOgMed: '2022-09-01',
            tilOgMed: '2022-09-30',
            søknadId: '68e5ae8d-d003-40ee-ae86-767f76b2c7bb',
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiJlMWY5ZGNkMC03MDNkLTQ5MzMtYmE3Mi02MmViYWM5ZWQ4ZGUifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiJjMjJiM2IzMC02MDNhLTQzZjgtOGNjNC1hYmU4YmJlZjQ3NzIifQ',
                ],
            ],
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: false,
                harBoddIUtlandetSiste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            },
            harMedsøker: false,
            arbeidsgivere: [
                {
                    navn: 'SJOKKERENDE ELEKTRIKER',
                    erAnsatt: true,
                    arbeidsforhold: {
                        arbeidIPeriode: {
                            type: 'ARBEIDER_TIMER_I_SNITT_PER_UKE',
                            timerPerUke: 'PT30H',
                            arbeiderIPerioden: 'REDUSERT',
                        },
                        normalarbeidstid: { erLiktHverUke: false, timerPerUkeISnitt: 'PT40H' },
                    },
                    organisasjonsnummer: '947064649',
                    sluttetFørSøknadsperiode: false,
                },
            ],
            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '02869599258' },
                ytelse: {
                    barn: { norskIdentitetsnummer: '08861999573' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: { '2022-09-01/2022-09-30': { timerPleieAvBarnetPerDag: 'PT7H30M' } } },
                    omsorg: {},
                    bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                    beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                    nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2022-09-01/2022-09-30': {
                                            faktiskArbeidTimerPerDag: 'PT6H',
                                            jobberNormaltTimerPerDag: 'PT8H',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                        frilanserArbeidstidInfo: {
                            perioder: {
                                '2022-09-01/2022-09-30': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT1H',
                                },
                            },
                        },
                    },
                    tilsynsordning: {
                        perioder: { '2022-09-01/2022-09-30': { etablertTilsynTimerPerDag: 'PT0S' } },
                    },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: {} },
                    søknadsperiode: ['2022-09-01/2022-09-30'],
                    utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: { frilanser: { startdato: '2022-09-01' } },
                    dataBruktTilUtledning: {
                        harMedsøker: false,
                        harBekreftetOpplysninger: true,
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                versjon: '1.0.0',
                søknadId: '68e5ae8d-d003-40ee-ae86-767f76b2c7bb',
                mottattDato: '2022-09-02T12:11:24.261Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
            utenlandskNæring: [],
            ferieuttakIPerioden: { ferieuttak: [], skalTaUtFerieIPerioden: false },
            opptjeningIUtlandet: [],
            harBekreftetOpplysninger: true,
            utenlandsoppholdIPerioden: { opphold: [], skalOppholdeSegIUtlandetIPerioden: false },
            selvstendigNæringsdrivende: { harInntektSomSelvstendig: false },
            harForstattRettigheterOgPlikter: true,
        },
        saksId: '1DNM1SM',
        journalpostId: '573777704',
        dokumenter: [
            {
                journalpostId: '573777704',
                dokumentInfoId: '599039130',
                sakId: '1DNM1SM',
                tittel: 'Søknad om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573777704/599039130/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-09-02T14:11:26', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-09-02T14:11:26', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-09-02T14:11:31', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-09-02T14:11:24', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-09-02T12:11:24.261Z',
        endret: '2022-09-02T12:11:38',
        behandlingsdato: null,
    },
    {
        søknadId: '3ff3f365-7e7e-4b1f-838f-448684959f9e',
        søknadstype: 'PP_SYKT_BARN',
        status: 'MOTTATT',
        søknad: {
            barn: {
                navn: 'ALFABETISK FAGOTT',
                aktørId: '2811762539343',
                fødselsdato: '2019-06-08',
                fødselsnummer: '08861999573',
            },
            språk: 'nb',
            søker: {
                fornavn: 'PRESENTABEL',
                aktørId: '2320509955297',
                etternavn: 'HOFTE',
                fødselsnummer: '02869599258',
            },
            frilans: {
                startdato: '2022-09-01',
                arbeidsforhold: {
                    arbeidIPeriode: { type: 'ARBEIDER_IKKE', arbeiderIPerioden: 'HELT_FRAVÆR' },
                    normalarbeidstid: { erLiktHverUke: false, timerPerUkeISnitt: 'PT20H' },
                },
                harInntektSomFrilanser: true,
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2022-09-12T11:36:08.213671475Z',
            fraOgMed: '2022-09-08',
            tilOgMed: '2022-09-25',
            søknadId: '3ff3f365-7e7e-4b1f-838f-448684959f9e',
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiJiOGMxMTU3Zi1jYjY2LTQ5NzMtODhhNy1kMzliZmQwOTg1MjMifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiIzNDE4NmFmZC04ZTRlLTQ5ODctYTZlMi1iMGRlM2ZhNWY3YjcifQ',
                ],
            ],
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: false,
                harBoddIUtlandetSiste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            },
            harMedsøker: false,
            arbeidsgivere: [{ navn: 'SJOKKERENDE ELEKTRIKER', erAnsatt: false, organisasjonsnummer: '947064649' }],
            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '02869599258' },
                ytelse: {
                    barn: { norskIdentitetsnummer: '08861999573' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: { '2022-09-08/2022-09-25': { timerPleieAvBarnetPerDag: 'PT7H30M' } } },
                    omsorg: {},
                    bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                    beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                    nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2022-09-08/2022-09-25': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT0S',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                        frilanserArbeidstidInfo: {
                            perioder: {
                                '2022-09-08/2022-09-25': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT4H',
                                },
                            },
                        },
                    },
                    tilsynsordning: {
                        perioder: { '2022-09-08/2022-09-25': { etablertTilsynTimerPerDag: 'PT0S' } },
                    },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: {} },
                    søknadsperiode: ['2022-09-08/2022-09-25'],
                    utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: { frilanser: { startdato: '2022-09-01' } },
                    dataBruktTilUtledning: {
                        harMedsøker: false,
                        harBekreftetOpplysninger: true,
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                versjon: '1.0.0',
                søknadId: '3ff3f365-7e7e-4b1f-838f-448684959f9e',
                mottattDato: '2022-09-12T11:36:08.213Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
            utenlandskNæring: [],
            ferieuttakIPerioden: { ferieuttak: [], skalTaUtFerieIPerioden: false },
            opptjeningIUtlandet: [],
            harBekreftetOpplysninger: true,
            utenlandsoppholdIPerioden: { opphold: [], skalOppholdeSegIUtlandetIPerioden: false },
            selvstendigNæringsdrivende: { harInntektSomSelvstendig: false },
            harForstattRettigheterOgPlikter: true,
        },
        saksId: '1DNM1SM',
        journalpostId: '573779224',
        dokumenter: [
            {
                journalpostId: '573779224',
                dokumentInfoId: '599040845',
                sakId: '1DNM1SM',
                tittel: 'Søknad om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573779224/599040845/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-09-12T13:36:09', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-09-12T13:36:09', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-09-12T13:36:14', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-09-12T13:36:08', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-09-12T11:36:08.213Z',
        endret: '2022-09-12T11:36:19',
        behandlingsdato: null,
    },
    {
        søknadId: 'eced6d00-7c81-4828-a2e9-79c04f8e4bcf',
        søknadstype: 'PP_SYKT_BARN',
        status: 'MOTTATT',
        søknad: {
            barn: {
                navn: 'ALFABETISK FAGOTT',
                aktørId: '2811762539343',
                fødselsdato: '2019-06-08',
                fødselsnummer: '08861999573',
            },
            språk: 'nb',
            søker: {
                fornavn: 'PRESENTABEL',
                aktørId: '2320509955297',
                etternavn: 'HOFTE',
                fødselsnummer: '02869599258',
            },
            frilans: {
                startdato: '2022-09-07',
                arbeidsforhold: {
                    arbeidIPeriode: { type: 'ARBEIDER_IKKE', arbeiderIPerioden: 'HELT_FRAVÆR' },
                    normalarbeidstid: { erLiktHverUke: false, timerPerUkeISnitt: 'PT2H' },
                },
                harInntektSomFrilanser: true,
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2022-09-28T10:12:32.892074447Z',
            fraOgMed: '2022-09-09',
            tilOgMed: '2022-09-24',
            søknadId: 'eced6d00-7c81-4828-a2e9-79c04f8e4bcf',
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiI2MjY1NTQ1ZC00NWI4LTQyOTAtODlkMC0zNTg1YzdmODYyY2EifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiJkNTI0NTk5ZS00YTA1LTQzMzktOGYyNS03YmJkYWZhZWJiNGIifQ',
                ],
            ],
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: false,
                harBoddIUtlandetSiste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            },
            harMedsøker: false,
            arbeidsgivere: [{ navn: 'SJOKKERENDE ELEKTRIKER', erAnsatt: false, organisasjonsnummer: '947064649' }],
            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '02869599258' },
                ytelse: {
                    barn: { norskIdentitetsnummer: '08861999573' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: { '2022-09-09/2022-09-24': { timerPleieAvBarnetPerDag: 'PT7H30M' } } },
                    omsorg: {},
                    bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                    beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                    nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2022-09-09/2022-09-24': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT0S',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                        frilanserArbeidstidInfo: {
                            perioder: {
                                '2022-09-09/2022-09-24': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT24M',
                                },
                            },
                        },
                    },
                    tilsynsordning: {
                        perioder: { '2022-09-09/2022-09-24': { etablertTilsynTimerPerDag: 'PT0S' } },
                    },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: {} },
                    søknadsperiode: ['2022-09-09/2022-09-24'],
                    utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: { frilanser: { startdato: '2022-09-07' } },
                    dataBruktTilUtledning: {
                        harMedsøker: false,
                        harBekreftetOpplysninger: true,
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                versjon: '1.0.0',
                søknadId: 'eced6d00-7c81-4828-a2e9-79c04f8e4bcf',
                mottattDato: '2022-09-28T10:12:32.892Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
            utenlandskNæring: [],
            ferieuttakIPerioden: { ferieuttak: [], skalTaUtFerieIPerioden: false },
            opptjeningIUtlandet: [],
            harBekreftetOpplysninger: true,
            utenlandsoppholdIPerioden: { opphold: [], skalOppholdeSegIUtlandetIPerioden: false },
            selvstendigNæringsdrivende: { harInntektSomSelvstendig: false },
            harForstattRettigheterOgPlikter: true,
        },
        saksId: '1DNM1SM',
        journalpostId: '573782814',
        dokumenter: [
            {
                journalpostId: '573782814',
                dokumentInfoId: '599044971',
                sakId: '1DNM1SM',
                tittel: 'Søknad om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573782814/599044971/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-09-28T12:12:34', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-09-28T12:12:34', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-09-28T12:12:40', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-09-28T12:12:32', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-09-28T10:12:32.892Z',
        endret: '2022-09-28T10:12:46',
        behandlingsdato: null,
    },
    {
        søknadId: '509a21da-3c26-4899-b9d3-c494cfb9309a',
        søknadstype: 'PP_SYKT_BARN',
        status: 'MOTTATT',
        søknad: {
            barn: {
                navn: 'ALFABETISK FAGOTT',
                aktørId: '2811762539343',
                fødselsdato: '2019-06-08',
                fødselsnummer: '08861999573',
            },
            språk: 'nb',
            søker: {
                fornavn: 'PRESENTABEL',
                aktørId: '2320509955297',
                etternavn: 'HOFTE',
                fødselsnummer: '02869599258',
            },
            frilans: {
                startdato: '2022-09-14',
                arbeidsforhold: {
                    arbeidIPeriode: { type: 'ARBEIDER_IKKE', arbeiderIPerioden: 'HELT_FRAVÆR' },
                    normalarbeidstid: { erLiktHverUke: false, timerPerUkeISnitt: 'PT2H' },
                },
                harInntektSomFrilanser: true,
                jobberFortsattSomFrilans: true,
            },
            mottatt: '2022-09-28T10:25:29.114304782Z',
            fraOgMed: '2022-09-08',
            tilOgMed: '2022-09-25',
            søknadId: '509a21da-3c26-4899-b9d3-c494cfb9309a',
            dokumentId: [
                [
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiI1NmY5NzUzMC1hZDYwLTQ0ZWMtYTY5Mi0yNmRkMjM0ZWFhYWEifQ',
                    'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdGkiOiI0MGUyZWU0ZC0yYmZjLTRjN2QtOGYzYy0yMjZhZjM1OTc5ZDYifQ',
                ],
            ],
            medlemskap: {
                skalBoIUtlandetNeste12Mnd: false,
                harBoddIUtlandetSiste12Mnd: false,
                utenlandsoppholdNeste12Mnd: [],
                utenlandsoppholdSiste12Mnd: [],
            },
            harMedsøker: false,
            arbeidsgivere: [{ navn: 'SJOKKERENDE ELEKTRIKER', erAnsatt: false, organisasjonsnummer: '947064649' }],
            k9FormatSøknad: {
                språk: 'nb',
                søker: { norskIdentitetsnummer: '02869599258' },
                ytelse: {
                    barn: { norskIdentitetsnummer: '08861999573' },
                    type: 'PLEIEPENGER_SYKT_BARN',
                    uttak: { perioder: { '2022-09-08/2022-09-25': { timerPleieAvBarnetPerDag: 'PT7H30M' } } },
                    omsorg: {},
                    bosteder: { perioder: {}, perioderSomSkalSlettes: {} },
                    beredskap: { perioder: {}, perioderSomSkalSlettes: {} },
                    nattevåk: { perioder: {}, perioderSomSkalSlettes: {} },
                    arbeidstid: {
                        arbeidstakerList: [
                            {
                                arbeidstidInfo: {
                                    perioder: {
                                        '2022-09-08/2022-09-25': {
                                            faktiskArbeidTimerPerDag: 'PT0S',
                                            jobberNormaltTimerPerDag: 'PT0S',
                                        },
                                    },
                                },
                                organisasjonsnummer: '947064649',
                            },
                        ],
                        frilanserArbeidstidInfo: {
                            perioder: {
                                '2022-09-08/2022-09-13': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT0S',
                                },
                                '2022-09-14/2022-09-25': {
                                    faktiskArbeidTimerPerDag: 'PT0S',
                                    jobberNormaltTimerPerDag: 'PT24M',
                                },
                            },
                        },
                    },
                    tilsynsordning: {
                        perioder: { '2022-09-08/2022-09-25': { etablertTilsynTimerPerDag: 'PT0S' } },
                    },
                    endringsperiode: [],
                    lovbestemtFerie: { perioder: {} },
                    søknadsperiode: ['2022-09-08/2022-09-25'],
                    utenlandsopphold: { perioder: {}, perioderSomSkalSlettes: {} },
                    trekkKravPerioder: [],
                    opptjeningAktivitet: { frilanser: { startdato: '2022-09-14' } },
                    dataBruktTilUtledning: {
                        harMedsøker: false,
                        harBekreftetOpplysninger: true,
                        harForståttRettigheterOgPlikter: true,
                    },
                },
                versjon: '1.0.0',
                søknadId: '509a21da-3c26-4899-b9d3-c494cfb9309a',
                mottattDato: '2022-09-28T10:25:29.114Z',
                journalposter: [],
                begrunnelseForInnsending: {},
            },
            utenlandskNæring: [],
            ferieuttakIPerioden: { ferieuttak: [], skalTaUtFerieIPerioden: false },
            opptjeningIUtlandet: [],
            harBekreftetOpplysninger: true,
            utenlandsoppholdIPerioden: { opphold: [], skalOppholdeSegIUtlandetIPerioden: false },
            selvstendigNæringsdrivende: { harInntektSomSelvstendig: false },
            harForstattRettigheterOgPlikter: true,
        },
        saksId: '1DNM1SM',
        journalpostId: '573782819',
        dokumenter: [
            {
                journalpostId: '573782819',
                dokumentInfoId: '599044975',
                sakId: '1DNM1SM',
                tittel: 'Søknad om pleiepenger',
                filtype: 'PDF',
                harTilgang: true,
                url: 'http://localhost:1234/dokument/573782819/599044975/ARKIV',
                relevanteDatoer: [
                    { dato: '2022-09-28T12:25:31', datotype: 'DATO_OPPRETTET' },
                    { dato: '2022-09-28T12:25:31', datotype: 'DATO_DOKUMENT' },
                    { dato: '2022-09-28T12:25:36', datotype: 'DATO_JOURNALFOERT' },
                    { dato: '2022-09-28T12:25:29', datotype: 'DATO_REGISTRERT' },
                ],
            },
        ],
        opprettet: '2022-09-28T10:25:29.114Z',
        endret: '2022-09-28T10:25:41',
        behandlingsdato: null,
    },
];
