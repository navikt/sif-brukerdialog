const søkerMock = require('../../../mocks/data/soker1/søker-mock.json');
const sakMock = require('../../../mocks/data/soker1/sak-mock.json');
const arbeidsgivereMock = require('../../../mocks/data/soker1/arbeidsgiver-mock.json');

const PUBLIC_PATH = '/soknad';

const getUrlForStep = (step?) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : '/velkommen'}`;
    return url;
};
interface ConfigProps {
    mellomlagring?: any;
    step?: string;
    sak?: any;
}

export const contextConfig = (props?: ConfigProps) => {
    const { mellomlagring, step, sak } = props || {};

    beforeEach('intercept mellomlagring og levere tomt objekt', () => {
        cy.intercept(`GET`, `mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, mellomlagring || {});
        cy.intercept(`DELETE`, `mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, mellomlagring || {});
        cy.intercept(`PUT`, `mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, {});
        cy.intercept(`POST`, `mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, {});
        cy.intercept('POST', '*/endringsmelding/innsending', {});
        cy.intercept(`api/innsyn/sak`, sak || sakMock);
        cy.intercept('GET', `oppslag/arbeidsgiver*`, arbeidsgivereMock);
        cy.intercept('GET', `oppslag/soker?ytelse=endringsmelding-pleiepenger`, søkerMock);
        cy.intercept(`ryujtq87.api.sanity.io*`, {});
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
