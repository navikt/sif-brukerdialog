import { cyApiMockData } from './data/cyApiMockData';

const PUBLIC_PATH = '/soknad';

const getUrlForStep = (step?) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : '/velkommen'}`;
    return url;
};
interface ConfigProps {
    mellomlagring?: any;
    step?: string;
    barn?: any[];
    arbeidsgiver?: any;
}

export const contextConfig = (props?: ConfigProps) => {
    const { mellomlagring, step } = props || {};

    beforeEach('intercept mellomlagring og levere tomt objekt', () => {
        cy.intercept(`GET`, `/mellomlagring/OMSORGSPENGER_UTBETALING_ARBEIDSTAKER`, mellomlagring || { noData: 1 });
        cy.intercept(`DELETE`, `/mellomlagring/OMSORGSPENGER_UTBETALING_ARBEIDSTAKER`, mellomlagring || {});
        cy.intercept(`PUT`, `/mellomlagring/OMSORGSPENGER_UTBETALING_ARBEIDSTAKER`, {}).as('putMellomlagring');
        cy.intercept(`POST`, `/mellomlagring/OMSORGSPENGER_UTBETALING_ARBEIDSTAKER`, {});
        cy.intercept(`POST`, `/omsorgspenger-utbetaling-arbeidstaker/innsending`, {}).as('innsending');
        cy.intercept('POST', `**/vedlegg`, {
            location: '/vedlegg',
            headers: { Location: '/vedlegg', 'access-control-expose-headers': 'Location' },
        });
        cy.intercept('GET', `/oppslag/barn`, cyApiMockData.barnMock).as('getBarn');
        cy.intercept('GET', `/oppslag/soker`, cyApiMockData.søkerMock).as('getSøker');
        cy.intercept(`GET`, `/oppslag/arbeidsgiver*`, cyApiMockData.arbeidsgiverMock).as('getArbeidsgiver');
        cy.intercept('*.api.sanity.io', {});
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
