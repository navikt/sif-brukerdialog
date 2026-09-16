import { ArbeidIPeriodeType } from '../../src/app/types/ArbeidIPeriodeType';
import { ArbeidsgiverType } from '../../src/app/types/Arbeidsgiver';

const søknadsdata = {
    id: 'c53edb47-7ada-4b58-947b-f21f866eb3a9',
    velkommen: {
        harForståttRettigheterOgPlikter: true,
    },
    omBarnet: {
        type: 'registrerteBarn',
        registrertBarn: {
            aktørId: '2811762539343',
            fornavn: 'ALFABETISK',
            etternavn: 'FAGGOTT',
            fødselsdato: '2019-06-08',
        },
    },
    kurs: {
        søknadsperiode: {
            from: '2024-12-02',
            to: '2024-12-06',
        },
        søknadsdatoer: ['2024-12-02', '2024-12-03', '2024-12-04', '2024-12-05', '2024-12-06'],
        reisedager: {
            reiserUtenforKursdager: true,
            reisedager: [
                {
                    id: 'a3a41532-7db3-409a-9903-3d5b62fdb0ba',
                    dato: '2024-12-03',
                },
            ],
            reisedagerBeskrivelse: 'Kombinerer med ferie',
        },
        enkeltdagEllerPeriode: 'PERIODE' as any,
        kursholder: 'Barnas Fysioterapisenter i Bergen',
        kursperioder: [
            {
                id: '0',
                periode: {
                    from: '2024-12-02',
                    to: '2024-12-06',
                },
            },
        ],
        kursdager: [],
        ferieuttakIPerioden: {
            type: 'skalTaUtFerieSøknadsdata',
            skalTaUtFerieIPerioden: true,
            ferieuttak: [
                {
                    id: '8cf1a74c-2e6a-42dc-8f92-221e25c210e7',
                    from: '2024-12-04',
                    to: '2024-12-05',
                },
            ],
        },
        utenlandsopphold: {
            type: 'harUtenlandsopphold',
            skalOppholdeSegIUtlandetIPerioden: true,
            utenlandsopphold: [
                {
                    type: 'enkel',
                    landkode: 'ABW',
                    fom: '2024-12-06',
                    tom: '2024-12-06',
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
                    navn: 'SNODIG FISKER',
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
                navn: 'SNODIG FISKER',
                arbeidIPeriode: {
                    type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer,
                    arbeiderIPerioden: true,
                    arbeiderRedusert: true,
                    enkeltdager: {
                        '2024-12-02': {
                            hours: '5',
                            minutes: '0',
                        },
                        '2024-12-03': {
                            hours: '5',
                            minutes: '0',
                        },
                        '2024-12-04': {
                            hours: '5',
                            minutes: '0',
                        },
                        '2024-12-05': {
                            hours: '5',
                            minutes: '0',
                        },
                        '2024-12-06': {
                            minutes: '30',
                            hours: '0',
                        },
                        '2024-12-09': {
                            minutes: '0',
                            hours: '0',
                        },
                        '2024-12-10': {
                            minutes: '0',
                            hours: '0',
                        },
                        '2024-12-11': {
                            minutes: '0',
                            hours: '0',
                        },
                        '2024-12-16': {
                            minutes: '0',
                            hours: '0',
                        },
                        '2024-12-17': {
                            minutes: '0',
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
                fom: '2024-10-01',
                tom: '2024-11-01',
                landkode: 'BHS',
            },
        ],
        skalBoUtenforNorgeNeste12Mnd: false,
    },
    legeerklæring: {
        vedlegg: [],
        skalEttersendeVedlegg: false,
    },
};

export const mellomlagringMock = {
    søknadHashString: 'a090074975a5b49ef3d7543e1555d2996748b4c0',
    søknadsdata,
    søknadRoute: '/soknad/arbeidssituasjon',
    registrerteBarn: [],
    versjon: '1.0.0',
};
