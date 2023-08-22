import 'cypress-axe';
import { contextConfig } from '../contextConfig';
import { cyApiMockData } from '../data/cyApiMockData';
import { getElement, getTestElement, getTestElementByType, submitSkjema } from '../utils';

const fileName = 'navlogopng.png';
const velgYtelseUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/ettersending';
const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/ettersending/pleiepenger/melding';

const velgYtelse = () => {
    it('Velg ytelse', () => {
        cy.visit(velgYtelseUrl);
        cy.injectAxe();
        cy.wait(500);
        cy.get('[type="radio"]').first().check();
        cy.checkA11y();
        getTestElement('typedFormikForm-submitButton').click({ force: true });
        const el = getElement('h2').first();
        el.should('contain', 'Ettersendelse av dokumentasjon til søknad om pleiepenger');
        cy.wait(500);
        cy.injectAxe();
        cy.checkA11y();
    });
};

const startSøknad = () => {
    it('Starter søknad', () => {
        cy.injectAxe();
        getTestElement('bekreft-label').click();
        cy.checkA11y();
        getTestElement('typedFormikForm-submitButton').click();
    });
};

const fyllUtBeskrivelse = () => {
    it('Fyller ut beskrivelse', () => {
        cy.injectAxe();
        getTestElement('beskrivelse').type('en beskrivelse');
        cy.checkA11y();
        submitSkjema();
    });
};

const lastOppDokument = () => {
    it('laster opp dokument', () => {
        cy.fixture(fileName, 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then((fileContent) =>
                (getTestElementByType('file') as any).attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'image/png', //getMimeType(fileName),
                    encoding: 'utf8',
                }),
            );
        cy.wait(2000);
        submitSkjema();
    });
};

const kontrollerOppsummering = () => {
    it('har riktig oppsummering - enkel', () => {
        cy.injectAxe();
        const oppsummering = getTestElement('oppsummering');
        oppsummering.should('contain', cyApiMockData.søkerMock.fornavn);
        oppsummering.should('contain', cyApiMockData.søkerMock.fødselsnummer);
        getTestElement('vedlegg-liste').find('.attachmentListElement').should('have.length', 1);
        cy.checkA11y();
    });
};
const sendInnSøknad = () => {
    it('Sender inn søknad', () => {
        getTestElement('bekreft-label').click();
        getTestElement('typedFormikForm-submitButton').click();
    });
};
const kontrollerKvittering = () => {
    it('Inneholder søknad mottatt tekst', () => {
        cy.injectAxe();
        getTestElement('søknad-mottatt').should('exist');
        cy.checkA11y();
    });
};

describe('Velger ytelse', () => {
    contextConfig();
    velgYtelse();
});

describe('Fylle ut skjema med vedlegg', () => {
    context('med utmocket, tom mellomlagring', () => {
        contextConfig();
        before(() => {
            cy.visit(startUrl);
        });
        it('Henter søker', () => {
            cy.wait('@getSøker');
        });
        startSøknad();
        fyllUtBeskrivelse();
        lastOppDokument();
        kontrollerOppsummering();
        sendInnSøknad();
        kontrollerKvittering();
    });
});
