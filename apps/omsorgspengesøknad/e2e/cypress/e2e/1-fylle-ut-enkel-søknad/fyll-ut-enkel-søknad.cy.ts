import { contextConfig } from '../contextConfig';
import { cyApiMockData } from '../data/cyApiMockData';
import {
    checkCheckbuttonByName,
    getInputByName,
    getTestElement,
    getTestElementByType,
    selectRadioYesOrNo,
    setInputByNameValue,
    submitSkjema,
} from '../utils';

const fileName = 'navlogopng.png';

const startSøknad = () => {
    it('Starter søknad', () => {
        getTestElement('bekreft-label').click();
        getTestElement('typedFormikForm-submitButton').click();
    });
};

const fyllUtOmBarn = (deltBosted = true) => {
    it('Fyller ut om barnet', () => {
        getTestElement('barn-1').click();
        selectRadioYesOrNo('sammeAdresse', deltBosted);
        selectRadioYesOrNo('kroniskEllerFunksjonshemming', true);
        submitSkjema();
    });
};

const fyllUtOmAnnetBarn = (deltBosted = true) => {
    it('Fyller ut om barnet - annet barn', () => {
        checkCheckbuttonByName('søknadenGjelderEtAnnetBarn');
        setInputByNameValue('barnetsFødselsnummer', cyApiMockData.barnMock.barn[0].fødselsnummer);
        setInputByNameValue('barnetsNavn', cyApiMockData.barnMock.barn[0].fornavn);
        getInputByName('søkersRelasjonTilBarnet').select('mor');
        selectRadioYesOrNo('sammeAdresse', deltBosted);
        selectRadioYesOrNo('kroniskEllerFunksjonshemming', true);
        submitSkjema();
    });
};

const lastOppLegeerklæring = () => {
    it('laster opp legeerklæring', () => {
        cy.fixture(fileName, 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then((fileContent) =>
                (getTestElementByType('file') as any).attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'image/png',
                    encoding: 'utf8',
                })
            );
        cy.wait(200);
        getTestElement('legeerklæring-liste').find('.attachmentListElement').should('have.length', 1);
        submitSkjema();
    });
};
const lastOppSamværsavtale = () => {
    it('laster opp samværsavtale', () => {
        cy.fixture(fileName, 'binary')
            .then(Cypress.Blob.binaryStringToBlob)
            .then((fileContent) =>
                (getTestElementByType('file') as any).attachFile({
                    fileContent,
                    fileName,
                    mimeType: 'image/png',
                    encoding: 'utf8',
                })
            );
        cy.wait(200);
        getTestElement('samværsavtale-liste').find('.attachmentListElement').should('have.length', 1);
        submitSkjema();
    });
};

const kontrollerOppsummering = (deltBosted = false) => {
    it('har riktig oppsummering - enkel', () => {
        const oppsummering = getTestElement('oppsummering');
        oppsummering.should('contain', cyApiMockData.søkerMock.fornavn);
        oppsummering.should('contain', cyApiMockData.søkerMock.fødselsnummer);
        getTestElement('legeerklæring-liste').find('.attachmentListElement').should('have.length', 1);
        if (deltBosted) {
            getTestElement('samværsavtale-liste').find('.attachmentListElement').should('have.length', 1);
        }
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

describe('Fylle ut søknad', () => {
    contextConfig();

    describe('Med registrert barn', () => {
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
    describe('Registrert barn med delt omsorg', () => {
        const deltBosted = false;
        before(() => {
            cy.visit('/');
        });
        startSøknad();
        fyllUtOmBarn(deltBosted);
        lastOppLegeerklæring();
        lastOppSamværsavtale();
        kontrollerOppsummering(deltBosted);
        sendInnSøknad();
        kontrollerKvittering();
    });
    describe('Med annet barn', () => {
        before(() => {
            cy.visit('/');
        });
        startSøknad();
        fyllUtOmAnnetBarn();
        lastOppLegeerklæring();
        kontrollerOppsummering();
        sendInnSøknad();
        kontrollerKvittering();
    });
});
