import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);
dayjs.locale(locale);

import {
    getTestElement,
    getTestElementByType,
    selectRadioYesOrNo,
    getInputByName,
    submitModal,
    submitSkjema,
    getElement,
} from '.';

const fileName = 'navlogopng.png';

const fraDato = dayjs().startOf('week').subtract(3, 'weeks').format('YYYY-MM-DD');
const tilDato = dayjs().format('YYYY-MM-DD');
const datoDelvisFravær = dayjs().startOf('week').subtract(4, 'weeks').format('YYYY-MM-DD');
const fomDatoIUtlandet = dayjs().startOf('week').subtract(3, 'weeks').add(2, 'day').format('YYYY-MM-DD');
const tomDatoIUtlandet = dayjs().startOf('week').subtract(3, 'weeks').add(4, 'day').format('YYYY-MM-DD');

const startSøknad = () => {
    it('Starter søknad', () => {
        cy.wait(['@getSøker']);
        getTestElement('bekreft-label').click();
        getTestElement('typedFormikForm-submitButton').click();
        cy.wait('@putMellomlagring');
    });
};

const fyllUtOmBarn = () => {
    it('Fyller ut om barnet med minst yngre 13 år', () => {
        submitSkjema();
        cy.wait('@putMellomlagring');
    });
};

const fyllUtFraværSteg = () => {
    it('Fyller ut Fravær steg', () => {
        selectRadioYesOrNo('harPerioderMedFravær', true);
        getElement('button').contains('Legg til dager med fullt fravær fra jobb').click();
        getInputByName('fraOgMed').click().type(fraDato).blur();
        getInputByName('tilOgMed').click().type(tilDato).blur();
        submitModal();

        selectRadioYesOrNo('harDagerMedDelvisFravær', true);
        getElement('button').contains('Legg til dag med delvis fravær fra jobb').click();
        getInputByName('dato').click().type(datoDelvisFravær).blur();

        getInputByName('timerArbeidsdag').select('7.5');
        getInputByName('timerFravær').select('3');
        submitModal();

        selectRadioYesOrNo('perioder_harVærtIUtlandet', true);
        getElement('button').contains('Legg til utenlandsopphold').click();
        getInputByName('fom').click().type(fomDatoIUtlandet).blur();
        getInputByName('tom').click().type(tomDatoIUtlandet).blur();
        getInputByName('landkode').select('BHR');
        submitModal();

        submitSkjema();
        cy.wait('@putMellomlagring');
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
                }),
            );
        cy.wait(200);
        getTestElement('legeerklæring-liste').find('.attachmentListElement').should('have.length', 1);
        submitSkjema();
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
        el.should('contain', 'Vi har mottatt søknad om utbetaling av omsorgspenger');
    });
};

export const utfyllingUtils = {
    startSøknad,
    fyllUtOmBarn,
    fyllUtFraværSteg,
    lastOppLegeerklæring,
    sendInnSøknad,
    kontrollerKvittering,
};
