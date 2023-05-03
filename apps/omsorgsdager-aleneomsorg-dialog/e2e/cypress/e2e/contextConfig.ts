import { cyApiMockData } from './data/cyApiMockData';

const PUBLIC_PATH = '/soknad';
const API = 'http://localhost:8089';

const getUrlForStep = (step?) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : '/velkommen'}`;
    return url;
};
interface ConfigProps {
    mellomlagring?: any;
    step?: string;
    barn?: any[];
}

export const contextConfig = (props?: ConfigProps) => {
    const { mellomlagring, step } = props || {};

    beforeEach('intercept mellomlagring og levere tomt objekt', () => {
        cy.intercept(`GET`, `${API}/mellomlagring/OMSORGSDAGER_ALENEOMSORG`, mellomlagring || { noData: 1 });
        cy.intercept(`DELETE`, `${API}/mellomlagring/OMSORGSDAGER_ALENEOMSORG`, mellomlagring || {});
        cy.intercept(`PUT`, `${API}/mellomlagring/OMSORGSDAGER_ALENEOMSORG`, {});
        cy.intercept(`POST`, `${API}/mellomlagring/OMSORGSDAGER_ALENEOMSORG`, {});
        cy.intercept(`POST`, `${API}/omsorgsdager-aleneomsorg/innsending`, {});
        cy.intercept('GET', `${API}/oppslag/soker`, cyApiMockData.søkerMock);
        cy.intercept('GET', `${API}/oppslag/barn`, cyApiMockData.barnMock);
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
