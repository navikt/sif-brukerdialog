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
    selectRadioByNameAndValue,
    getRadioButtons,
    selectRadioByValue,
} from '.';

const fileName = 'navlogopng.png';

const fraDato = dayjs().startOf('isoWeek').subtract(3, 'weeks').format('YYYY-MM-DD');
const tilDato = dayjs().startOf('isoWeek').format('YYYY-MM-DD');
const datoDelvisFravær = dayjs().startOf('isoWeek').subtract(4, 'weeks').format('YYYY-MM-DD');
const fomDatoIUtlandet = dayjs().startOf('isoWeek').subtract(3, 'weeks').add(2, 'day').format('YYYY-MM-DD');
const tomDatoIUtlandet = dayjs().startOf('isoWeek').subtract(3, 'weeks').add(4, 'day').format('YYYY-MM-DD');
const frilansStartDato = dayjs().startOf('isoWeek').subtract(10, 'weeks').format('YYYY-MM-DD');

const virksomhet = {
    næringstype: 'JORDBRUK_SKOGBRUK',
    registrertINorge: 'yes',
    navn: 'Abc',
    organisasjonsnummer: '999263550' /** Navs orgnur */,
    fraOgMed: '01.01.2010',
    tilOgMed: dayjs().subtract(1, 'day').format('DD.MM.YYYY'),
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: 'yes',
    varigEndringINæringsinntekt_dato: dayjs().subtract(1, 'year').format('DD.MM.YYYY'),
    varigEndringINæringsinntekt_inntektEtterEndring: '100',
    varigEndringINæringsinntekt_forklaring: 'Lorem ipsum',
    harRegnskapsfører: 'no',
};

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

const fyllUtVirksomhetDialog = () => {
    selectRadioByNameAndValue('næringstype', virksomhet.næringstype);
    selectRadioByNameAndValue('registrertINorge', virksomhet.registrertINorge);
    getInputByName('navnPåVirksomheten').click().type(virksomhet.navn).blur();
    getInputByName('organisasjonsnummer').click().type(virksomhet.organisasjonsnummer).blur();
    getInputByName('fom').click().type(virksomhet.fraOgMed).blur();
    getInputByName('tom').click().type(virksomhet.tilOgMed).blur();
    selectRadioByNameAndValue(
        'hattVarigEndringAvNæringsinntektSiste4Kalenderår',
        virksomhet.hattVarigEndringAvNæringsinntektSiste4Kalenderår,
    );
    getInputByName('varigEndringINæringsinntekt_dato').click().type(virksomhet.varigEndringINæringsinntekt_dato).blur();
    getInputByName('varigEndringINæringsinntekt_inntektEtterEndring')
        .click()
        .type(virksomhet.varigEndringINæringsinntekt_inntektEtterEndring)
        .blur();
    getInputByName('varigEndringINæringsinntekt_forklaring')
        .click()
        .type(virksomhet.varigEndringINæringsinntekt_forklaring)
        .blur();
    selectRadioByNameAndValue('harRegnskapsfører', virksomhet.harRegnskapsfører);
    submitModal();
};

const fyllerUtArbeidssituasjonSteg = () => {
    it('Fyller ut Arbeidssituasjon steg', () => {
        selectRadioYesOrNo('frilans_erFrilanser', true);
        getInputByName('frilans_startdato').click().type(frilansStartDato).blur();
        selectRadioYesOrNo('frilans_jobberFortsattSomFrilans', true);

        selectRadioYesOrNo('selvstendig_erSelvstendigNæringsdrivende', true);
        selectRadioYesOrNo('selvstendig_harFlereVirksomheter', true);
        getElement('button').contains('Registrer virksomhet').click();
        fyllUtVirksomhetDialog();
        submitSkjema();
        cy.wait('@putMellomlagring');
    });
};

const fyllerUtFraværFraSteg = () => {
    it('Fyller ut Fravær Fra steg', () => {
        getRadioButtons().each(($element, $index) => {
            if ($index % 2 === 0) {
                cy.wrap($element).within(() => {
                    selectRadioByValue('SELVSTENDIG_VIRKSOMHET');
                });
            } else if ($index % 3 === 0) {
                cy.wrap($element).within(() => {
                    selectRadioByValue('BEGGE');
                });
            } else
                cy.wrap($element).within(() => {
                    selectRadioByValue('FRILANSER');
                });
        });
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
    fyllUtOmBarnMinstEttYngre13år,
    fyllUtFraværSteg,
    lastOppLegeerklæring,
    fyllerUtArbeidssituasjonSteg,
    fyllerUtFraværFraSteg,
    sendInnSøknad,
    kontrollerKvittering,
};
