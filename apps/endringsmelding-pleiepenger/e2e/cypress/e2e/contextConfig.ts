import { søkerMock } from '../../mock-data/søkerMock';

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
    settings?: any;
}

export const mockApiBaseUrl = 'http://localhost:8099/';

export const contextConfig = (props: ConfigProps) => {
    const { mellomlagring, step, saker, arbeidsgivere, settings } = props;

    beforeEach('intercept api-kall', () => {
        cy.intercept(
            `GET`,
            `${mockApiBaseUrl}mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`,
            mellomlagring || {},
        ).as('getMellomlagring');
        cy.intercept(
            `DELETE`,
            `${mockApiBaseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`,
            mellomlagring || {},
        ).as('deleteMellomlagring');
        cy.intercept(`PUT`, `${mockApiBaseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, {}).as(
            'putMellomlagring',
        );
        cy.intercept(`POST`, `${mockApiBaseUrl}/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, {}).as(
            'postMellomlagring',
        );
        cy.intercept('POST', `${mockApiBaseUrl}/pleiepenger-sykt-barn/endringsmelding/innsending`, {}).as('innsending');
        cy.intercept('GET', `${mockApiBaseUrl}/api/innsyn/sak`, saker).as('getSak');
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/arbeidsgiver*`, arbeidsgivere).as('getArbeidsgiver');
        cy.intercept('GET', `${mockApiBaseUrl}/oppslag/soker?ytelse=endringsmelding-pleiepenger`, søkerMock).as(
            'getSoker',
        );
        cy.intercept('*.api.sanity.io', {});
        if (settings) {
            cy.intercept('GET', `*settings*`, settings).as('getSettings');
        }
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
