import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import {
    getElement,
    getInputByName,
    getTestElement,
    selectRadioYes,
    submitModal,
    submitSkjema,
    selectRadioYesOrNo,
} from '../utils';

dayjs.extend(isoWeek);
dayjs.locale(locale);

const fomTomSiste12 = dayjs().startOf('day').subtract(1, 'day');
const fomTomNeste12 = dayjs().startOf('day').add(1, 'day');

const fomTomMedlemskapSiste12InputString = fomTomSiste12.format('DD.MM.YYYY');
const fomTomMedlemskapNeste12InputString = fomTomNeste12.format('DD.MM.YYYY');
const expectedDateMedlemskapSiste12 = `${fomTomSiste12.format('D. MMM YYYY')} - ${fomTomSiste12.format('D. MMM YYYY')}`;
const expectedDateMedlemskapNeste12 = `${fomTomNeste12.format('D. MMM YYYY')} - ${fomTomNeste12.format('D. MMM YYYY')}`;
const expectedLand = 'Albania'; // Land #2 i listen

const fyllUtMedlemskapEnkelt = () => {
    selectRadioYesOrNo('medlemskap-annetLandSiste12', false);
    selectRadioYesOrNo('medlemskap-annetLandNeste12', false);
    submitSkjema();
};

const fyllUtMedlemskapKomplett = () => {
    selectRadioYesOrNo('medlemskap-annetLandSiste12', true);

    getTestElement('bostedUtlandList-annetLandSiste12').within(() => {
        getElement('button').contains('Legg til nytt utenlandsopphold').click();
    });
    getInputByName('fom').click().type(fomTomMedlemskapSiste12InputString).blur();
    getInputByName('tom').click().type(fomTomMedlemskapSiste12InputString).blur();
    getElement('select').select(2); // Valg land #2 fra listen
    submitModal();

    selectRadioYes('medlemskap-annetLandNeste12');

    getTestElement('bostedUtlandList-annetLandNeste12').within(() => {
        getElement('button').contains('Legg til nytt utenlandsopphold').click();
    });

    getInputByName('fom').click().type(fomTomMedlemskapNeste12InputString).blur();
    getInputByName('tom').click().type(fomTomMedlemskapNeste12InputString).blur();
    getElement('select').select(2); // Valg land #2 fra listen
    submitModal();

    submitSkjema();
};

const oppsummeringTestMedlemskapEnkelt = () => {
    getTestElement('oppsummering-medlemskap-utlandetSiste12').should((element) => expect('Nei').equal(element.text()));
    getTestElement('oppsummering-medlemskap-utlandetNeste12').should((element) => expect('Nei').equal(element.text()));
};

const oppsummeringTestMedlemskapKomplett = () => {
    getTestElement('oppsummering-medlemskap-utlandetSiste12').should((element) => expect('Ja').equal(element.text()));
    getTestElement('oppsummering-medlemskap-utlandetSiste12-list').within(() => {
        getElement('li')
            .eq(0)
            .within(() => {
                getElement('span')
                    .eq(0)
                    .should((element) => expect(expectedDateMedlemskapSiste12).equal(element.text()));
                getElement('span')
                    .eq(1)
                    .should((element) => expect(expectedLand).equal(element.text()));
            });
    });

    getTestElement('oppsummering-medlemskap-utlandetNeste12').should((element) => expect('Ja').equal(element.text()));
    getTestElement('oppsummering-medlemskap-utlandetNeste12-list').within(() => {
        getElement('li')
            .eq(0)
            .within(() => {
                getElement('span')
                    .eq(0)
                    .should((element) => expect(expectedDateMedlemskapNeste12).equal(element.text()));
                getElement('span')
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
