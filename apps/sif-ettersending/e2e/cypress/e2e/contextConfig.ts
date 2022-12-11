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
        cy.intercept(`/mellomlagring/ETTERSENDING_PLEIEPENGER_SYKT_BARN`, mellomlagring || {});
        cy.intercept(`/ettersending/innsending`, {});
        cy.intercept('POST', '/vedlegg', {
            location: '/vedlegg',
            headers: { Location: '/vedlegg', 'access-control-expose-headers': 'Location' },
        });
        cy.intercept(`/oppslag/soker?ytelse=ettersending`, cyApiMockData.søkerMock);
        cy.intercept(`https://ryujtq87.api.sanity.io*`, {});
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
