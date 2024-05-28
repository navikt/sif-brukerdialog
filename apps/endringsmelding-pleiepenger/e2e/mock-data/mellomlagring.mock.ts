export const mellomlagring = {
    versjon: '1.2.0',
    søknadHashString: '6b609ceef921250f8bd4875f564610c420562c94',
    barnAktørId: '2559652436225',
    søknadsdata: {
        id: 'b57fa68e-2ebc-4805-851a-4f05a423f414',
        velkommen: {
            harForståttRettigheterOgPlikter: true,
        },
        lovbestemtFerie: {
            feriedager: {
                '2023-01-12': {
                    dato: '2023-01-12T00:00:00.000Z',
                    skalHaFerie: true,
                    liggerISak: true,
                },
                '2023-01-13': {
                    dato: '2023-01-13T00:00:00.000Z',
                    skalHaFerie: true,
                    liggerISak: true,
                },
                '2023-01-14': {
                    dato: '2023-01-14T00:00:00.000Z',
                    skalHaFerie: true,
                    liggerISak: true,
                },
                '2023-01-15': {
                    dato: '2023-01-15T00:00:00.000Z',
                    skalHaFerie: true,
                    liggerISak: true,
                },
                '2024-05-13': {
                    dato: '2024-05-13T00:00:00.000Z',
                    skalHaFerie: true,
                    liggerISak: false,
                },
                '2024-05-14': {
                    dato: '2024-05-14T00:00:00.000Z',
                    skalHaFerie: true,
                    liggerISak: false,
                },
                '2024-05-15': {
                    dato: '2024-05-15T00:00:00.000Z',
                    skalHaFerie: true,
                    liggerISak: false,
                },
                '2024-05-16': {
                    dato: '2024-05-16T00:00:00.000Z',
                    skalHaFerie: true,
                    liggerISak: false,
                },
                '2024-05-17': {
                    dato: '2024-05-17T00:00:00.000Z',
                    skalHaFerie: true,
                    liggerISak: false,
                },
                '2024-05-18': {
                    dato: '2024-05-18T00:00:00.000Z',
                    skalHaFerie: true,
                    liggerISak: false,
                },
                '2024-05-19': {
                    dato: '2024-05-19T00:00:00.000Z',
                    skalHaFerie: true,
                    liggerISak: false,
                },
            },
            feriedagerMeta: {
                datoerFjernet: [],
                datoerLagtTil: [
                    '2024-05-13T00:00:00.000Z',
                    '2024-05-14T00:00:00.000Z',
                    '2024-05-15T00:00:00.000Z',
                    '2024-05-16T00:00:00.000Z',
                    '2024-05-17T00:00:00.000Z',
                    '2024-05-18T00:00:00.000Z',
                    '2024-05-19T00:00:00.000Z',
                ],
                datoerMedFerie: [
                    '2023-01-12T00:00:00.000Z',
                    '2023-01-13T00:00:00.000Z',
                    '2023-01-14T00:00:00.000Z',
                    '2023-01-15T00:00:00.000Z',
                    '2024-05-13T00:00:00.000Z',
                    '2024-05-14T00:00:00.000Z',
                    '2024-05-15T00:00:00.000Z',
                    '2024-05-16T00:00:00.000Z',
                    '2024-05-17T00:00:00.000Z',
                    '2024-05-18T00:00:00.000Z',
                    '2024-05-19T00:00:00.000Z',
                ],
                datoerUendret: [
                    '2023-01-12T00:00:00.000Z',
                    '2023-01-13T00:00:00.000Z',
                    '2023-01-14T00:00:00.000Z',
                    '2023-01-15T00:00:00.000Z',
                ],
                perioderFjernet: [],
                perioderLagtTil: [
                    {
                        from: '2024-05-13T00:00:00.000Z',
                        to: '2024-05-19T00:00:00.000Z',
                    },
                ],
                perioderUendret: [
                    {
                        from: '2023-01-12T00:00:00.000Z',
                        to: '2023-01-15T00:00:00.000Z',
                    },
                ],
                ferieperioder: [
                    {
                        from: '2023-01-12T00:00:00.000Z',
                        to: '2023-01-15T00:00:00.000Z',
                        skalHaFerie: true,
                        liggerISak: true,
                    },
                    {
                        from: '2024-05-13T00:00:00.000Z',
                        to: '2024-05-19T00:00:00.000Z',
                        skalHaFerie: true,
                        liggerISak: false,
                    },
                ],
                erEndret: true,
            },
        },
        ukjentArbeidsforhold: {
            arbeidsforhold: [
                {
                    erAnsatt: true,
                    arbeidsgiverKey: 'a_947064642',
                    normalarbeidstid: {
                        timerPerUke: {
                            hours: '20',
                            minutes: '0',
                        },
                    },
                },
                {
                    erAnsatt: true,
                    arbeidsgiverKey: 'a_947064643',
                    normalarbeidstid: {
                        timerPerUke: {
                            hours: '6',
                            minutes: '0',
                        },
                    },
                },
            ],
        },
        arbeidstid: {
            arbeidsaktivitet: {
                a_947064642: {
                    endringer: {},
                    arbeiderIPerioden: 'HELT_FRAVÆR',
                },
                a_947064643: {
                    endringer: {},
                    arbeiderIPerioden: 'HELT_FRAVÆR',
                },
            },
        },
    },
    søknadRoute: '/melding/oppsummering',
    valgteEndringer: {
        arbeidstid: true,
        lovbestemtFerie: true,
    },
    harArbeidsgivereIkkeISak: true,
    søknadSteps: ['ukjentArbeidsforhold', 'lovbestemtFerie', 'arbeidstid', 'oppsummering'],
    metadata: {
        updatedTimestamp: '2024-05-15T10:18:32.500Z',
    },
};
