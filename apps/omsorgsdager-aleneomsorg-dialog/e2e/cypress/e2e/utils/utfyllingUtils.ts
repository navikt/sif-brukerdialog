import { getTestElement, submitSkjema } from '.';
const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg/soknad/velkommen';

const startSøknad = () => {
    it('Starter søknad', () => {
        cy.visit(startUrl).then(() => {
            cy.wait(['@getSøker', '@getBarn']);
            getTestElement('bekreft-label').click();
            getTestElement('typedFormikForm-submitButton').click();
        });
    });
};

const fyllOmAleneomsorgForBarn = () => {
    it('Fyller ut om aleneomsorg for barn', () => {
        getTestElement('harAleneomsorgFor-2811762539343').click();
        getTestElement('avtaleOmDeltBosted_no').click();
        cy.wait(100);
        submitSkjema();
    });
};

const fyllTidspunktForAleneomsorg = () => {
    it('Fyller ut Tidspunkt for aleneomsorg', () => {
        getTestElement('tidspunktForAleneomsorg_tidligere-2811762539343').click();
        cy.wait(100);
        submitSkjema();
    });
};

/*const kontrollerOppsummering = () => {
    it('har riktig oppsummering - enkel', () => {
        const oppsummering = getTestElement('oppsummering');
        oppsummering.should('contain', cyApiMockData.søkerMock.fornavn);
        oppsummering.should('contain', cyApiMockData.søkerMock.fødselsnummer);

        oppsummering.should('contain', cyApiMockData.annenForelderMock.navn);
        oppsummering.should('contain', cyApiMockData.annenForelderMock.fnr);

        oppsummering.should('contain', 'Test Barn');
        oppsummering.should('contain', '18897699792');

        oppsummering.should(
            'contain',
            `${cyApiMockData.barnMock.barn[0].fornavn} ${cyApiMockData.barnMock.barn[0].etternavn}`
        );
        oppsummering.should(
            'contain',
            `${cyApiMockData.barnMock.barn[1].fornavn} ${cyApiMockData.barnMock.barn[1].etternavn}`
        );
        oppsummering.should(
            'contain',
            `${cyApiMockData.barnMock.barn[2].fornavn} ${cyApiMockData.barnMock.barn[2].etternavn}`
        );

        oppsummering.should('contain', 'Sykdom, skade eller funksjonhemming');
        oppsummering.should('contain', 'Test Beskrivelse');
        oppsummering.should('contain', '28. feb. 2023 - 3. mars 2023');
    });
};*/

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
    fyllOmAleneomsorgForBarn,
    fyllTidspunktForAleneomsorg,
    sendInnSøknad,
    // kontrollerOppsummering,
    kontrollerKvittering,
};
