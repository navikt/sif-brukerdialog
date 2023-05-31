import { cyApiMockData } from './cyApiMockData';

const PUBLIC_PATH = '/familie/sykdom-i-familien/soknad/pleiepenger';

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
        cy.intercept(`GET`, `/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {});
        cy.intercept('GET', `/oppslag/arbeidsgiver*`, arbeidsgivere || cyApiMockData.arbeidsgivereMock);
        cy.intercept('GET', `/oppslag/soker*`, cyApiMockData.søkerMock);
        cy.intercept('GET', `/oppslag/barn*`, cyApiMockData.barnMock);
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
