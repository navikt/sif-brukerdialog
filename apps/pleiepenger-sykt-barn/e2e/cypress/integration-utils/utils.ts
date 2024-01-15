import { DateRange } from '@navikt/sif-common-formik-ds/src';
import dayjs = require('dayjs');

export const PUBLIC_PATH = '/familie/sykdom-i-familien/soknad/pleiepenger';
export const getSøknadsdato = () => dayjs(); //'2022-10-10');
export const getSøknadsperiode = (): DateRange => ({
    from: getSøknadsdato().startOf('week').subtract(3, 'weeks').toDate(),
    to: getSøknadsdato().startOf('week').add(1, 'week').toDate(),
});

export const clickFortsett = (checkA11y = true) => {
    if (checkA11y) {
        cy.injectAxe();
        cy.checkA11y();
    }
    cy.get('button').contains('Neste').click();
};
export const clickTilbake = () => {
    cy.get('button').contains('Forrige').click();
};

export const selectRadio = (name, value) => {
    cy.get(`[name="${name}"][value="${value}"]`).parent().click();
};

export const selectRadioByLabel = (text) => {
    cy.get('label').contains(text).parent().click();
};

export const selectRadioYes = (name) => {
    cy.get(`*[name="${name}"][value="yes"]`).parent().click();
};
export const selectRadioNo = (name) => {
    cy.get(`*[name="${name}"][value="no"]`).parent().click();
};

export const selectCheckboxByNameAndValue = (name, value) => {
    cy.get(`*[name="${name}"][value="${value}"]`).parent().click();
};

export const getTestElement = (key) => {
    return cy.get(`[data-testid="${key}"]`);
};

export const getTestElementByType = (type) => {
    return cy.get(`[type="${type}"]`);
};

export const getInputByName = (name) => {
    return cy.get(`*[name="${name}"]`);
};

export const setInputValue = (key, value) => {
    getTestElement(key).click().clear().type(value);
};
export const setInputValueByName = (name, value) => {
    getInputByName(name).click().clear().type(value);
};

export const setInputTime = (key, hours = '', minutes = '') => {
    setInputValue(`${key}_hours`, hours);
    setInputValue(`${key}_minutes`, minutes);
};

export const gåTilOppsummeringFraArbeidssituasjon = () => {
    /** cy.visit reloads, og da må en blir mellomlagring feil - fake click fortsett */
    clickFortsett();
    cy.wait(100);
    clickFortsett();
    cy.wait(100);
    clickFortsett();
    cy.wait(100);
    clickFortsett();
    cy.wait(100);
    clickFortsett(false);
};

export const gåTilOppsummeringFraArbeidIPerioden = () => {
    /** cy.visit reloads, og da må en blir mellomlagring feil - fake click fortsett */
    clickFortsett();
    cy.wait(100);
    clickFortsett();
    cy.wait(100);
    clickFortsett();
    cy.wait(100);
    clickFortsett(false);
};
