import { cyApiMockData } from './data/cyApiMockData';
import { PUBLIC_PATH } from './utils';

const INTERCEPT_PATH = `**/*`;

const getUrlForStep = (step?) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : '/velkommen'}`;
    return url;
};
interface ConfigProps {
    mellomlagring?: any;
    step?: string;
    barn?: any;
}

export const contextConfig = (props?: ConfigProps) => {
    const { mellomlagring, step } = props || {};

    beforeEach('intercept mellomlagring og levere tomt objekt', () => {
        cy.intercept(
            `GET`,
            `${INTERCEPT_PATH}/mellomlagring/OMSORGSPENGER_UTBETALING_SNF`,
            mellomlagring || { noData: 1 },
        );
        cy.intercept(`DELETE`, `${INTERCEPT_PATH}/mellomlagring/OMSORGSPENGER_UTBETALING_SNF`, mellomlagring || {});
        cy.intercept(`PUT`, `${INTERCEPT_PATH}/mellomlagring/OMSORGSPENGER_UTBETALING_SNF`, {}).as('putMellomlagring');
        cy.intercept(`POST`, `${INTERCEPT_PATH}/mellomlagring/OMSORGSPENGER_UTBETALING_SNF`, {});
        cy.intercept(`POST`, `${INTERCEPT_PATH}/omsorgspenger-utbetaling-snf/innsending`, {}).as('innsending');
        cy.intercept('POST', `${INTERCEPT_PATH}/vedlegg`, {
            location: '/vedlegg',
            headers: { Location: '/vedlegg', 'access-control-expose-headers': 'Location' },
        });
        cy.intercept('GET', `${INTERCEPT_PATH}/oppslag/soker*`, cyApiMockData.søkerMock).as('getSøker');
        cy.intercept('GET', `${INTERCEPT_PATH}/oppslag/barn*`, { barn: props?.barn } || cyApiMockData.barnMock).as(
            'getBarn',
        );
        cy.intercept('*.api.sanity.io', {});
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
