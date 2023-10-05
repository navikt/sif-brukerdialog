import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import {
    getInputByName,
    getTestElement,
    selectRadioYes,
    submitModal,
    submitSkjema,
    selectRadioYesOrNo,
} from './cyHelpers';

dayjs.extend(isoWeek);
dayjs.locale(locale);

const fomTomMedlemskapSiste12 = dayjs().startOf('day').subtract(1, 'day').format('YYYY-MM-DD');
const fomTomMedlemskapNeste12 = dayjs().startOf('day').add(1, 'day').format('YYYY-MM-DD');
const expectedDateMedlemskapSiste12 = `${dayjs(fomTomMedlemskapSiste12).format('D. MMM YYYY')} - ${dayjs(
    fomTomMedlemskapSiste12,
).format('D. MMM YYYY')}`;
const expectedDateMedlemskapNeste12 = `${dayjs(fomTomMedlemskapNeste12).format('D. MMM YYYY')} - ${dayjs(
    fomTomMedlemskapNeste12,
).format('D. MMM YYYY')}`;
const expectedLand = 'Albania'; // Land #2 i listen

const fyllUtMedlemskapEnkelt = () => {
    selectRadioYesOrNo('medlemskap-annetLandSiste12', false);
    selectRadioYesOrNo('medlemskap-annetLandNeste12', false);
    submitSkjema();
};

const fyllUtMedlemskapKomplett = () => {
    selectRadioYesOrNo('medlemskap-annetLandSiste12', true);

    getTestElement('bostedUtlandList-annetLandSiste12').within(() => {
        cy.get('button').contains('Legg til nytt utenlandsopphold').click();
    });
    getInputByName('fom').click().type(fomTomMedlemskapSiste12).blur();
    getInputByName('tom').click().type(fomTomMedlemskapSiste12).blur();
    cy.get('select').select(2); // Valg land #2 fra listen
    submitModal();

    selectRadioYes('medlemskap-annetLandNeste12');

    getTestElement('bostedUtlandList-annetLandNeste12').within(() => {
        cy.get('button').contains('Legg til nytt utenlandsopphold').click();
    });

    getInputByName('fom').click().type(fomTomMedlemskapNeste12).blur();
    getInputByName('tom').click().type(fomTomMedlemskapNeste12).blur();
    cy.get('select').select(2); // Valg land #2 fra listen
    submitModal();

    submitSkjema();
    cy.wait(400);
    cy.wait('@putMellomlagring');
};

const oppsummeringTestMedlemskapEnkelt = () => {
    getTestElement('oppsummering-medlemskap-utlandetSiste12').should((element) => expect('Nei').equal(element.text()));
    getTestElement('oppsummering-medlemskap-utlandetNeste12').should((element) => expect('Nei').equal(element.text()));
};

const oppsummeringTestMedlemskapKomplett = () => {
    getTestElement('oppsummering-medlemskap-utlandetSiste12').should((element) => expect('Ja').equal(element.text()));
    getTestElement('oppsummering-medlemskap-utlandetSiste12-list').within(() => {
        cy.get('li')
            .eq(0)
            .within(() => {
                cy.get('span')
                    .eq(0)
                    .should((element) => expect(expectedDateMedlemskapSiste12).equal(element.text()));
                cy.get('span')
                    .eq(1)
                    .should((element) => expect(expectedLand).equal(element.text()));
            });
    });

    getTestElement('oppsummering-medlemskap-utlandetNeste12').should((element) => expect('Ja').equal(element.text()));
    getTestElement('oppsummering-medlemskap-utlandetNeste12-list').within(() => {
        cy.get('li')
            .eq(0)
            .within(() => {
                cy.get('span')
                    .eq(0)
                    .should((element) => expect(expectedDateMedlemskapNeste12).equal(element.text()));
                cy.get('span')
                    .eq(1)
                    .should((element) => expect(expectedLand).equal(element.text()));
            });
    });
};

export const fyllUtMedlemskapSteg = (testType?) => {
    it('Fyller ut Medlemskap steg', () => {
        switch (testType) {
            case 'komplett':
                fyllUtMedlemskapKomplett();
                break;
            default:
                fyllUtMedlemskapEnkelt();
                break;
        }
    });
};

export const oppsummeringTestMedlemskapSteg = (testType?) => {
    switch (testType) {
        case 'komplett':
            oppsummeringTestMedlemskapKomplett();
            break;
        default:
            oppsummeringTestMedlemskapEnkelt();
            break;
    }
};
