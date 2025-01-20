import { ArbeidIPeriodeType } from '../../../src/app/types/ArbeidIPeriodeType';
import { ArbeidsgiverType } from '../../../src/app/types/Arbeidsgiver';
import { Søknadsdata } from '../../../src/app/types/søknadsdata/Søknadsdata';

const søknadsdata: Søknadsdata = {
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
            fødselsdato: new Date(new Date('2019-06-08T00:00:00.000Z')),
        },
    },
    kurs: {
        søknadsperiode: {
            from: new Date('2024-12-02T00:00:00.000Z'),
            to: new Date('2024-12-09T00:00:00.000Z'),
        },
        søknadsdatoer: [
            new Date('2024-12-02T00:00:00.000Z'),
            new Date('2024-12-03T00:00:00.000Z'),
            new Date('2024-12-04T00:00:00.000Z'),
            new Date('2024-12-05T00:00:00.000Z'),
            new Date('2024-12-06T00:00:00.000Z'),
            new Date('2024-12-07T00:00:00.000Z'),
            new Date('2024-12-08T00:00:00.000Z'),
            new Date('2024-12-09T00:00:00.000Z'),
        ],
        reisedager: {
            reiserUtenforKursdager: false,
        },
        kursholder: 'AHus avdeling 1',
        kursperioder: [
            {
                id: '0',
                periode: {
                    from: new Date('2024-12-02T00:00:00.000Z'),
                    to: new Date('2024-12-08T00:00:00.000Z'),
                },
            },
        ],

        ferieuttakIPerioden: {
            type: 'skalTaUtFerieSøknadsdata',
            skalTaUtFerieIPerioden: true,
            ferieuttak: [
                {
                    id: '8cf1a74c-2e6a-42dc-8f92-221e25c210e7',
                    from: new Date('2024-12-04T00:00:00.000Z'),
                    to: new Date('2024-12-05T00:00:00.000Z'),
                },
            ],
        },
    },
    arbeidssituasjon: {
        arbeidsgivere: {
            '123451234': {
                type: 'pågående',
                arbeidsgiver: {
                    type: ArbeidsgiverType.ORGANISASJON,
                    id: '123451234',
                    organisasjonsnummer: '123451234',
                    navn: 'Arbeids- og velferdsetaten',
                },
                erAnsattISøknadsperiode: true,
                jobberNormaltTimer: 20,
            },
        },
        frilans: {
            type: 'pågående',
            erFrilanser: true,
            jobberFortsattSomFrilans: true,
            startdato: '2021-12-06',
            jobberNormaltTimer: 10,
        },
        selvstendig: {
            type: 'erIkkeSN',
            erSelvstendigNæringsdrivende: false,
        },
        opptjeningUtland: {
            type: 'harIkkeOpptjeningUtland',
        },
        utenlandskNæring: {
            type: 'harIkkeUtenlandskNæring',
        },
    },
    arbeidstid: {
        arbeidsgivere: {
            '123451234': {
                navn: 'Arbeids- og velferdsetaten',
                arbeidIPeriode: {
                    type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer,
                    arbeiderIPerioden: true,
                    arbeiderRedusert: true,
                    enkeltdager: {
                        '2024-12-02': {
                            hours: '5',
                            minutes: '0',
                        },
                        '2024-12-09': {
                            hours: '5',
                            minutes: '0',
                        },
                        '2024-12-06': {
                            minutes: '30',
                            hours: '0',
                        },
                    },
                },
            },
        },
        frilans: {
            type: ArbeidIPeriodeType.arbeiderVanlig,
            arbeiderIPerioden: true,
            arbeiderRedusert: false,
        },
    },
    medlemskap: {
        type: 'harBodd',
        harBoddUtenforNorgeSiste12Mnd: true,
        utenlandsoppholdSiste12Mnd: [
            {
                type: 'enkel',
                id: 'a2f1576f-138e-424f-ab6f-fb50171a4290',
                fom: new Date('2024-10-01T00:00:00.000Z'),
                tom: new Date('2024-11-01T00:00:00.000Z'),
                landkode: 'BHS',
            },
        ],
        skalBoUtenforNorgeNeste12Mnd: false,
    },
    legeerklæring: {
        vedlegg: [],
    },
};
export const mellomlagringMock = {
    søknadHashString: '2cc7804fe085530d3864aa8e71c92f08a39d2716',
    søknadsdata,

    søknadRoute: '/soknad/arbeidssituasjon',
    registrerteBarn: [],
    versjon: '0.1.0',
};
