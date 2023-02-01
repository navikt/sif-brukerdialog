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
        cy.intercept(`GET`, `${API}/mellomlagring/OMSORGSPENGER_UTVIDET_RETT`, mellomlagring || { noData: 1 });
        cy.intercept(`DELETE`, `${API}/mellomlagring/OMSORGSPENGER_UTVIDET_RETT`, mellomlagring || {});
        cy.intercept(`PUT`, `${API}/mellomlagring/OMSORGSPENGER_UTVIDET_RETT`, {});
        cy.intercept(`POST`, `${API}/mellomlagring/OMSORGSPENGER_UTVIDET_RETT`, {});
        cy.intercept(`POST`, `${API}/omsorgspenger-utvidet-rett/innsending`, {});
        cy.intercept('POST', `${API}/vedlegg`, {
            location: '/vedlegg',
            headers: { Location: '/vedlegg', 'access-control-expose-headers': 'Location' },
        });
        cy.intercept('GET', `${API}/oppslag/soker?ytelse=omsorgspenger-utvidet-rett`, cyApiMockData.søkerMock);
        cy.intercept(
            'GET',
            `${API}/oppslag/barn?ytelse=omsorgspenger-utvidet-rett`,
            props?.barn || cyApiMockData.barnMock
        );
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
