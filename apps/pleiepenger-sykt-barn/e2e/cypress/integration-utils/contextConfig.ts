import { cyApiMockData } from './cyApiMockData';
import { mellomlagring } from './mocks/mellomlagring';

const INTERCEPT_PATH = '*/**';
const PUBLIC_PATH = '/familie/sykdom-i-familien/soknad/pleiepenger';

const getUrlForStep = (step?) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : '/velkommen'}`;
    return url;
};
interface ConfigProps {
    mellomlagring?: any;
    innsendingResponse?: any;
}

export const gotoStep = (step: string) => {
    cy.visit(getUrlForStep(step));
};

export const gotoArbeidssituasjonStep = () => {
    cy.intercept(`GET`, `/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring).as('getMellomlagring');
    cy.visit(getUrlForStep('arbeidssituasjon'));
    cy.wait('@getArbeidsgivere');
};

export const contextConfig = (props?: ConfigProps) => {
    const { mellomlagring, innsendingResponse = {} } = props || {};

    beforeEach('intercept api-kall', () => {
        cy.intercept(`DELETE`, `${INTERCEPT_PATH}/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {}).as(
            'deleteMellomlagring',
        );
        cy.intercept(`PUT`, `${INTERCEPT_PATH}/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {}).as(
            'putMellomlagring',
        );
        cy.intercept(`POST`, `${INTERCEPT_PATH}/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {}).as(
            'postMellomlagring',
        );
        cy.intercept(`GET`, `${INTERCEPT_PATH}/mellomlagring/PLEIEPENGER_SYKT_BARN*`, mellomlagring || {}).as(
            'getMellomlagring',
        );
        cy.intercept('GET', `${INTERCEPT_PATH}/oppslag/soker*`, cyApiMockData.søkerMock).as('getSøker');
        cy.intercept('GET', `${INTERCEPT_PATH}/oppslag/barn*`, cyApiMockData.barnMock).as('getBarn');
        cy.intercept(`GET`, `${INTERCEPT_PATH}/oppslag/arbeidsgiver*`, cyApiMockData.arbeidsgivereMock).as(
            'getArbeidsgivere',
        );
        cy.intercept('POST', `${INTERCEPT_PATH}/pleiepenger-sykt-barn/innsending`, innsendingResponse).as(
            'postInnsending',
        );
        cy.intercept('*.api.sanity.io', {});
        cy.intercept('*amplitude*', {});
        cy.intercept('*hotjar*', {});
    });
};
