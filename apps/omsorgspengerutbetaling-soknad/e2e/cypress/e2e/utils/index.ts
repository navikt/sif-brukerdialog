export const submitSkjema = () => getTestElement('typedFormikForm-submitButton').click();
export const clickSendInnSøknad = () => cy.get('button[aria-label="Send inn søknaden"]').click();
export const PUBLIC_PATH = '/familie/sykdom-i-familien/soknad/pleiepenger';

export const clickNeiPaAlleSporsmal = () => {
    cy.get('label[class="inputPanel radioPanel"]').each((element) => {
        if (element.text() === 'Nei') {
            element.click();
        }
    });
};
export const clickJaPaAlleSporsmal = () => {
    cy.get('label[class="inputPanel radioPanel"]').each((element) => {
        if (element.text() === 'Ja') {
            element.click();
        }
    });
};

export const selectRadioYesOrNo = (key, selectYes) => {
    getTestElement(`${key}_${selectYes ? 'yes' : 'no'}`)
        .parent()
        .click();
};

export const selectRadioByNameAndValue = (name, value) => {
    cy.get(`[name="${name}"][value="${value}"]`).parent().click();
};

export const selectRadioByValue = (value) => {
    cy.get(`[value="${value}"]`).parent().click();
};

export const checkCheckbuttonByName = (name) => {
    cy.get(`[type="checkbox"][name="${name}"]`).click();
};

export const selectRadioYes = (key) => {
    getTestElement(`${key}_yes`).parent().click();
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

export const setInputByNameValue = (name, value: string) => {
    return cy.get(`*[name="${name}"]`).type(value);
};

export const setInputValue = (key, value) => {
    getTestElement(key).click().clear().type(value);
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

export const submitModal = () => {
    return cy.get('*[class="navds-modal__content"]').within(() => {
        getElement('button').contains('Neste').click();
    });
};

export const getModal = () => {
    return cy.get('*[class="navds-modal__content"]');
};

export const getRadioButtons = () => {
    return cy.get('*[class="navds-radio-buttons"]');
};
