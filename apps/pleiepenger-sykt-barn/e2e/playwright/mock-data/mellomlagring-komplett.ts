export const mellomlagringKomplett = {
    formValues: {
        periodeFra: '2023-09-11',
        periodeTil: '2023-10-09',
        barnetsNavn: '',
        barnetsFødselsnummer: '',
        barnetSøknadenGjelder: '2811762539343',
        harForståttRettigheterOgPlikter: true,
        harBekreftetOpplysninger: false,
        søknadenGjelderEtAnnetBarn: false,
        barnetHarIkkeFnr: false,
        fødselsattest: [],
        legeerklæring: [
            {
                file: {
                    isPersistedFile: true,
                    name: 'navlogopng.png',
                    lastModified: 1699879965306,
                    type: 'image/png',
                    size: 2366,
                },
                pending: false,
                uploaded: true,
                url: '/vedlegg',
            },
        ],
        ansatt_arbeidsforhold: [
            {
                arbeidsgiver: {
                    type: 'ORGANISASJON',
                    id: '947064649',
                    organisasjonsnummer: '947064649',
                    navn: 'SJOKKERENDE ELEKTRIKER',
                    ansattFom: '2002-04-20T00:00:00.000Z',
                },
                erAnsatt: 'yes',
                normalarbeidstid: {
                    timerPerUke: '37,5',
                },
                arbeidIPeriode: {
                    arbeiderIPerioden: 'REDUSERT',
                    erLiktHverUke: 'no',
                    arbeidsuker: {
                        '2023-09-11/2023-09-17': {
                            snittTimerPerUke: '4',
                        },
                        '2023-09-18/2023-09-24': {
                            snittTimerPerUke: '5',
                        },
                        '2023-09-25/2023-10-01': {
                            snittTimerPerUke: '0',
                        },
                        '2023-10-02/2023-10-08': {
                            snittTimerPerUke: '20',
                        },
                        '2023-10-09/2023-10-09': {
                            snittTimerPerUke: '6',
                        },
                    },
                },
            },
        ],
        harBoddUtenforNorgeSiste12Mnd: 'yes',
        utenlandsoppholdSiste12Mnd: [
            {
                id: 'cc34b015-be25-4fa6-acf5-66606912daa7',
                fom: '2023-08-10T00:00:00.000Z',
                tom: '2023-08-11T00:00:00.000Z',
                landkode: 'ABW',
            },
        ],
        skalBoUtenforNorgeNeste12Mnd: 'yes',
        utenlandsoppholdNeste12Mnd: [
            {
                id: '3f40c44d-78e7-48b2-a820-a8e24229fcef',
                fom: '2024-01-01T00:00:00.000Z',
                tom: '2024-02-10T00:00:00.000Z',
                landkode: 'AZE',
            },
        ],
        skalOppholdeSegIUtlandetIPerioden: 'yes',
        utenlandsoppholdIPerioden: [
            {
                fom: '2023-09-14T00:00:00.000Z',
                tom: '2023-09-17T00:00:00.000Z',
                landkode: 'AFG',
                erBarnetInnlagt: 'yes',
                barnInnlagtPerioder: [
                    {
                        id: '018e0049-b607-4ebf-a7e7-358c1ca4b00b',
                        fom: '2023-09-15T00:00:00.000Z',
                        tom: '2023-09-15T00:00:00.000Z',
                    },
                ],
                årsak: 'BARNET_INNLAGT_I_HELSEINSTITUSJON_FOR_NORSK_OFFENTLIG_REGNING',
                id: '2d298b61-b407-497f-bdd1-5ebc35a20461',
            },
        ],
        skalTaUtFerieIPerioden: 'yes',
        ferieuttakIPerioden: [
            {
                id: '97ca7676-ab40-4884-af5d-ea83c77870ef',
                from: '2023-09-14T00:00:00.000Z',
                to: '2023-09-17T00:00:00.000Z',
            },
        ],
        omsorgstilbud: {
            erIOmsorgstilbudFortid: 'yes',
            erIOmsorgstilbudFremtid: 'yes',
            erLiktHverUke: 'no',
            enkeltdager: {
                '2023-09-25': {
                    hours: '5',
                    minutes: '0',
                },
                '2023-10-02': {
                    hours: '4',
                    minutes: '0',
                },
                '2023-10-03': {
                    hours: '4',
                    minutes: '0',
                },
                '2023-10-04': {
                    hours: '4',
                    minutes: '0',
                },
                '2023-10-05': {
                    hours: '4',
                    minutes: '0',
                },
                '2023-10-06': {
                    hours: '4',
                    minutes: '0',
                },
                '2023-10-09': {
                    hours: '4',
                    minutes: '0',
                },
            },
        },
        harNattevåk: 'yes',
        harBeredskap: 'yes',
        frilans: {
            harHattInntektSomFrilanser: 'yes',
            frilanstype: 'FRILANS_HONORAR',
            startetFørSisteTreHeleMåneder: 'yes',
            erFortsattFrilanser: 'no',
            sluttdato: '2023-09-14',
            arbeidsforhold: {
                normalarbeidstid: {
                    timerPerUke: '5',
                },
                arbeidIPeriode: {
                    arbeiderIPerioden: 'HELT_FRAVÆR',
                },
            },
        },
        stønadGodtgjørelse: {
            mottarStønadGodtgjørelse: 'yes',
            mottarStønadGodtgjørelseIHelePerioden: 'no',
            starterUndeveis: 'yes',
            startdato: '2023-09-14',
            slutterUnderveis: 'yes',
            sluttdato: '2023-09-16',
        },
        selvstendig: {
            harHattInntektSomSN: 'yes',
            harFlereVirksomheter: 'yes',
            virksomhet: {
                næringstype: 'JORDBRUK_SKOGBRUK',
                navnPåVirksomheten: 'Jordlig',
                registrertINorge: 'yes',
                organisasjonsnummer: '991012133',
                fom: '2013-09-11T00:00:00.000Z',
                tom: '2023-10-02T00:00:00.000Z',
                hattVarigEndringAvNæringsinntektSiste4Kalenderår: 'yes',
                varigEndringINæringsinntekt_dato: '2023-01-11T00:00:00.000Z',
                varigEndringINæringsinntekt_inntektEtterEndring: 222,
                varigEndringINæringsinntekt_forklaring: 'Alt har endret seg',
                harRegnskapsfører: 'yes',
                regnskapsfører_navn: 'Regnskapsførernavn',
                regnskapsfører_telefon: '00112233',
                fiskerErPåBladB: 'unanswered',
                harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: 'unanswered',
                id: '61acd9d7-4bb5-400e-828f-b96b856ca9b1',
            },
            arbeidsforhold: {
                normalarbeidstid: {
                    timerPerUke: '4',
                },
                arbeidIPeriode: {
                    arbeiderIPerioden: 'SOM_VANLIG',
                },
            },
        },
        frilansoppdrag: [],
        harOpptjeningUtland: 'yes',
        opptjeningUtland: [
            {
                fom: '2023-07-11T00:00:00.000Z',
                tom: '2023-08-11T00:00:00.000Z',
                landkode: 'BEL',
                opptjeningType: 'ARBEIDSTAKER',
                navn: 'EøsArbeidsgiver',
                id: 'eaa9ab51-5af8-425c-a651-55e0de3c906b',
            },
        ],
        harUtenlandskNæring: 'yes',
        utenlandskNæring: [
            {
                næringstype: 'JORDBRUK_SKOGBRUK',
                navnPåVirksomheten: 'eøs virksomhet',
                identifikasjonsnummer: '123123123',
                land: 'EST',
                erPågående: true,
                fraOgMed: '2023-07-11T00:00:00.000Z',
                id: '0bc1dfa2-7032-4ef1-8c4d-12ec4ac955bd',
            },
        ],
        harNattevåk_ekstrainfo: 'Nattevåk ekstrainformasjon',
        harBeredskap_ekstrainfo: 'Ekstrainformasjon om beredskap',
    },
    metadata: {
        lastStepID: 'legeerklaering',
        version: '14.0.0',
        updatedTimestemp: '2023-11-08T09:05:50.496Z',
    },
};
