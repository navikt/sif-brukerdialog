import { cyApiMockData } from './cyApiMockData';

const PUBLIC_PATH = '/familie/sykdom-i-familien/soknad/pleiepenger';
const API = 'http://localhost:8082';

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
        try {
            cy.intercept(`DELETE`, `${API}/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {});
            cy.intercept(`PUT`, `${API}/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {});
            cy.intercept(`POST`, `${API}/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {});
            cy.intercept(`GET`, `${API}/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {});
            cy.intercept('GET', `*arbeidsgiver*`, arbeidsgivere || cyApiMockData.arbeidsgivereMock);
            // cy.intercept('GET', `${API}/oppslag/arbeidsgiver*`, arbeidsgivere || cyApiMockData.arbeidsgivereMock);
            cy.intercept('GET', `${API}/oppslag/soker*`, cyApiMockData.søkerMock);
            cy.intercept('GET', `${API}/oppslag/barn*`, cyApiMockData.barnMock);
            cy.intercept('POST', `${API}/pleiepenger-sykt-barn/innsending`, {});
            cy.intercept(`https://ryujtq87.api.sanity.io*`, {});
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    });

    before('gå til ønsket side', () => {
        cy.visit(getUrlForStep(step));
    });
};

export const gotoStep = (step: string) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : ''}`;
    cy.visit(url);
};
