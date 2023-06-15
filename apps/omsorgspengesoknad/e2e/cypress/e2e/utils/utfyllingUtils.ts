import {
    checkCheckbuttonByName,
    getInputByName,
    getTestElement,
    getTestElementByType,
    selectRadioYesOrNo,
    setInputByNameValue,
    submitSkjema,
} from '.';
import { cyApiMockData } from '../data/cyApiMockData';

const fileName = 'navlogopng.png';

interface BarnOgDeltBostedProps {
    deltBosted: boolean;
    harRegistrertBarn: boolean;
}

const startSøknad = () => {
    it('Starter søknad', () => {
        cy.wait(['@getSøker', '@getBarn']);
        getTestElement('bekreft-label').click();
        getTestElement('typedFormikForm-submitButton').click();
        cy.wait('@putMellomlagring');
    });
};

const fyllUtOmBarn = (props: BarnOgDeltBostedProps) => {
    it('Fyller ut om barnet', () => {
        getTestElement('barn-2811762539343').click();
        selectRadioYesOrNo('sammeAdresse', props.deltBosted);
        selectRadioYesOrNo('kroniskEllerFunksjonshemming', true);
        submitSkjema();
    });
};

const fyllUtOmAnnetBarn = (props: BarnOgDeltBostedProps) => {
    it('Fyller ut om barnet - annet barn', () => {
        if (props.harRegistrertBarn) {
            checkCheckbuttonByName('søknadenGjelderEtAnnetBarn');
        }
        setInputByNameValue('barnetsFødselsnummer', cyApiMockData.barnMock.barn[0].fødselsnummer);
        setInputByNameValue('barnetsNavn', cyApiMockData.barnMock.barn[0].fornavn);
        getInputByName('søkersRelasjonTilBarnet').select('mor');
        selectRadioYesOrNo('sammeAdresse', props.deltBosted);
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

const kontrollerOppsummering = (props: BarnOgDeltBostedProps) => {
    it('har riktig oppsummering - enkel', () => {
        const oppsummering = getTestElement('oppsummering');
        oppsummering.should('contain', cyApiMockData.søkerMock.fornavn);
        oppsummering.should('contain', cyApiMockData.søkerMock.fødselsnummer);
        if (props.harRegistrertBarn === false) {
            oppsummering.should('contain', cyApiMockData.barnMock.barn[0].fødselsnummer);
            oppsummering.should('contain', cyApiMockData.barnMock.barn[0].fornavn);
        }
        getTestElement('legeerklæring-liste').find('.attachmentListElement').should('have.length', 1);
        if (props.deltBosted === false) {
            getTestElement('samværsavtale-liste').find('.attachmentListElement').should('have.length', 1);
        }
    });
};
const sendInnSøknad = () => {
    it('Sender inn søknad', () => {
        getTestElement('bekreft-label').click();
        getTestElement('typedFormikForm-submitButton').click();
        cy.wait('@innsending');
    });
};
const kontrollerKvittering = () => {
    it('Inneholder søknad mottatt tekst', () => {
        const el = getTestElement('kvittering-page');
        el.should('contain', 'Vi har mottatt søknad om ekstra omsorgsdager');
    });
};

export const utfyllingUtils = {
    startSøknad,
    fyllUtOmBarn,
    fyllUtOmAnnetBarn,
    lastOppLegeerklæring,
    lastOppSamværsavtale,
    sendInnSøknad,
    kontrollerOppsummering,
    kontrollerKvittering,
};
