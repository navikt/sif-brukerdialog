import { ISODateToDate } from '@navikt/sif-common-utils';
import { PleietrengendeMedSak } from '../../src/server/api-models/PleietrengendeMedSakSchema';
import { Behandlingsstatus } from '../../src/server/api-models/Behandlingsstatus';
import { Innsendelsestype } from '../../src/server/api-models/Innsendelsestype';

export const flereSakerMock: PleietrengendeMedSak[] = [
    {
        pleietrengende: {
            identitetsnummer: '27870899799',
            fødselsdato: ISODateToDate('2008-07-27'),
            fornavn: 'RAVGUL',
            mellomnavn: null,
            etternavn: 'LØVETANN',
            aktørId: '2175638020356',
            anonymisert: false,
        },
        sak: {
            saksnummer: '2FAKQRW',
            utledetStatus: {
                status: Behandlingsstatus.UNDER_BEHANDLING,
                aksjonspunkter: [],
                saksbehandlingsFrist: ISODateToDate('2024-03-26'),
            },
            behandlinger: [
                {
                    status: Behandlingsstatus.UNDER_BEHANDLING,
                    opprettetTidspunkt: new Date('2024-02-14T11:59:40.061Z'),
                    avsluttetTidspunkt: new Date('2024-02-14T11:59:40.061Z'),
                    innsendelser: [
                        {
                            søknadId: '1',
                            innsendelsestype: Innsendelsestype.ENDRINGSMELDING,
                            k9FormatInnsendelse: {
                                søknadId: 'af5088f4-7739-4c47-8665-ee1397200e8f',
                                mottattDato: new Date('2024-02-14T11:59:40.061Z'),
                                ytelse: {
                                    type: 'PLEIEPENGER_SYKT_BARN',
                                    søknadsperiode: [],
                                    arbeidstid: {
                                        arbeidstakerList: [
                                            {
                                                organisasjonsnummer: '839942907',
                                                arbeidstidInfo: {
                                                    perioder: {
                                                        '2024-02-26/2024-02-29': {
                                                            jobberNormaltTimerPerDag: 'PT8H',
                                                            faktiskArbeidTimerPerDag: 'PT48M',
                                                        },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            },
                            dokumenter: [
                                {
                                    journalpostId: '637581723',
                                    dokumentInfoId: '667124045',
                                    tittel: 'Endringsmelding for pleiepenger sykt barn',
                                    filtype: 'PDF' as any,
                                    harTilgang: true,
                                    url: 'http://sif-innsyn-api/dokument/637581723/667124045/ARKIV',
                                    relevanteDatoer: [],
                                },
                            ],
                        },
                    ],
                    aksjonspunkter: [],
                },
            ],
        },
    },
    {
        pleietrengende: {
            identitetsnummer: '03121199799',
            fødselsdato: ISODateToDate('2011-12-03'),
            aktørId: '2175638020352',
            anonymisert: true,
        },
        sak: {
            saksnummer: '1DQAQRW',
            utledetStatus: {
                status: Behandlingsstatus.AVSLUTTET,
                aksjonspunkter: [],
                saksbehandlingsFrist: ISODateToDate('2024-03-26'),
            },

            behandlinger: [
                {
                    status: Behandlingsstatus.AVSLUTTET,
                    opprettetTidspunkt: new Date('2024-02-14T11:59:40.061Z'),
                    avsluttetTidspunkt: new Date('2024-02-14T11:59:40.061Z'),
                    innsendelser: [
                        {
                            søknadId: '2',
                            innsendelsestype: Innsendelsestype.ENDRINGSMELDING,
                            k9FormatInnsendelse: {
                                søknadId: 'af5088f4-7739-4c47-8665-ee1397200e8f',
                                mottattDato: new Date('2024-02-14T11:59:40.061Z'),
                                ytelse: {
                                    type: 'PLEIEPENGER_SYKT_BARN',
                                    søknadsperiode: [],
                                    arbeidstid: {
                                        arbeidstakerList: [
                                            {
                                                organisasjonsnummer: '839942907',
                                                arbeidstidInfo: {
                                                    perioder: {
                                                        '2024-02-26/2024-02-29': {
                                                            jobberNormaltTimerPerDag: 'PT8H',
                                                            faktiskArbeidTimerPerDag: 'PT48M',
                                                        },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            },
                            dokumenter: [
                                {
                                    journalpostId: '637581723',
                                    dokumentInfoId: '667124045',
                                    tittel: 'Endringsmelding for pleiepenger sykt barn',
                                    filtype: 'PDF' as any,
                                    harTilgang: true,
                                    url: 'http://sif-innsyn-api/dokument/637581723/667124045/ARKIV',
                                    relevanteDatoer: [],
                                },
                            ],
                        },
                    ],
                    aksjonspunkter: [],
                },
            ],
        },
    },
];
