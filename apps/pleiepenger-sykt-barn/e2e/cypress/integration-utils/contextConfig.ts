import { cyApiMockData } from './cyApiMockData';

const PUBLIC_PATH = '/familie/sykdom-i-familien/soknad/pleiepenger';

const getUrlForStep = (step?) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : '/velkommen'}`;
    return url;
};
interface ConfigProps {
    mellomlagring?: any;
    step?: string;
}

export const gotoStep = (step: string) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : ''}`;
    cy.visit(url);
};

export const gotoArbeidssituasjonStep = () => {
    const url = `${PUBLIC_PATH}/soknad/arbeidssituasjon}`;
    cy.visit(url);
    cy.wait('@getArbeidsgivere');
};

export const contextConfig = (props?: ConfigProps) => {
    const { mellomlagring, step } = props || {};
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

    before('gå til ønsket side', () => {
        cy.visit(getUrlForStep(step));
    });
};
