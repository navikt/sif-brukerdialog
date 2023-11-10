export const mellomlagring = {
    formValues: {
        språk: 'nb',
        apiDataVersjon: 'Søknad-1.1.0',
        harForståttRettigheterOgPlikter: true,
        harBekreftetOpplysninger: false,
        barn: {
            navn: 'ALFABETISK FAGGOTT',
            aktørId: '2811762539343',
            fødselsdato: '2019-12-08',
        },
        fødselsattestVedleggUrls: [],
        fraOgMed: '2023-09-11',
        tilOgMed: '2023-10-09',
        utenlandsoppholdIPerioden: {
            skalOppholdeSegIUtlandetIPerioden: true,
            opphold: [
                {
                    landnavn: 'Afghanistan',
                    landkode: 'AFG',
                    fraOgMed: '2023-09-14',
                    tilOgMed: '2023-09-17',
                    erUtenforEøs: true,
                    erBarnetInnlagt: true,
                    perioderBarnetErInnlagt: [
                        {
                            fraOgMed: '2023-09-15',
                            tilOgMed: '2023-09-15',
                        },
                    ],
                    årsak: 'BARNET_INNLAGT_I_HELSEINSTITUSJON_FOR_NORSK_OFFENTLIG_REGNING',
                },
            ],
        },
        ferieuttakIPerioden: {
            skalTaUtFerieIPerioden: true,
            ferieuttak: [
                {
                    fraOgMed: '2023-09-14',
                    tilOgMed: '2023-09-17',
                },
            ],
        },
        arbeidsgivere: [
            {
                erAnsatt: true,
                navn: 'SJOKKERENDE ELEKTRIKER',
                organisasjonsnummer: '947064649',
                ansattFom: '2002-04-20',
                sluttetFørSøknadsperiode: false,
                arbeidsforhold: {
                    normalarbeidstid: {
                        timerPerUkeISnitt: 'PT37H30M',
                    },
                    arbeidIPeriode: {
                        type: 'ARBEIDER_REDUSERT',
                        redusertArbeid: {
                            type: 'ULIKE_UKER_TIMER',
                            arbeidsuker: [
                                {
                                    periode: {
                                        fraOgMed: '2023-09-11',
                                        tilOgMed: '2023-09-17',
                                    },
                                    timer: 'PT4H0M',
                                },
                                {
                                    periode: {
                                        fraOgMed: '2023-09-18',
                                        tilOgMed: '2023-09-24',
                                    },
                                    timer: 'PT5H0M',
                                },
                                {
                                    periode: {
                                        fraOgMed: '2023-09-25',
                                        tilOgMed: '2023-10-01',
                                    },
                                    timer: 'PT0H0M',
                                },
                                {
                                    periode: {
                                        fraOgMed: '2023-10-02',
                                        tilOgMed: '2023-10-08',
                                    },
                                    timer: 'PT20H0M',
                                },
                                {
                                    periode: {
                                        fraOgMed: '2023-10-09',
                                        tilOgMed: '2023-10-09',
                                    },
                                    timer: 'PT6H0M',
                                },
                            ],
                        },
                    },
                },
            },
        ],
        frilans: {
            type: 'FRILANS_HONORAR',
            _misterInntektSomFrilanser: true,
            harInntektSomFrilanser: true,
            jobberFortsattSomFrilans: false,
            startetFørSisteTreHeleMåneder: true,
            startdato: '2023-05-31',
            sluttdato: '2023-09-14',
            arbeidsforhold: {
                normalarbeidstid: {
                    timerPerUkeISnitt: 'PT5H0M',
                },
                arbeidIPeriode: {
                    type: 'ARBEIDER_IKKE',
                },
            },
        },
        selvstendigNæringsdrivende: {
            harInntektSomSelvstendig: true,
            arbeidsforhold: {
                normalarbeidstid: {
                    timerPerUkeISnitt: 'PT4H0M',
                },
                arbeidIPeriode: {
                    type: 'ARBEIDER_VANLIG',
                },
            },
            virksomhet: {
                næringstype: 'JORDBRUK_SKOGBRUK',
                navnPåVirksomheten: 'Jordlig',
                registrertINorge: true,
                organisasjonsnummer: '991012133',
                fraOgMed: '2013-09-11',
                tilOgMed: '2023-10-02',
                erNyoppstartet: false,
                harFlereAktiveVirksomheter: true,
                varigEndring: {
                    dato: '2023-01-11',
                    forklaring: 'Alt har endret seg',
                    inntektEtterEndring: 222,
                },
                regnskapsfører: {
                    navn: 'Regnskapsførernavn',
                    telefon: '00112233',
                },
            },
        },
        stønadGodtgjørelse: {
            mottarStønadGodtgjørelse: true,
            _mottarStønadGodtgjørelseIHelePeroden: false,
            _starterUndeveis: true,
            startdato: '2023-09-14',
            _slutterUnderveis: true,
            sluttdato: '2023-09-16',
        },
        opptjeningIUtlandet: [
            {
                navn: 'EøsArbeidsgiver',
                opptjeningType: 'ARBEIDSTAKER',
                land: {
                    landnavn: 'Belgia',
                    landkode: 'BEL',
                },
                fraOgMed: '2023-07-11',
                tilOgMed: '2023-08-11',
            },
        ],
        utenlandskNæring: [
            {
                næringstype: 'JORDBRUK_SKOGBRUK',
                navnPåVirksomheten: 'eøs virksomhet',
                organisasjonsnummer: '123123123',
                land: {
                    landnavn: 'Estland',
                    landkode: 'EST',
                },
                fraOgMed: '2023-07-11',
            },
        ],
        omsorgstilbud: {
            erLiktHverUke: false,
            svarFortid: 'JA',
            svarFremtid: 'JA',
            enkeltdager: [
                {
                    dato: '2023-09-25',
                    tid: 'PT5H0M',
                },
                {
                    dato: '2023-10-02',
                    tid: 'PT4H0M',
                },
                {
                    dato: '2023-10-03',
                    tid: 'PT4H0M',
                },
                {
                    dato: '2023-10-04',
                    tid: 'PT4H0M',
                },
                {
                    dato: '2023-10-05',
                    tid: 'PT4H0M',
                },
                {
                    dato: '2023-10-06',
                    tid: 'PT4H0M',
                },
                {
                    dato: '2023-10-09',
                    tid: 'PT4H0M',
                },
            ],
        },
        nattevåk: {
            harNattevåk: true,
            tilleggsinformasjon: 'Nattevåk ekstrainformasjon',
        },
        beredskap: {
            beredskap: true,
            tilleggsinformasjon: 'Ekstrainformasjon om beredskap',
        },
        medlemskap: {
            harBoddIUtlandetSiste12Mnd: true,
            utenlandsoppholdSiste12Mnd: [
                {
                    landnavn: 'Aruba',
                    landkode: 'ABW',
                    fraOgMed: '2023-08-10',
                    tilOgMed: '2023-08-11',
                },
            ],
            skalBoIUtlandetNeste12Mnd: true,
            utenlandsoppholdNeste12Mnd: [
                {
                    landnavn: 'Aserbajdsjan',
                    landkode: 'AZE',
                    fraOgMed: '2024-01-01',
                    tilOgMed: '2024-02-10',
                },
            ],
        },
        vedlegg: ['/vedlegg'],
        dataBruktTilUtledning:
            '{"arbeidsforholdAvsluttetFørSøknadsperiode":[{"erAnsatt":false,"sluttetFørSøknadsdato":true,"navn":"SJOKKERENDE ELEKTRIKER","orgnr":"947064649"}]}',
    },
    metadata: {
        lastStepID: 'legeerklaering',
        version: '14.0.0',
        updatedTimestemp: '2023-11-08T09:05:50.496Z',
    },
};
