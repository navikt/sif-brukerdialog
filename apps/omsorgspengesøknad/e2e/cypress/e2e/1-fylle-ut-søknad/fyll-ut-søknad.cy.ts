import { contextConfig } from '../contextConfig';
import { cyApiMockData } from '../data/cyApiMockData';
import { getTestElement, getTestElementByType, selectRadioYesOrNo, submitSkjema } from '../utils';

const fileName = 'navlogopng.png';

const startSøknad = () => {
    it('Starter søknad', () => {
        getTestElement('bekreft-label').click();
        getTestElement('typedFormikForm-submitButton').click();
    });
};

const fyllUtOmBarn = () => {
    it('Fyller ut om barnet', () => {
        getTestElement('barn-1').click();
        selectRadioYesOrNo('sammeAdresse', true);
        selectRadioYesOrNo('kroniskEllerFunksjonshemming', true);
        submitSkjema();
    });
};

const lastOppLegeerklæring = () => {
    it('laster opp dokument', () => {
        cy.fixture(fileName, 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then((fileContent) =>
                (getTestElementByType('file') as any).attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'image/png', //getMimeType(fileName),
                    encoding: 'utf8',
                })
            );
        cy.wait(200);
        getTestElement('legeerklæring-liste').find('.attachmentListElement').should('have.length', 1);
        submitSkjema();
    });
};

const kontrollerOppsummering = () => {
    it('har riktig oppsummering - enkel', () => {
        const oppsummering = getTestElement('oppsummering');
        oppsummering.should('contain', cyApiMockData.søkerMock.fornavn);
        oppsummering.should('contain', cyApiMockData.søkerMock.fødselsnummer);
        getTestElement('legeerklæring-liste').find('.attachmentListElement').should('have.length', 1);
    });
};
const sendInnSøknad = () => {
    it('Fyller ut beskrivelse', () => {
        getTestElement('bekreft-label').click();
        getTestElement('typedFormikForm-submitButton').click();
    });
};
const kontrollerKvittering = () => {
    it('Inneholder søknad mottatt tekst', () => {
        const el = getTestElement('kvittering-page');
        el.should('contain', 'Vi har mottatt søknad om ekstra omsorgsdager');
    });
};
describe('Fylle ut skjema med vedlegg', () => {
    context('med utmocket, tom mellomlagring', () => {
        contextConfig();
        before(() => {
            cy.visit('/');
        });
        startSøknad();
        fyllUtOmBarn();
        lastOppLegeerklæring();
        kontrollerOppsummering();
        sendInnSøknad();
        kontrollerKvittering();
    });
});
