import { cyApiMockData } from './data/cyApiMockData';

const PUBLIC_PATH = '/familie/sykdom-i-familien/melding/ettersending';

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
        // (window as any).appSettings = {
        //     API_URL: 'http://localhost:8090',
        //     FRONTEND_VEDLEGG_URL: 'http://localhost:8080/api',
        // };
        cy.intercept(`GET`, `/mellomlagring/ETTERSENDING_PLEIEPENGER_SYKT_BARN`, mellomlagring || {});
        cy.intercept(`DELETE`, `/mellomlagring/ETTERSENDING_PLEIEPENGER_SYKT_BARN`, mellomlagring || {});
        cy.intercept(`PUT`, `/mellomlagring/ETTERSENDING_PLEIEPENGER_SYKT_BARN`, {});
        cy.intercept(`POST`, `/mellomlagring/ETTERSENDING_PLEIEPENGER_SYKT_BARN`, {});
        cy.intercept(`POST`, `/ettersending/innsending`, {});
        cy.intercept('post', '/vedlegg', { location: '/vedlegg', headers: { location: '/vedlegg' } });
        cy.intercept('GET', `/oppslag/soker*`, cyApiMockData.søkerMock);
        cy.intercept(`https://ryujtq87.api.sanity.io*`, {});
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};

// export const gotoStep = (step: string) => {
//     console.log(step);

//     const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : ''}`;
//     cy.visit(url);
// };
