export const mellomlagringMock = {
    formValues: {
        periodeFra: '2023-01-02',
        periodeTil: '2023-01-15',
        barnetsNavn: '',
        barnetsFødselsnummer: '',
        barnetSøknadenGjelder: '2811762539343',
        harForståttRettigheterOgPlikter: true,
        harBekreftetOpplysninger: false,
        søknadenGjelderEtAnnetBarn: false,
        barnetHarIkkeFnr: false,
        fødselsattest: [],
        legeerklæring: [],
        ansatt_arbeidsforhold: [
            {
                arbeidsgiver: {
                    type: 'ORGANISASJON',
                    id: '947064649',
                    organisasjonsnummer: '947064649',
                    navn: 'WHOA.BOA',
                },
                erAnsatt: 'yes',
                normalarbeidstid: { timerPerUke: '30' },
                arbeidIPeriode: { arbeiderIPerioden: 'HELT_FRAVÆR' },
            },
        ],
        harBoddUtenforNorgeSiste12Mnd: 'no',
        utenlandsoppholdSiste12Mnd: [],
        skalBoUtenforNorgeNeste12Mnd: 'no',
        utenlandsoppholdNeste12Mnd: [],
        skalOppholdeSegIUtlandetIPerioden: 'no',
        utenlandsoppholdIPerioden: [],
        skalTaUtFerieIPerioden: 'no',
        ferieuttakIPerioden: [],
        omsorgstilbud: { erIOmsorgstilbudFremtid: 'no' },
        harNattevåk: 'unanswered',
        harBeredskap: 'unanswered',
        frilans: { harHattInntektSomFrilanser: 'no' },
        omsorgsstønad: { mottarOmsorgsstønad: 'no' },
        fosterhjemsgodtgjørelse: { mottarFosterhjemsgodtgjørelse: 'no' },
        selvstendig: { harHattInntektSomSN: 'no' },
        frilansoppdrag: [],
        harOpptjeningUtland: 'no',
        opptjeningUtland: [],
        harUtenlandskNæring: 'no',
        utenlandskNæring: [],
    },
    metadata: {
        lastStepID: 'medlemskap',
        version: '14.2.0',
        updatedTimestemp: '2023-01-01T00:00:00.000Z',
        featureToggles: {
            spørOmSluttetISøknadsperiode: false,
        },
    },
};
