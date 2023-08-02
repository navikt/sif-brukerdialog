import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import { cyApiMockData } from '../../cyApiMockData';
import {
    getElement,
    getTestElement,
    gåTilOppsummeringFraArbeidssituasjon,
    selectCheckByNameAndValue,
    selectRadioNo,
    selectRadioNoByName,
    selectRadioNyYesOrNo,
    selectRadioYes,
    selectRadioYesByName,
    setInputValue,
    setInputValueByName,
} from '../../utils';

dayjs.extend(isoWeek);
dayjs.locale(locale);

export const fyllUtArbeidssituasjonFrilanser = () => {
    getTestElement('arbeidssituasjonFrilanser').within(($body) => {
        if ($body.find('[data-testid=er-frilanser_yes]').length) {
            selectRadioYes('er-frilanser');
        }
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
        selectRadioYesByName('frilans.harHattInntektSomFrilanser');

        cy.contains('Jeg jobber som frilanser').parent().click();
        cy.contains('Jeg får honorar for verv').parent().click();
        selectRadioYesByName('frilans.misterHonorar');

        const startdato = dayjs().startOf('week').subtract(3, 'weeks').format('YYYY-MM-DD');
        cy.get('input[name="frilans.startdato"]').click().type(startdato).blur();

        selectRadioNoByName('frilans.erFortsattFrilanser');

        const sluttdato = dayjs().format('YYYY-MM-DD');
        cy.get('input[name="frilans.sluttdato"]').click().type(sluttdato).blur();

        setInputValueByName('frilans.arbeidsforholdFrilansarbeid.normalarbeidstid.timerPerUke', '5');
        setInputValueByName('frilans.arbeidsforholdHonorararbeid.normalarbeidstid.timerPerUke', '10');
    });
};

const erFrilanserUtenOppdrag = () => {
    beforeEach('er frilanser uten oppdrag', () => {
        cy.intercept(`/oppslag/arbeidsgiver**`, { ...cyApiMockData.arbeidsgivereMock, frilansoppdrag: [] }).as(
            'getArbeidsgivere'
        );
    });

    it('er frilanser uten oppdrag', () => {
        fyllUtArbeidssituasjonFrilanser();
        gåTilOppsummeringFraArbeidssituasjon();

        const el = getTestElement('arbeidssituasjon-frilanser');
        el.should('contain', 'Jeg jobber som frilanser');
        el.should('contain', 'Startet 1. oktober 2022');
        el.should('contain', 'Jobber normalt 5 timer per uke');
    });
};

const erFrilanserMedOppdrag = () => {
    it('er frilanser med oppdrag', () => {
        fyllUtArbeidssituasjonFrilanser();
        gåTilOppsummeringFraArbeidssituasjon();

        const el = getTestElement('arbeidssituasjon-frilanser');
        el.should('contain', 'Jeg jobber som frilanser');
        el.should('contain', 'Startet 1. oktober 2022');
        el.should('contain', 'Jobber normalt 5 timer per uke');
    });
};

const erIkkeFrilanser = () => {
    it('er ikke frilanser', () => {
        fyllUtArbeidssituasjonErIkkeFrilanser();
        gåTilOppsummeringFraArbeidssituasjon();

        const el = getTestElement('arbeidssituasjon-frilanser');
        el.should('contain', 'Er ikke frilanser og får ikke honorari perioden det søkes for');
    });
};

export const testArbeidssituasjonFrilanser = () => {
    describe('Arbeidssituasjon frilanser', () => {
        erIkkeFrilanser();
        erFrilanserUtenOppdrag();
        erFrilanserMedOppdrag();
    });
};
