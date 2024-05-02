import { ArbeidsaktivitetType, Sak } from '../../app/types';

export const sakMock: Sak = {
    ytelse: {
        type: 'PLEIEPENGER_SYKT_BARN',
    },
    arbeidsgivereIkkeISak: [],
    harArbeidsgivereIkkeISak: false,
    søknadsperioder: [
        {
            from: new Date('2024-01-31T23:00:00.000Z'),
            to: new Date('2024-10-01T00:00:00.000Z'),
        },
    ],
    samletSøknadsperiode: {
        from: new Date('2024-01-31T23:00:00.000Z'),
        to: new Date('2024-10-01T00:00:00.000Z'),
    },
    barn: {
        fødselsdato: new Date('2017-03-03T00:00:00.000Z'),
        fornavn: 'Nora',
        etternavn: 'Nordmann',
        aktørId: '2559652436225',
        identitetsnummer: '03831799748',
    },
    arbeidsaktivitetMedUkjentArbeidsgiver: [
        {
            organisasjonsnummer: '123123123',
        },
    ],
    arbeidsaktiviteter: {
        arbeidstakerAktiviteter: [
            {
                key: 'a_947064649',
                arbeidsgiver: {
                    key: 'a_947064649',
                    organisasjonsnummer: '947064649',
                    navn: 'Dykkert svømmeutstyr',
                    ansattFom: new Date('2008-10-01T00:00:00.000Z'),
                },
                type: ArbeidsaktivitetType.arbeidstaker,
                navn: 'Dykkert svømmeutstyr',
                erUkjentArbeidsforhold: false,
                perioderMedArbeidstid: [],
                harPerioderFørTillattEndringsperiode: true,
                harPerioderEtterTillattEndringsperiode: false,
            },
            {
                key: 'a_947064640',
                arbeidsgiver: {
                    key: 'a_947064640',
                    organisasjonsnummer: '947064640',
                    navn: 'Vinge flyfly',
                    ansattFom: new Date('2008-10-01T00:00:00.000Z'),
                },
                type: ArbeidsaktivitetType.arbeidstaker,
                navn: 'Vinge flyfly',
                erUkjentArbeidsforhold: false,
                perioderMedArbeidstid: [],
                harPerioderFørTillattEndringsperiode: true,
                harPerioderEtterTillattEndringsperiode: false,
            },
        ],
        frilanser: {
            key: 'frilanser',
            type: ArbeidsaktivitetType.frilanser,
            navn: 'Frilanser',
            perioderMedArbeidstid: [],
            harPerioderFørTillattEndringsperiode: true,
            harPerioderEtterTillattEndringsperiode: false,
        },
    },
    lovbestemtFerie: {
        feriedager: {},
    },
    utledet: {
        aktiviteterSomKanEndres: [
            {
                key: 'a_947064649',
                arbeidsgiver: {
                    key: 'a_947064649',
                    organisasjonsnummer: '947064649',
                    navn: 'Dykkert svømmeutstyr',
                    ansattFom: new Date('2008-10-01T00:00:00.000Z'),
                },
                type: ArbeidsaktivitetType.arbeidstaker,
                navn: 'Dykkert svømmeutstyr',
                erUkjentArbeidsforhold: false,
                perioderMedArbeidstid: [],
                harPerioderFørTillattEndringsperiode: true,
                harPerioderEtterTillattEndringsperiode: false,
            },
            {
                key: 'a_947064640',
                arbeidsgiver: {
                    key: 'a_947064640',
                    organisasjonsnummer: '947064640',
                    navn: 'Vinge flyfly',
                    ansattFom: new Date('2008-10-01T00:00:00.000Z'),
                },
                type: ArbeidsaktivitetType.arbeidstaker,
                navn: 'Vinge flyfly',
                erUkjentArbeidsforhold: false,
                perioderMedArbeidstid: [],
                harPerioderFørTillattEndringsperiode: true,
                harPerioderEtterTillattEndringsperiode: false,
            },
            {
                key: 'frilanser',
                type: ArbeidsaktivitetType.frilanser,
                navn: 'Frilanser',
                perioderMedArbeidstid: [],
                harPerioderFørTillattEndringsperiode: true,
                harPerioderEtterTillattEndringsperiode: false,
            },
        ],
    },
};
