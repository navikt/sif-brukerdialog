import { cyApiMockData } from './data/cyApiMockData';

const INTERCEPT_PATH = '*/**';
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
        cy.intercept(`${INTERCEPT_PATH}/mellomlagring/*`, mellomlagring || {}).as('getMellomlagring');
        cy.intercept(`${INTERCEPT_PATH}/ettersending/innsending`, {});
        cy.intercept(`${INTERCEPT_PATH}/oppslag/soker`, cyApiMockData.søkerMock).as('getSøker');
        cy.intercept('POST', `${INTERCEPT_PATH}/vedlegg`, {
            location: '/vedlegg',
            headers: { Location: '/vedlegg', 'access-control-expose-headers': 'Location' },
        });
        cy.intercept('*.api.sanity.io', {});
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
