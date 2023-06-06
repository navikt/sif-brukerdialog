import { contextConfig, gotoStep } from '../../contextConfig';
import { cyApiMockData } from '../../cyApiMockData';
import { mellomlagring } from '../../mocks/mellomlagring';
import {
    getTestElement,
    gåTilOppsummeringFraArbeidssituasjon,
    selectRadioNo,
    selectRadioNyYesOrNo,
    selectRadioYes,
    setInputValue,
} from '../../utils';

import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);
dayjs.locale(locale);

export const fyllUtArbeidssituasjonFrilanser = () => {
    getTestElement('arbeidssituasjonFrilanser').within(($body) => {
        if ($body.find('[data-testid=er-frilanser_yes]').length) {
            selectRadioYes('er-frilanser');
        }

        // const startdato = mellomlagring.formValues.frilans.;

        //cy.get('[name="frilans.startdato"]').click().type(startdato).blur();
        selectRadioYes('er-fortsatt-frilanser');
        setInputValue('normalarbeidstid.timerPerUke', '5');
    });
};

export const fyllUtArbeidssituasjonErIkkeFrilanser = () => {
    getTestElement('arbeidssituasjonFrilanser').within(($body) => {
        if ($body.find('[data-testid=er-frilanser_no]').length) {
            selectRadioNo('er-frilanser');
        }
    });
};

export const fyllUtArbeidssituasjonErFrilanserOgFårHonorar = () => {
    getTestElement('arbeidssituasjonFrilanser').within(() => {
        selectRadioYes('er-frilanser');

        getTestElement('frilans-typer_frilans').click({ force: true });
        getTestElement('frilans-typer_styreverv').click({ force: true });

        selectRadioNyYesOrNo('mister-honorarStyreverv', true);
        const startdato = dayjs().startOf('week').subtract(3, 'weeks').format('YYYY-MM-DD');
        cy.get('input[name="frilans.startdato"]').click().type(startdato).blur();

        selectRadioNyYesOrNo('er-fortsatt-frilanser', false);

        const sluttdato = dayjs().format('YYYY-MM-DD');
        cy.get('input[name="frilans.sluttdato"]').click().type(sluttdato).blur();

        setInputValue('normalarbeidstid.timerPerUke', '20');
    });
};

const erFrilanserUtenOppdrag = () => {
    contextConfig({ mellomlagring });
    beforeEach('er frilanser uten oppdrag', () => {
        cy.intercept(`/oppslag/arbeidsgiver**`, { ...cyApiMockData.arbeidsgivereMock, frilansoppdrag: [] }).as(
            'getArbeidsgivere'
        );
    });

    it('er frilanser uten oppdrag', () => {
        gotoStep('arbeidssituasjon');
        fyllUtArbeidssituasjonFrilanser();
        gåTilOppsummeringFraArbeidssituasjon();

        const el = getTestElement('arbeidssituasjon-frilanser');
        el.should('contain', 'Jeg jobber som frilanser');
        el.should('contain', 'Startet 1. oktober 2022');
        // el.should('contain', 'Er fortsatt frilanser');
        el.should('contain', 'Jobber normalt 5 timer per uke');
    });
};

const erFrilanserMedOppdrag = () => {
    it('er frilanser med oppdrag', () => {
        gotoStep('arbeidssituasjon');
        fyllUtArbeidssituasjonFrilanser();
        gåTilOppsummeringFraArbeidssituasjon();

        const el = getTestElement('arbeidssituasjon-frilanser');
        el.should('contain', 'Jeg jobber som frilanser');
        el.should('contain', 'Startet 1. oktober 2022');
        // el.should('contain', 'Er fortsatt frilanser');
        el.should('contain', 'Jobber normalt 5 timer per uke');
    });
};

const erIkkeFrilanser = () => {
    it('er ikke frilanser', () => {
        gotoStep('arbeidssituasjon');
        fyllUtArbeidssituasjonErIkkeFrilanser();
        gåTilOppsummeringFraArbeidssituasjon();

        const el = getTestElement('arbeidssituasjon-frilanser');
        el.should(
            'contain',
            'Er ikke frilanser eller får ikke honorar for styreverv/andre små verv i perioden det søkes for'
        );
    });
};

export const testArbeidssituasjonFrilanser = () => {
    contextConfig({ mellomlagring });
    describe('Arbeidssituasjon frilanser', () => {
        erIkkeFrilanser();
        erFrilanserUtenOppdrag();
        erFrilanserMedOppdrag();
    });
};
