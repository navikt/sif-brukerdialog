import { DateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import { getSøknadsperiode, selectRadioNo, selectRadioYes } from '../utils';

dayjs.extend(isoWeek);
dayjs.locale(locale);

const { getTestElement, getInputByName, clickFortsett } = require('../utils');

const søknadsperiode = getSøknadsperiode();
const fraDato = dayjs(søknadsperiode.from).format('YYYY-MM-DD');
const tilDato = dayjs(søknadsperiode.to).format('YYYY-MM-DD');
const expectedFomTomPeriode = `${dayjs(fraDato).format('D. MMMM YYYY')} - ${dayjs(tilDato).format('D. MMMM YYYY')}`;
const expectedDateUtenlandsoppholdIPerioden = `${dayjs(fraDato).format('D. MMM YYYY')} - ${dayjs(tilDato).format(
    'D. MMM YYYY'
)}`;
const expectedDateFerie = `${dayjs(fraDato).format('D. MMM YYYY')} - ${dayjs(tilDato).format('D. MMM YYYY')}`;
const expectedLand = 'Albania'; // Land #2 i listen

export const cypressSøknadsperiode: DateRange = {
    from: ISODateToDate(fraDato),
    to: ISODateToDate(tilDato),
};

export const fyllUtPeriode = () => {
    getInputByName('periodeFra').click().type(fraDato).blur();
    getInputByName('periodeTil').click().type(tilDato).blur();
    selectRadioYes('skalOppholdeSegIUtlandetIPerioden');
    cy.get('button').contains('Legg til utenlandsopphold').click();
    getInputByName('fom').click().type(fraDato).blur();
    getInputByName('tom').click().type(tilDato).blur();
    cy.get('select').select(2); // Valg land #2 fra listen
    getInputByName('erBarnetInnlagt').eq(0).check({ force: true });
    cy.get('button').contains('Legg til periode barnet er innlagt').click();
    cy.get('[aria-label="Periode(r) barnet er innlagt"]').within(() => {
        getInputByName('fom').click().type(fraDato).blur();
        getInputByName('tom').click().type(tilDato).blur();
        cy.get('button').contains('Ok').click();
    });
    getInputByName('årsak').eq(1).check({ force: true });
    cy.get('button').contains('Ok').click();

    selectRadioYes('skalTaUtFerieIPerioden');
    cy.get('button').contains('Legg til ferie').click();
    getInputByName('fom').click().type(fraDato).blur();
    getInputByName('tom').click().type(tilDato).blur();
    cy.get('button').contains('Ok').click();

    clickFortsett();
};

export const fyllUtPeriodeEnkelt = () => {
    getInputByName('periodeFra').click().type(fraDato).blur();
    getInputByName('periodeTil').click().type(tilDato).blur();

    selectRadioNo('skalOppholdeSegIUtlandetIPerioden');
    selectRadioNo('skalTaUtFerieIPerioden');

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
        cy.get('li')
            .eq(0)
            .within(() => {
                cy.get('span')
                    .eq(0)
                    .should((element) => expect(expectedDateUtenlandsoppholdIPerioden).equal(element.text()));
                cy.get('span')
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
        cy.get('li')
            .eq(0)
            .should((element) => expect(expectedDateFerie).equal(element.text()));
    });
};

export const fyllUtPeriodeSteg = (testType?) => {
    it('STEG 2: Periode', () => {
        switch (testType) {
            case 'komplett':
                fyllUtPeriode();
                cy.wait('@getArbeidsgivere');
                break;
            default:
                fyllUtPeriodeEnkelt();
                cy.wait('@getArbeidsgivere');
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
