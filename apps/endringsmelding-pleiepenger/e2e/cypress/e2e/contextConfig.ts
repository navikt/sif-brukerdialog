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
    arbeidsgivere?: any;
}

export const mockApiBaseUrl = 'http://localhost:8099/';

export const contextConfig = (props?: ConfigProps) => {
    const { mellomlagring, step, sak, arbeidsgivere } = props || {};

    beforeEach('intercept mellomlagring og levere tomt objekt', () => {
        cy.clearLocalStorage();
        cy.intercept(
            `GET`,
            `${mockApiBaseUrl}mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`,
            mellomlagring || {}
        );
        cy.intercept(
            `DELETE`,
            `${mockApiBaseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`,
            mellomlagring || {}
        );
        cy.intercept(`PUT`, `${mockApiBaseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, {});
        cy.intercept(`POST`, `${mockApiBaseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, {});
        cy.intercept('POST', `${mockApiBaseUrl}/pleiepenger-sykt-barn/endringsmelding/innsending`, {});
        cy.intercept('GET', `${mockApiBaseUrl}/api/innsyn/sak`, sak || sakMock);
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/arbeidsgiver*`, arbeidsgivere || arbeidsgivereMock);
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/soker?ytelse=endringsmelding-pleiepenger`, søkerMock);
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
