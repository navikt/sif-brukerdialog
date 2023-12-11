import { YesOrNoDontKnow } from '../../../src/app/types/YesOrNoDontKnow';

export const mellomlagring = {
    søknadHashString: '01eb5f48e0cf2ce54a6d8ca6b9e3bc22427e3b91',
    søknadsdata: {
        id: '3f673283-3c81-41b2-ab8c-1eed2d78e4bd',
        velkommen: {
            harForståttRettigheterOgPlikter: true,
        },
        opplysningerOmPleietrengende: {
            type: 'pleietrengendeMedFnr',
            navn: 'Test Testesen',
            flereSokere: YesOrNoDontKnow.NO,
            norskIdentitetsnummer: '27857798800',
        },
        legeerklæring: {
            vedlegg: [
                {
                    file: {
                        isPersistedFile: true,
                        name: 'navlogopng.png',
                        lastModified: 1695138181862,
                        type: 'image/jpeg',
                        size: 1174400,
                    },
                    pending: false,
                    uploaded: true,
                    url: 'http://localhost:8080/api/vedlegg/eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdG',
                },
            ],
        },
        tidsrom: {
            type: 'tidsromUtenUtenlandsopphold',
            pleierDuDenSykeHjemme: true,
            søknadsperiode: {
                from: '2023-09-03T22:00:00.000Z',
                to: '2023-10-12T22:00:00.000Z',
            },
            dagerMedPleie: [
                '2023-09-03T22:00:00.000Z',
                '2023-09-10T22:00:00.000Z',
                '2023-09-17T22:00:00.000Z',
                '2023-09-24T22:00:00.000Z',
                '2023-10-08T22:00:00.000Z',
                '2023-10-09T22:00:00.000Z',
                '2023-10-10T22:00:00.000Z',
                '2023-10-11T22:00:00.000Z',
                '2023-10-12T22:00:00.000Z',
            ],
            skalJobbeOgPleieSammeDag: 'yes',
            flereSokere: 'no',
            skalOppholdeSegIUtlandetIPerioden: false,
        },
        arbeidssituasjon: {
            arbeidsgivere: {
                '123451234': {
                    type: 'pågående',
                    arbeidsgiver: {
                        type: 'ORGANISASJON',
                        id: '123451234',
                        organisasjonsnummer: '123451234',
                        navn: 'Arbeids- og velferdsetaten',
                    },
                    erAnsattISøknadsperiode: true,
                    jobberNormaltTimer: 37.5,
                },
                '09435628': {
                    type: 'sluttetFørSøknadsperiode',
                    arbeidsgiver: {
                        type: 'ORGANISASJON',
                        id: '09435628',
                        organisasjonsnummer: '09435628',
                        navn: 'Telenor',
                    },
                    erAnsattISøknadsperiode: false,
                },
            },
            frilans: {
                type: 'erIkkeFrilanser',
                erFrilanser: false,
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
                        type: 'ARBEIDER_IKKE',
                        arbeiderIPerioden: false,
                    },
                },
            },
        },
        medlemskap: {
            type: 'harIkkeBoddSkalIkkeBo',
            harBoddUtenforNorgeSiste12Mnd: false,
            skalBoUtenforNorgeNeste12Mnd: false,
        },
    },
    frilansoppdrag: [],
    søknadRoute: '/soknad/oppsummering',
    versjon: '2.0.0',
};
