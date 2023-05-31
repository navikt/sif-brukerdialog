import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);
dayjs.locale(locale);

const {
    getTestElement,
    getInputByName,
    clickFortsett,
    selectRadioYes,
    getElement,
    clickNeiPaAlleSporsmal,
} = require('../utils');

const fraDato = dayjs().startOf('week').subtract(3, 'weeks').format('YYYY-MM-DD');
const tilDato = dayjs().startOf('week').add(1, 'week').format('YYYY-MM-DD');
const expectedFomTomPeriode = `${dayjs(fraDato).format('D. MMMM YYYY')} - ${dayjs(tilDato).format('D. MMMM YYYY')}`;
const expectedDateUtenlandsoppholdIPerioden = `${dayjs(fraDato).format('D. MMM YYYY')} - ${dayjs(tilDato).format(
    'D. MMM YYYY'
)}`;
const expectedDateFerie = `${dayjs(fraDato).format('D. MMM YYYY')} - ${dayjs(tilDato).format('D. MMM YYYY')}`;
const expectedLand = 'Albania'; // Land #2 i listen

export const fyllUtPeriode = () => {
    getInputByName('periodeFra').click().type(fraDato).blur();
    getInputByName('periodeTil').click().type(tilDato).blur();
    selectRadioYes('er-iUtlandetIPerioden');

    selectRadioYes('er-iUtlandetIPerioden');
    getElement('button').contains('Legg til utenlandsopphold').click();
    getInputByName('fom').click().type(fraDato).blur();
    getInputByName('tom').click().type(tilDato).blur();
    getElement('select').select(2); // Valg land #2 fra listen
    getInputByName('erBarnetInnlagt').eq(0).check({ force: true });
    getElement('button').contains('Legg til periode barnet er innlagt').click();
    cy.get('[aria-label="Periode(r) barnet er innlagt"]').within(() => {
        getInputByName('fom').click().type(fraDato).blur();
        getInputByName('tom').click().type(tilDato).blur();
        getElement('button').contains('Ok').click();
    });
    getInputByName('årsak').eq(1).check({ force: true });
    getElement('button').contains('Ok').click();

    selectRadioYes('er-ferieuttakIPerioden');
    getElement('button').contains('Legg til ferie').click();
    getInputByName('fom').click().type(fraDato).blur();
    getInputByName('tom').click().type(tilDato).blur();
    getElement('button').contains('Ok').click();

    clickFortsett();
};

export const fyllUtPeriodeEnkelt = () => {
    getInputByName('periodeFra').click().type(fraDato).blur();
    getInputByName('periodeTil').click().type(tilDato).blur();
    clickNeiPaAlleSporsmal();

    clickFortsett();
};

export const oppsummeringTestPeriodeEnkelt = () => {
    getTestElement('oppsummering-tidsrom-fomtom').should((element) =>
        expect(expectedFomTomPeriode).equal(element.text())
    );
    getTestElement('oppsummering-utenlandsoppholdIPerioden').should((element) => expect('Nei').equal(element.text()));
    getTestElement('oppsummering-ferieuttakIPerioden').should((element) => expect('Nei').equal(element.text()));
};

export const oppsummeringTestPeriode = () => {
    getTestElement('oppsummering-tidsrom-fomtom').should((element) =>
        expect(expectedFomTomPeriode).equal(element.text())
    );
    getTestElement('oppsummering-utenlandsoppholdIPerioden').should((element) => expect('Ja').equal(element.text()));
    getTestElement('oppsummering-utenlandsoppholdIPerioden-list').within(() => {
        getElement('li')
            .eq(0)
            .within(() => {
                getElement('span')
                    .eq(0)
                    .should((element) => expect(expectedDateUtenlandsoppholdIPerioden).equal(element.text()));
                getElement('span')
                    .eq(1)
                    .should((element) => expect(expectedLand).equal(element.text()));
            });

        cy.get('div')
            .contains('Periode(r) barnet er innlagt')
            .within(() => {
                cy.get('li').should((element) => expect(expectedDateUtenlandsoppholdIPerioden).equal(element.text()));
            });
        cy.get('div').contains('Etter trygdeavtale med et annet land');
    });
    getTestElement('oppsummering-ferieuttakIPerioden').should((element) => expect('Ja').equal(element.text()));
    getTestElement('oppsummering-ferieuttakIPerioden-list').within(() => {
        getElement('li')
            .eq(0)
            .should((element) => expect(expectedDateFerie).equal(element.text()));
    });
};

export const fyllUtPeriodeSteg = (testType?) => {
    it('STEG 2: Periode', () => {
        switch (testType) {
            case 'komplett':
                fyllUtPeriode();
                break;
            default:
                fyllUtPeriodeEnkelt();
                break;
        }
    });
};

export const oppsummeringTestPeriodeSteg = (testType?) => {
    switch (testType) {
        case 'komplett':
            oppsummeringTestPeriode();
            break;
        default:
            oppsummeringTestPeriodeEnkelt();
            break;
    }
};
