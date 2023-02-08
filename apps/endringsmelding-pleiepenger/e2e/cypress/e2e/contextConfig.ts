const søkerMock = require('../../../mocks/data/soker1/søker-mock.json');
const sakMock = require('../../../mocks/data/soker1/sak-mock.json');
const arbeidsgivereMock = require('../../../mocks/data/soker1/arbeidsgiver-mock.json');

const PUBLIC_PATH = '/soknad';

const getUrlForStep = (step?) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : '/velkommen'}`;
    return url;
};
interface ConfigProps {
    mellomlagring?: any;
    step?: string;
    sak?: any;
    arbeidsgivere?: any;
}

export const contextConfig = (props?: ConfigProps) => {
    const { mellomlagring, step, sak, arbeidsgivere } = props || {};

    const apiBaseUrl = 'http://localhost:8099/';

    beforeEach('intercept mellomlagring og levere tomt objekt', () => {
        cy.intercept(`GET`, `${apiBaseUrl}mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, mellomlagring || {});
        cy.intercept(
            `DELETE`,
            `${apiBaseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`,
            mellomlagring || {}
        );
        cy.intercept(`PUT`, `${apiBaseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, {});
        cy.intercept(`POST`, `${apiBaseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, {});
        cy.intercept('POST', `${apiBaseUrl}/pleiepenger-sykt-barn/endringsmelding/innsending`, {});
        cy.intercept('GET', `${apiBaseUrl}/api/innsyn/sak`, sak || sakMock);
        cy.intercept('GET', `${apiBaseUrl}/oppslag/arbeidsgiver*`, arbeidsgivere || arbeidsgivereMock);
        cy.intercept('GET', `${apiBaseUrl}/oppslag/soker?ytelse=endringsmelding-pleiepenger`, søkerMock);
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
