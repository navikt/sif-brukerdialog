export const mellomlagringMock = {
    søknadHashString: '2cc7804fe085530d3864aa8e71c92f08a39d2716',
    søknadsdata: {
        id: 'c53edb47-7ada-4b58-947b-f21f866eb3a9',
        velkommen: {
            harForståttRettigheterOgPlikter: true,
        },
        omBarnet: {
            type: 'registrerteBarn',
            aktørId: '2811762539343',
            registrertBarn: {
                aktørId: '2811762539343',
                fornavn: 'ALFABETISK',
                etternavn: 'FAGGOTT',
                fødselsdato: '2019-06-08T00:00:00.000Z',
            },
        },
        kurs: {
            søknadsperiode: {
                from: '2024-12-02T00:00:00.000Z',
                to: '2024-12-09T00:00:00.000Z',
            },
            søknadsdatoer: [
                '2024-12-02T00:00:00.000Z',
                '2024-12-03T00:00:00.000Z',
                '2024-12-04T00:00:00.000Z',
                '2024-12-05T00:00:00.000Z',
                '2024-12-06T00:00:00.000Z',
                '2024-12-07T00:00:00.000Z',
                '2024-12-08T00:00:00.000Z',
                '2024-12-09T00:00:00.000Z',
            ],
            kursholder: 'AHus avdeling 1',
            kursperioder: [
                {
                    id: '0',
                    periode: {
                        from: '2024-12-02T00:00:00.000Z',
                        to: '2024-12-08T00:00:00.000Z',
                    },
                    periodeMedReise: {
                        from: '2024-12-02T00:00:00.000Z',
                        to: '2024-12-09T00:00:00.000Z',
                    },
                    harTaptArbeidstid: true,
                    avreise: '2024-12-02T00:00:00.000Z',
                    hjemkomst: '2024-12-09T00:00:00.000Z',
                    beskrivelseReisetid: 'En forklaring',
                },
            ],
            arbeiderIKursperiode: true,
            ferieuttakIPerioden: {
                type: 'skalTaUtFerieSøknadsdata',
                skalTaUtFerieIPerioden: true,
                ferieuttak: [
                    {
                        id: '8cf1a74c-2e6a-42dc-8f92-221e25c210e7',
                        from: '2024-12-04T00:00:00.000Z',
                        to: '2024-12-05T00:00:00.000Z',
                    },
                ],
            },
        },
    },
    søknadRoute: '/soknad/arbeidssituasjon',
    registrerteBarn: [],
    versjon: '0.1.0',
};
