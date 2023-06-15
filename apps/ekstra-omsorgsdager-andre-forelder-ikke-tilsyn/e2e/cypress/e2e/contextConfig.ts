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
        cy.intercept(`GET`, `${API}/mellomlagring/OMSORGSPENGER_MIDLERTIDIG_ALENE`, mellomlagring || { noData: 1 });
        cy.intercept(`DELETE`, `${API}/mellomlagring/OMSORGSPENGER_MIDLERTIDIG_ALENE`, mellomlagring || {});
        cy.intercept(`PUT`, `${API}/mellomlagring/OMSORGSPENGER_MIDLERTIDIG_ALENE`, {});
        cy.intercept(`POST`, `${API}/mellomlagring/OMSORGSPENGER_MIDLERTIDIG_ALENE`, {});
        cy.intercept(`POST`, `${API}/omsorgspenger-midlertidig-alene/innsending`, {}).as('innsending');
        cy.intercept('GET', `${API}/oppslag/soker`, cyApiMockData.søkerMock).as('getSøker');
        cy.intercept('GET', `${API}/oppslag/barn`, cyApiMockData.barnMock).as('getBarn');
        cy.intercept({ hostname: '*.api.sanity.io' }, {});
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
