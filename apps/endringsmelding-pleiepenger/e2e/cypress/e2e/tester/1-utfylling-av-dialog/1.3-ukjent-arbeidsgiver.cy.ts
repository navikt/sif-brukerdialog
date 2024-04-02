import { contextConfig } from '../../contextConfig';
import { enSakEnArbeidsgiverEnPeriodeMock } from '../../data/enSakEnArbeidsgiverEnPeriodeMock';
import { enSakEnArbeidsgiverMock } from '../../data/enSakEnArbeidsgiverMock';
import { flereArbeidsgivereMock } from '../../data/flereArbeidsgivereMock';
import { cyHelpers } from './cyHelpers';

const settings = `
window.appSettings={
    API_URL_INNSYN:'http://localhost:8099',
    FRONTEND_INNSYN_API_PATH:'http://localhost:8099/api',
    API_URL:'http://localhost:8099',
    FRONTEND_API_PATH:'http://localhost:8099/',
    APP_VERSION:'dev',
    APPSTATUS_DATASET:'staging',
    APPSTATUS_PROJECT_ID:'ryujtq87',
    INNSYN_URL:'http://localhost:8080',
    DOMAIN_URL:'http://localhost:8080',
    LOGIN_URL:'http://localhost:8099/login?redirect_location=http://localhost:8099',
    MELLOMLAGRING:'off',
    MSW:'off',
    PUBLIC_PATH:'/familie/sykdom-i-familien/soknad/endringsmelding-pleiepenger',
    USE_AMPLITUDE:'true',
    CYPRESS_ENV:'true',
    TILLAT_SN: 'true',
    IMAGE:'ghcr.io/navikt/sif-brukerdialog/endringsmelding-pleiepenger-mono:825c85c3ef8c5a7ac4906dd4443620715a40a68a',
};`;

describe('Ukjent arbeidsgiver - jobber ikke', () => {
    contextConfig({
        arbeidsgivere: flereArbeidsgivereMock,
        saker: enSakEnArbeidsgiverMock,
        settings,
    });

    before(() => {
        cyHelpers.setTestDate();
        cy.clearLocalStorage();
    });

    cyHelpers.startSøknad({ endreLovbestemtFerie: true });
    cyHelpers.fyllUtUkjentArbeidsforhold('947064642');
    cyHelpers.leggTilFerie(true);
    cyHelpers.fyllUtArbeidstidUkjentArbeidsforhold('947064642', 'HELT_FRAVÆR');
    cyHelpers.fortsettTilOppsummering();
    cyHelpers.kontrollerOppsummeringUkjentArbeidsforholdJobberIkke('947064642');
});

describe('Ukjent arbeidsgiver - jobber vanlig', () => {
    contextConfig({
        arbeidsgivere: flereArbeidsgivereMock,
        saker: enSakEnArbeidsgiverMock,
        settings,
    });

    before(() => {
        cyHelpers.setTestDate();
        cy.clearLocalStorage();
    });

    cyHelpers.startSøknad({ endreLovbestemtFerie: true });
    cyHelpers.fyllUtUkjentArbeidsforhold('947064642');
    cyHelpers.leggTilFerie(true);
    cyHelpers.fyllUtArbeidstidUkjentArbeidsforhold('947064642', 'SOM_VANLIG');
    cyHelpers.fortsettTilOppsummering();
    cyHelpers.kontrollerOppsummeringUkjentArbeidsforholdJobberVanlig('947064642');
});

describe('Ukjent arbeidsgiver - redusert', () => {
    contextConfig({
        arbeidsgivere: flereArbeidsgivereMock,
        saker: enSakEnArbeidsgiverEnPeriodeMock,
        settings,
    });

    before(() => {
        cyHelpers.setTestDate();
        cy.clearLocalStorage();
    });

    cyHelpers.startSøknad({ endreLovbestemtFerie: false, endreArbeidstid: true });
    cyHelpers.fyllUtUkjentArbeidsforhold('947064642');
    cyHelpers.fyllUtArbeidstidUkjentArbeidsforhold('947064642', 'REDUSERT', [
        {
            ukenummer: '4',
            tid: '1',
        },
        {
            ukenummer: '5',
            tid: '2',
        },
        {
            ukenummer: '6',
            tid: '3',
        },
        {
            ukenummer: '7',
            tid: '4',
        },
    ]);
    cyHelpers.fortsettTilOppsummering();
    cyHelpers.kontrollerOppsummeringUkjentArbeidsforholdJobberRedusert('947064642');
});
