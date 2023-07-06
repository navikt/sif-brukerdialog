import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);
dayjs.locale(locale);

import {
    // checkCheckbuttonByName,
    // getInputByName,
    getTestElement,
    getTestElementByType,
    selectRadioYesOrNo,
    getInputByName,
    // setInputByNameValue,
    submitSkjema,
    getElement,
} from '.';

const fileName = 'navlogopng.png';

const fraDato = dayjs().startOf('week').subtract(3, 'weeks').format('YYYY-MM-DD');
const tilDato = dayjs().startOf('week').add(1, 'week').format('YYYY-MM-DD');

const startSøknad = () => {
    it('Starter søknad', () => {
        cy.wait(['@getSøker', '@getBarn']);
        getTestElement('bekreft-label').click();
        getTestElement('typedFormikForm-submitButton').click();
        cy.wait('@putMellomlagring');
    });
};

const fyllUtOmBarnMinstEttYngre13år = () => {
    it('Fyller ut om barnet med minst yngre 13 år', () => {
        getTestElement('bekrefterDektTiDagerSelv').click();
        submitSkjema();
        cy.wait('@putMellomlagring');
    });
};

const fyllUtFraværSteg = () => {
    it('Fyller ut om barnet med minst yngre 13 år', () => {
        selectRadioYesOrNo('harPerioderMedFravær', true);
        getElement('button').contains('Legg til dager med fullt fravær fra jobb').click();
        getInputByName('fraOgMed').click().type(fraDato).blur();
        getInputByName('tilOgMed').click().type(tilDato).blur();
        getElement('button').contains('Neste').eq(0).click();
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
    fyllUtOmBarnMinstEttYngre13år,
    fyllUtFraværSteg,
    lastOppLegeerklæring,
    sendInnSøknad,
    kontrollerKvittering,
};
