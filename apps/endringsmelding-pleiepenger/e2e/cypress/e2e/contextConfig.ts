import { søkerMock } from './data/søkerMock';

const PUBLIC_PATH = '/soknad';

const getUrlForStep = (step?) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : '/velkommen'}`;
    return url;
};
interface ConfigProps {
    mellomlagring?: any;
    step?: string;
    saker: any;
    arbeidsgivere: any;
}

export const mockApiBaseUrl = 'http://localhost:8099/';

export const contextConfig = (props: ConfigProps) => {
    const { mellomlagring, step, saker, arbeidsgivere } = props;

    beforeEach('intercept api-kall', () => {
        cy.wait(5);
        cy.intercept(
            `GET`,
            `${mockApiBaseUrl}mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`,
            mellomlagring || {}
        );
        cy.intercept(
            `DELETE`,
            `${mockApiBaseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`,
            mellomlagring || {}
        );
        cy.intercept(`PUT`, `${mockApiBaseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, {});
        cy.intercept(`POST`, `${mockApiBaseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, {});
        cy.intercept('POST', `${mockApiBaseUrl}/pleiepenger-sykt-barn/endringsmelding/innsending`, {});
        cy.intercept('GET', `${mockApiBaseUrl}/api/innsyn/sak`, saker);
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/arbeidsgiver*`, arbeidsgivere);
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/soker?ytelse=endringsmelding-pleiepenger`, søkerMock);
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
