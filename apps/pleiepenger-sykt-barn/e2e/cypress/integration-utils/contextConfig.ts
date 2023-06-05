import { cyApiMockData } from './cyApiMockData';

const PUBLIC_PATH = '/familie/sykdom-i-familien/soknad/pleiepenger';
const mockApiBaseUrl = 'http://localhost:8082';

const getUrlForStep = (step?) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : '/velkommen'}`;
    return url;
};
interface ConfigProps {
    mellomlagring?: any;
    step?: string;
    arbeidsgivere?: any;
}

export const contextConfig = (props?: ConfigProps) => {
    const { mellomlagring, step, arbeidsgivere } = props || {};
    beforeEach('intercept api-kall', () => {
        cy.intercept(`DELETE`, `${mockApiBaseUrl}/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {});
        cy.intercept(`PUT`, `${mockApiBaseUrl}/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {});
        cy.intercept(`POST`, `${mockApiBaseUrl}/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {});
        cy.intercept(`GET`, `${mockApiBaseUrl}/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {});
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/arbeidsgiver*`, cyApiMockData.arbeidsgivereMock).as(
            'getArbeidsgiver'
        );
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/soker*`, cyApiMockData.søkerMock);
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/barn*`, cyApiMockData.barnMock);
        cy.intercept('POST', `${mockApiBaseUrl}/pleiepenger-sykt-barn/innsending`, {});
        // cy.intercept(
        //     { method: 'GET', hostname: 'localhost', url: '/oppslag/arbeidsgiver' },
        //     arbeidsgivere || cyApiMockData.arbeidsgivereMock
        // );
        cy.intercept(`https://ryujtq87.api.sanity.io*`, {});
    });

    before('gå til ønsket side', () => {
        cy.visit(getUrlForStep(step));
    });
};

export const gotoStep = (step: string) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : ''}`;
    cy.visit(url);
};
