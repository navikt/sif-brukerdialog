import { Næringstype, OpptjeningAktivitet, UtenlandskNæringstype } from '@navikt/sif-common-forms-ds';
import { ArbeidsgiverType } from '../../app/types/Arbeidsgiver';
import { SøknadContextState } from '../../app/types/SøknadContextState';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { SøknadRoutes } from '../../app/types/SøknadRoutes';

import { Kursperiode } from '../../app/types/Kursperiode';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { ISODateToDate } from '@navikt/sif-common-utils';
import { getDatoerIKursperioder } from '../../app/søknad/steps/kurs/kursStepUtils';

const kursperioder: Kursperiode[] = [
    {
        id: '1',
        periode: {
            from: new Date('2024-05-05T22:00:00.000Z'),
            to: new Date('2024-05-30T22:00:00.000Z'),
        },
    },
];

const barn1: RegistrertBarn = {
    fornavn: 'ALFABETISK',
    etternavn: 'FAGGOTT',
    aktørId: '2811762539343',
    fødselsdato: ISODateToDate('2019-06-08'),
};

const barn2: RegistrertBarn = {
    fornavn: 'Barn',
    mellomnavn: 'Barne',
    etternavn: 'Barnesen',
    fødselsdato: ISODateToDate('2020-04-20'),
    aktørId: '123',
};

const registrerteBarn: RegistrertBarn[] = [barn1, barn2];

export const søknadContextMock: SøknadContextState = {
    versjon: '2.0.0',
    søker: {
        aktørId: '2320509955297',
        fødselsdato: new Date('1995-06-02'),
        fødselsnummer: '02869599258',
        fornavn: 'PRESENTABEL',
        mellomnavn: undefined,
        etternavn: 'HOFTE',
    },

    registrerteBarn,
    søknadsdata: {
        id: '8525bf3f-ab0a-495e-90bc-759efd2723b9',
        velkommen: {
            harForståttRettigheterOgPlikter: true,
        },

        omBarnet: undefined,
        kurs: {
            søknadsperiode: {
                from: new Date('2024-05-05T22:00:00.000Z'),
                to: new Date('2024-05-30T22:00:00.000Z'),
            },
            søknadsdatoer: getDatoerIKursperioder(kursperioder),
            kursholder: 'annen',
            kursperioder,
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
                startdato: '2007-02-08',
                jobberNormaltTimer: 10,
            },
            selvstendig: {
                type: 'erSN',
                erSelvstendigNæringsdrivende: true,
                harFlereVirksomheter: false,
                virksomhet: {
                    næringstype: Næringstype.JORDBRUK_SKOGBRUK,
                    navnPåVirksomheten: 'Jordy',
                    registrertINorge: YesOrNo.YES,
                    organisasjonsnummer: '991012133',
                    fom: new Date('2015-05-05T00:00:00.000Z'),
                    hattVarigEndringAvNæringsinntektSiste4Kalenderår: YesOrNo.NO,
                    harRegnskapsfører: YesOrNo.NO,
                    fiskerErPåBladB: YesOrNo.UNANSWERED,
                    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: YesOrNo.UNANSWERED,
                    erPågående: true,
                    id: '8972d189-2310-40c0-afb9-d10eb1cb8d77',
                },
                jobberNormaltTimer: 5,
            },
            opptjeningUtland: {
                type: 'harOpptjeningUtland',
                opptjeningUtland: [
                    {
                        fom: new Date('2024-05-01T00:00:00.000Z'),
                        tom: new Date('2024-05-02T00:00:00.000Z'),
                        landkode: 'BGR',
                        opptjeningType: OpptjeningAktivitet.ARBEIDSTAKER,
                        navn: 'Earthy',
                        id: '841121ea-c345-4929-9810-cd58be9410d0',
                    },
                ],
            },
            utenlandskNæring: {
                type: 'harUtenlandskNæring',
                utenlandskNæring: [
                    {
                        næringstype: UtenlandskNæringstype.DAGMAMMA,
                        navnPåVirksomheten: 'Baby',
                        identifikasjonsnummer: '123',
                        land: 'IRL',
                        erPågående: true,
                        fraOgMed: new Date('2024-05-01T00:00:00.000Z'),
                        id: '71c846dd-942f-489c-9ce7-3aa13d027bf4',
                    },
                ],
            },
        },
        medlemskap: {
            type: 'harBoddSkalBo',
            harBoddUtenforNorgeSiste12Mnd: true,
            utenlandsoppholdSiste12Mnd: [
                {
                    type: 'enkel',
                    id: '87b46d9b-85a3-4f25-8af9-2a584c2d75be',
                    fom: new Date('2024-01-15T00:00:00.000Z'),
                    tom: new Date('2024-02-09T00:00:00.000Z'),
                    landkode: 'ALB',
                },
            ],
            skalBoUtenforNorgeNeste12Mnd: true,
            utenlandsoppholdNeste12Mnd: [
                {
                    type: 'enkel',
                    id: '18f7901b-b2ff-4ea2-ae13-2d738ceebc69',
                    fom: new Date('2024-05-22T00:00:00.000Z'),
                    tom: new Date('2024-05-31T00:00:00.000Z'),
                    landkode: 'ARG',
                },
            ],
        },
        legeerklæring: {
            vedlegg: [
                {
                    file: {
                        isPersistedFile: true,
                        name: 'Voucher-Transport-BEJ240301YUBB.pdf',
                        lastModified: 1709278608000,
                        type: 'application/pdf',
                        size: 65231,
                    },
                    pending: false,
                    uploaded: true,
                    error: false,
                    info: {
                        id: 'eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdG',
                        url: 'http://localhost:8080/api/vedlegg/eyJraWQiOiIxIiwidHlwIjoiSldUIiwiYWxnIjoibm9uZSJ9.eyJqdG',
                    },
                },
            ],
        },
    },
    søknadRoute: SøknadRoutes.LEGEERKLÆRING,
    børMellomlagres: true,
    frilansoppdrag: [],
};
