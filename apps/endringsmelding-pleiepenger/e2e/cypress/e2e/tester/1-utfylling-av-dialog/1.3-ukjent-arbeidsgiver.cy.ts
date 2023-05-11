import { contextConfig } from '../../contextConfig';
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
    UKJENT_ARBEIDSGIVER:'true',
    IMAGE:'ghcr.io/navikt/sif-brukerdialog/endringsmelding-pleiepenger-mono:825c85c3ef8c5a7ac4906dd4443620715a40a68a',
};`;

describe('Ukjent arbeidsgiver', () => {
    contextConfig({
        arbeidsgivere: flereArbeidsgivereMock,
        saker: enSakEnArbeidsgiverMock,
        settings,
    });

    before(() => {
        cy.clock(cyHelpers.date);
        cy.clearLocalStorage();
    });

    cyHelpers.startSøknad({ endreLovbestemtFerie: true });
    cyHelpers.fyllUtUkjentArbeidsforhold('947064642');
    cyHelpers.leggTilOgFjernFerie();
    cyHelpers.fortsettTilOppsummering();
    cyHelpers.kontrollerOppsummeringUkjentArbeidsforhold('947064642');
});
