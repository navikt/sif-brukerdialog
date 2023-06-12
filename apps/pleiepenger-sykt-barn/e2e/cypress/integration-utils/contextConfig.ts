import { cyApiMockData } from './cyApiMockData';

const PUBLIC_PATH = '/familie/sykdom-i-familien/soknad/pleiepenger';

const getUrlForStep = (step?) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : '/velkommen'}`;
    return url;
};
interface ConfigProps {
    mellomlagring?: any;
}

export const gotoStep = (step: string) => {
    cy.visit(getUrlForStep(step));
};

export const gotoArbeidssituasjonStep = () => {
    cy.visit(getUrlForStep('arbeidssituasjon'));
    cy.wait(200);
    cy.wait('@getArbeidsgivere');
};

export const contextConfig = (props?: ConfigProps) => {
    const { mellomlagring } = props || {};

    beforeEach('intercept api-kall', () => {
        cy.intercept(`DELETE`, `/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {}).as('deleteMellomlagring');
        cy.intercept(`PUT`, `/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {}).as('putMellomlagring');
        cy.intercept(`POST`, `/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {}).as('postMellomlagring');
        cy.intercept(`GET`, `/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {}).as('getMellomlagring');
        cy.intercept('GET', `/oppslag/soker*`, cyApiMockData.søkerMock).as('getSøker');
        cy.intercept('GET', `/oppslag/barn*`, cyApiMockData.barnMock).as('getBarn');
        cy.intercept(`GET`, `/oppslag/arbeidsgiver*`, cyApiMockData.arbeidsgivereMock).as('getArbeidsgivere');
        cy.intercept('POST', `/pleiepenger-sykt-barn/innsending`, {}).as('postInnsending');
        cy.intercept(`https://ryujtq87.api.sanity.io*`, {});
    });
};
