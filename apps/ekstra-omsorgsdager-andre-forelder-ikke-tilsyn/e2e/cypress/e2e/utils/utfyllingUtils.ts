import { getTestElement, getTestElementByType, setInputByNameValue, submitSkjema, submitModalSkjema } from '.';
import { cyApiMockData } from '../data/cyApiMockData';

const startSøknad = () => {
    it('Starter søknad', () => {
        getTestElement('bekreft-label').click();
        getTestElement('typedFormikForm-submitButton').click();
    });
};

const fyllOmAnnenForelder = () => {
    it('Fyller ut om annet forelder', () => {
        setInputByNameValue('annenForelderFnr', cyApiMockData.annenForelderMock.fnr);
        setInputByNameValue('annenForelderNavn', cyApiMockData.annenForelderMock.navn);
        cy.wait(100);
        submitSkjema();
    });
};

const fyllOmAnnenForelderSituasjon = () => {
    it('Fyller ut om annen forelder situasjon', () => {
        getTestElement('grunn-SYKDOM').click();
        setInputByNameValue('annenForelderSituasjonBeskrivelse', 'Test Beskrivelse');
        setInputByNameValue('annenForelderPeriodeFom', '28.02.2023');
        setInputByNameValue('annenForelderPeriodeTom', '03.03.2023');

        cy.wait(100);
        submitSkjema();
    });
};

const fyllUtOmBarn = () => {
    it('Fyller ut om barn', () => {
        getTestElementByType('button').contains('Legg til barn').click();
        setInputByNameValue('navn', 'Test Barn');
        setInputByNameValue('fnr', '18897699792');
        submitModalSkjema();
        cy.wait(100);
        submitSkjema();
    });
};

const kontrollerOppsummering = () => {
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
    fyllOmAnnenForelder,
    fyllOmAnnenForelderSituasjon,
    fyllUtOmBarn,
    sendInnSøknad,
    kontrollerOppsummering,
    kontrollerKvittering,
};
