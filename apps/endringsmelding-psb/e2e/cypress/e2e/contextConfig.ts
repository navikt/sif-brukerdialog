import { arbeidsgivereMock } from './data/arbeidsgiver-mock';
import { sakMock } from './data/sak-mock';
import { søkerMock } from './data/søker-mock';

const PUBLIC_PATH = '/soknad';

const getUrlForStep = (step?) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : '/velkommen'}`;
    return url;
};
interface ConfigProps {
    mellomlagring?: any;
    step?: string;
}

export const contextConfig = (props?: ConfigProps) => {
    const { mellomlagring, step } = props || {};
    beforeEach('intercept mellomlagring og levere tomt objekt', () => {
        cy.intercept(`GET`, `/endringsmelding/mellomlagring`, mellomlagring || {});
        cy.intercept(`DELETE`, `/endringsmelding/mellomlagring`, mellomlagring || {});
        cy.intercept(`PUT`, `/endringsmelding/mellomlagring`, {});
        cy.intercept(`POST`, `/endringsmelding/mellomlagring`, {});
        cy.intercept(`POST`, `/endringsmelding`, {});
        cy.intercept('GET', `/innsyn/sak*`, sakMock);
        cy.intercept('GET', `/arbeidsgiver*`, arbeidsgivereMock);
        cy.intercept('GET', `/soker*`, søkerMock);
        cy.intercept(`https://ryujtq87.api.sanity.io*`, {});
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
