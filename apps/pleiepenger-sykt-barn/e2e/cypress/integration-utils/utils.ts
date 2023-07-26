export const clickFortsett = () => {
    getElement('button').contains('Neste').click();
};
export const clickSendInnSøknad = () => {
    cy.get('button').contains('Send inn søknaden').click();
};
export const PUBLIC_PATH = '/familie/sykdom-i-familien/soknad/pleiepenger';

export const selectRadioNyYesOrNo = (key, selectYes) => {
    getTestElement(`${key}_${selectYes ? 'yes' : 'no'}`).click({ force: true });
};

export const selectRadioByNameAndValue = (name, value) => {
    cy.get(`[name="${name}"][value="${value}"]`).parent().click();
};

export const checkCheckbuttonByName = (name) => {
    cy.get(`[type="checkbox"][name="${name}"]`).click();
};

export const selectRadioYes = (key) => {
    getTestElement(`${key}_yes`).parent().click();
};
export const selectRadioYesByName = (name) => {
    cy.get(`*[name="${name}"][value="yes"]`).parent().click();
};
export const selectRadioNoByName = (name) => {
    cy.get(`*[name="${name}"][value="no"]`).parent().click();
};

export const selectCheckByNameAndValue = (name, value) => {
    cy.get(`*[name="${name}"][value="${value}"]`).parent().click();
};

export const selectRadioNo = (key) => {
    getTestElement(`${key}_no`).parent().click();
};

export const getTestElement = (key) => {
    return cy.get(`[data-testid="${key}"]`);
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

export const selectRadio = (key) => {
    getTestElement(key).parent().click();
};

export const getTestElementByType = (type) => {
    return cy.get(`[type="${type}"]`);
};

export const getElement = (type) => {
    return cy.get(`${type}`);
};

export const containsElement = (key) => {
    return cy.contains(`[data-testid="${key}"]`);
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
    clickFortsett();
};

export const gåTilOppsummeringFraArbeidIPerioden = () => {
    /** cy.visit reloads, og da må en blir mellomlagring feil - fake click fortsett */
    clickFortsett();
    cy.wait(100);
    clickFortsett();
    cy.wait(100);
    clickFortsett();
    cy.wait(100);
    clickFortsett();
};
