import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);
dayjs.locale(locale);

import { getInputByName, getTestElement, selectRadioNo, selectRadioYes, selectRadioYesOrNo, submitSkjema } from '.';

const fraDato = dayjs().startOf('week').subtract(3, 'weeks').format('YYYY-MM-DD');
const tilDato = dayjs().format('YYYY-MM-DD');

/*
const datoDelvisFravær = dayjs().startOf('week').subtract(4, 'weeks').format('YYYY-MM-DD');
const fomDatoIUtlandet = dayjs().startOf('week').subtract(3, 'weeks').add(2, 'day').format('YYYY-MM-DD');
const tomDatoIUtlandet = dayjs().startOf('week').subtract(3, 'weeks').add(4, 'day').format('YYYY-MM-DD');
const frilansStartDato = dayjs().startOf('week').subtract(10, 'weeks').format('YYYY-MM-DD');

/*
const virksomhet = {
    næringstype: 'JORDBRUK_SKOGBRUK',
    registrertINorge: 'yes',
    navn: 'Abc',
    organisasjonsnummer: '999263550',
    fraOgMed: '01.01.2010',
    tilOgMed: dayjs().subtract(1, 'day').format('DD.MM.YYYY'),
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: 'yes',
    varigEndringINæringsinntekt_dato: dayjs().subtract(1, 'year').format('DD.MM.YYYY'),
    varigEndringINæringsinntekt_inntektEtterEndring: '100',
    varigEndringINæringsinntekt_forklaring: 'Lorem ipsum',
    harRegnskapsfører: 'no',
};
*/
const startSøknad = () => {
    it('Starter søknad', () => {
        getTestElement('bekreft-label').click();
        getTestElement('typedFormikForm-submitButton').click();
        cy.wait('@putMellomlagring');
    });
};

const fyllUtOpplysningerOmPleietrengende = () => {
    it('Fyll ut opplysningene om pleietrengende  med fnr', () => {
        getTestElement('opplysningerOmPleietrengende.spm.navn').type('Test Testensen');
        getTestElement('opplysningerOmPleietrengende.spm.fnr').type('26838796566');
        submitSkjema();
        cy.wait(400);
        cy.wait('@putMellomlagring');
    });
};

const fyllUtPeriodenEnkelt = () => {
    it('Fyll ut perioden enkelt', () => {
        getInputByName('periodeFra').click().type(fraDato).blur();
        getInputByName('periodeTil').click().type(tilDato).blur();
        selectRadioYesOrNo('pleierDuDenSykeHjemme.spm', true);
        selectRadioYesOrNo('steg.tidsrom.flereSokere.spm', false);
        selectRadioYesOrNo('iUtlandetIPerioden.spm', false);
        selectRadioYesOrNo('ferieuttakIPerioden.spm', false);
        submitSkjema();
        cy.wait(400);
        cy.wait('@putMellomlagring');
    });
};

const fyllUtArbeidssituasjonEnkelt = () => {
    it('Fyll ut arbeidssituasjon enkelt', () => {
        getTestElement('arbeidssituasjonAnsatt-liste').each(($element) => {
            cy.wrap($element).within(() => {
                selectRadioNo('erAnsatt.spm');
                selectRadioYes('ansatt.sluttetFørSøknadsperiode.spm');
            });
        });
        selectRadioNo('harHattInntektSomFrilanser');
        selectRadioNo('harHattInntektSomSN');
        selectRadioNo('opptjeningUtland.spm');
        selectRadioNo('utenlandskNæring.spm');
        selectRadioNo('harVærtEllerErVernepliktig');
        submitSkjema();
        cy.wait(400);
        cy.wait('@putMellomlagring');
    });
};

export const utfyllingUtils = {
    startSøknad,
    fyllUtOpplysningerOmPleietrengende,
    fyllUtPeriodenEnkelt,
    fyllUtArbeidssituasjonEnkelt,
};
