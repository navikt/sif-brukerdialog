export const submitSkjema = () => getTestElement('typedFormikForm-submitButton').should('have.length', 1).click();
export const clickSendInnSøknad = () => cy.get('button[aria-label="Send inn søknaden"]').click();
export const PUBLIC_PATH = '/familie/sykdom-i-familien/soknad/pleiepenger';

export const getTestElement = (key) => {
    return cy.get(`[data-testid="${key}"]`, { timeout: 10000 });
};

export const selectRadioYesOrNo = (key, selectYes) => {
    getTestElement(`${key}_${selectYes ? 'yes' : 'no'}`)
        .parent()
        .click();
};

export const selectRadioYes = (key) => {
    getTestElement(`${key}_yes`).parent().click();
};

export const selectRadioNo = (key) => {
    getTestElement(`${key}_no`).parent().click();
};

export const getInputByName = (name) => {
    return cy.get(`*[name="${name}"]`);
};

export const getTestElementByType = (type) => {
    return cy.get(`[type="${type}"]`);
};

export const submitModal = () => {
    return cy.get('*[class="navds-modal__body"]').within(() => {
        cy.get('button').contains('Neste').click();
    });
};
