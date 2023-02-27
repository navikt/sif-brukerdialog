import { søkerMock } from './data/søkerMock';

const PUBLIC_PATH = '/soknad';

const getUrlForStep = (step?) => {
    const url = `${PUBLIC_PATH}/soknad${step ? `/${step}` : '/velkommen'}`;
    return url;
};
interface ConfigProps {
    mellomlagring?: any;
    step?: string;
}

export const mockApiBaseUrl = 'http://localhost:8099/';

export const contextConfig = (props: ConfigProps = {}) => {
    const { mellomlagring, step } = props;

    beforeEach('intercept api-kall', () => {
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
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
