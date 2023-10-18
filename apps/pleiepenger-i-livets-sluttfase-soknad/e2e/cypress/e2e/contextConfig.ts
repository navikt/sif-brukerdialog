import { cyApiMockData } from './data/cyApiMockData';
import { setDate } from './utils';
const PUBLIC_PATH = '/soknad';
const API = 'http://localhost:8089';

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

    before(() => {
        setDate();
    });
    beforeEach('intercept mellomlagring og levere tomt objekt', () => {
        setDate();
        cy.intercept(`GET`, `${API}/mellomlagring/PLEIEPENGER_LIVETS_SLUTTFASE`, mellomlagring || { noData: 1 });
        cy.intercept(`DELETE`, `${API}/mellomlagring/PLEIEPENGER_LIVETS_SLUTTFASE`, mellomlagring || {});
        cy.intercept(`PUT`, `${API}/mellomlagring/PLEIEPENGER_LIVETS_SLUTTFASE`, {}).as('putMellomlagring');
        cy.intercept(`POST`, `${API}/mellomlagring/PLEIEPENGER_LIVETS_SLUTTFASE`, {});
        cy.intercept(`POST`, `${API}/pleiepenger-livets-sluttfase/innsending`, {}).as('innsending');
        cy.intercept('POST', `${API}/vedlegg`, {
            location: '/vedlegg',
            headers: { Location: '/vedlegg', 'access-control-expose-headers': 'Location' },
        });
        cy.intercept('GET', `${API}/oppslag/soker*`, cyApiMockData.søkerMock).as('getSøker');
        cy.intercept('GET', `${API}/oppslag/arbeidsgiver*`, cyApiMockData.arbeidsgiverMock).as('getArbeidsgiver');
        cy.intercept('*.api.sanity.io', {});
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
