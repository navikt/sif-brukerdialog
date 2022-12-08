import { cyApiMockData } from './data/cyApiMockData';

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
        cy.intercept(`GET`, `/mellomlagring/OMSORGSPENGER_UTVIDET_RETT`, mellomlagring || { noData: 1 });
        cy.intercept(`DELETE`, `/mellomlagring/OMSORGSPENGER_UTVIDET_RETT`, mellomlagring || {});
        cy.intercept(`PUT`, `/mellomlagring/OMSORGSPENGER_UTVIDET_RETT`, {});
        cy.intercept(`POST`, `/mellomlagring/OMSORGSPENGER_UTVIDET_RETT`, {});
        cy.intercept(`POST`, `/omsorgspenger-utvidet-rett/innsending`, {});
        cy.intercept('POST', '/vedlegg', {
            location: '/vedlegg',
            headers: { Location: '/vedlegg', 'access-control-expose-headers': 'Location' },
        });
        cy.intercept('GET', `/oppslag/soker*`, cyApiMockData.søkerMock);
        cy.intercept('GET', `/oppslag/barn*`, cyApiMockData.barnMock);
        cy.intercept(`https://ryujtq87.api.sanity.io*`, {});
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
