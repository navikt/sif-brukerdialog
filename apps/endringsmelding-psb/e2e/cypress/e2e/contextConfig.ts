import { arbeidsgivereMock } from './data/arbeidsgiver-mock';
import { sakMock } from './data/sak-mock';
import { søkerMock } from './data/søker-mock';

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
        cy.intercept(`GET`, `/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, mellomlagring || {});
        cy.intercept(`DELETE`, `/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, mellomlagring || {});
        cy.intercept(`PUT`, `/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, {});
        cy.intercept(`POST`, `/mellomlagring/ENDRINGSMELDING_PLEIEPENGER_SYKT_BARN`, {});
        cy.intercept(`POST`, `/pleiepenger-sykt-barn/endringsmelding/innsending`, {});
        cy.intercept('GET', `/innsyn/sak*`, sakMock);
        cy.intercept('GET', `/oppslag/arbeidsgiver*`, arbeidsgivereMock);
        cy.intercept('GET', `/oppslag/soker*`, søkerMock);
        cy.intercept(`https://ryujtq87.api.sanity.io*`, {});
    });

    if (step) {
        before('gå til ønsket side', () => {
            cy.visit(getUrlForStep(step));
        });
    }
};
