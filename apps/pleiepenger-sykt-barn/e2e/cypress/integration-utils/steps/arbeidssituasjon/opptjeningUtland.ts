import { TestType } from '../../types/TestTyper';
import {
    getInputByName,
    getTestElement,
    getTestElementByType,
    gåTilOppsummeringFraArbeidssituasjon,
    selectRadioNo,
    selectRadioYes,
} from '../../utils';

import dayjs = require('dayjs');
const arbeidsgiverenAnnetEQS = 'Google';
const dato = dayjs().startOf('day').subtract(1, 'day');
const fraDatoTilDato = dato.format('DD.MM.YYYY');
const expectedOpptjeningLand = 'Belgia';
const expectedOpptjeningType = 'arbeidstaker';
const expectedOpptjeningDato = `${dato.format('D. MMM YYYY')} - ${dato.format('D. MMM YYYY')}`;

const fyllUtArbeidssituasjonUtenOpptjeningUtland = () => {
    getTestElement('arbeidssituasjonOpptjeningUtland').within(() => {
        selectRadioNo('harOpptjeningUtland');
    });
};

const fyllUtArbeidssituasjonMedOpptjeningUtland = () => {
    getTestElement('arbeidssituasjonOpptjeningUtland').within(() => {
        selectRadioYes('harOpptjeningUtland');
    });
    cy.get('button').contains('Legg til jobb i et annet EØS-land').click();
    cy.get('[aria-label="Jobbet i et annet EØS-land"]').within(() => {
        getInputByName('fom').click().type(fraDatoTilDato).blur();
        getInputByName('tom').click().type(fraDatoTilDato).blur();
        cy.get('select').select(1);
        getTestElementByType('radio').eq(0).check({ force: true });
        getInputByName('navn').click().type(arbeidsgiverenAnnetEQS).blur();
        cy.get('button[type="submit"]').click();
    });
};

export const fyllUtArbeidssituasjonOpptjeningUtland = (type: TestType = TestType.ENKEL) => {
    switch (type) {
        case TestType.KOMPLETT:
            fyllUtArbeidssituasjonMedOpptjeningUtland();
            break;
        default:
            fyllUtArbeidssituasjonUtenOpptjeningUtland();
            break;
    }
};

export const testArbeidssituasjonOpptjeningUtland = () => {
    describe('Arbeidssituasjonopptjening utland', () => {
        it('har ikke utenlandsk opptjening', () => {
            fyllUtArbeidssituasjonUtenOpptjeningUtland();
            gåTilOppsummeringFraArbeidssituasjon();

            const el = getTestElement('oppsummering-opptjeningUtland-nei');
            el.should('contain', 'Nei');
        });
        it('har utenlandsk opptjening', () => {
            fyllUtArbeidssituasjonMedOpptjeningUtland();
            gåTilOppsummeringFraArbeidssituasjon();

            const el = getTestElement('oppsummering-opptjeningUtland');
            el.should('contain', expectedOpptjeningDato);
            el.should(
                'contain',
                `Jobbet i ${expectedOpptjeningLand} som ${expectedOpptjeningType} hos ${arbeidsgiverenAnnetEQS}`
            );
        });
    });
};
