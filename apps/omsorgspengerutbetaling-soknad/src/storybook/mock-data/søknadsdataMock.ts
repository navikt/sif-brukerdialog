import { ISODateToDate } from '@navikt/sif-common-utils';
import { DineBarnSøknadsdataType, Søknadsdata } from '../../app/types/søknadsdata/Søknadsdata';
import { Næringstype } from '@navikt/sif-common-forms-ds';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { Aktivitet } from '../../app/types/AktivitetFravær';

export const søknadsdataMock: Søknadsdata = {
    id: '4d57d2c9-acba-4c4d-b107-fe832cdd8a5e',
    velkommen: {
        harForståttRettigheterOgPlikter: true,
    },
    dineBarn: {
        type: DineBarnSøknadsdataType.UTVIDET_RETT_PGA_SYKDOM_ELLER_ALENEOMSORG,
        harUtvidetRett: true,
        andreBarn: [],
        harSyktBarn: true,
        harDekketTiFørsteDagerSelv: true,
    },
    fravaer: {
        type: 'harFulltOgDelvisFravær',
        harPerioderMedFravær: true,
        fraværPerioder: [
            {
                id: 'd083ac9f-3a60-4ef0-a01e-8b0a30d4e2e9',
                fraOgMed: ISODateToDate('2024-04-08'),
                tilOgMed: ISODateToDate('2024-04-12'),
            },
        ],
        harDagerMedDelvisFravær: true,
        fraværDager: [
            {
                id: '73ccb9b5-d29c-496d-8ca2-bdf9fe3549b8',
                timerArbeidsdag: '7',
                timerFravær: '1',
                dato: ISODateToDate('2024-04-15'),
            },
        ],
        perioder_harVærtIUtlandet: true,
        perioder_utenlandsopphold: [
            {
                id: 'd1b6db4d-fc66-4910-8ec4-61568911e652',
                fom: ISODateToDate('2024-04-08'),
                tom: ISODateToDate('2024-04-10'),
                landkode: 'AFG',
            },
        ],
        førsteOgSisteDagMedFravær: {
            from: ISODateToDate('2024-04-08'),
            to: ISODateToDate('2024-04-15'),
        },
    },
    legeerklæring: {
        vedlegg: [],
    },
    arbeidssituasjon: {
        frilans: {
            type: 'pågående',
            erFrilanser: true,
            startdato: '2024-01-02',
            jobberFortsattSomFrilans: true,
        },
        selvstendig: {
            type: 'erSN',
            erSelvstendigNæringsdrivende: true,
            virksomhet: {
                næringstype: Næringstype.JORDBRUK_SKOGBRUK,
                navnPåVirksomheten: 'asdasd',
                registrertINorge: YesOrNo.NO,
                registrertILand: 'DZA',
                fom: ISODateToDate('2024-04-15'),
                erPågående: true,
                næringsinntekt: 123123,
                harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: YesOrNo.NO,
                fiskerErPåBladB: YesOrNo.UNANSWERED,
                hattVarigEndringAvNæringsinntektSiste4Kalenderår: YesOrNo.UNANSWERED,
                harRegnskapsfører: YesOrNo.UNANSWERED,
                id: 'ccd20ce3-1e01-4beb-b5da-83fb7c6ab711',
            },
            harFlereVirksomheter: true,
        },
    },
    fravaerFra: {
        type: 'harFraværFra',
        aktivitetFravær: {
            '2024-04-08': {
                aktivitet: Aktivitet.BEGGE,
            },
            '2024-04-09': {
                aktivitet: Aktivitet.BEGGE,
            },
            '2024-04-10': {
                aktivitet: Aktivitet.BEGGE,
            },
            '2024-04-11': {
                aktivitet: Aktivitet.BEGGE,
            },
            '2024-04-12': {
                aktivitet: Aktivitet.BEGGE,
            },
            '2024-04-15': {
                aktivitet: Aktivitet.BEGGE,
            },
        },
    },
    medlemskap: {
        type: 'harBodd',
        harBoddUtenforNorgeSiste12Mnd: true,
        utenlandsoppholdSiste12Mnd: [
            {
                id: '4ffe9887-000f-496a-bc38-a5428dcc259b',
                fom: ISODateToDate('2023-11-06'),
                tom: ISODateToDate('2024-04-13'),
                landkode: 'AFG',
            },
        ],
        skalBoUtenforNorgeNeste12Mnd: false,
    },
};
