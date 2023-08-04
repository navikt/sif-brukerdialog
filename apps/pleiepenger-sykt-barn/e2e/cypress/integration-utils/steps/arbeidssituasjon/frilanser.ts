import * as dayjs from 'dayjs';
import * as locale from 'dayjs/locale/nb';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import { cyApiMockData } from '../../cyApiMockData';
import {
    clickFortsett,
    clickTilbake,
    getSøknadsdato,
    getTestElement,
    gåTilOppsummeringFraArbeidIPerioden,
    gåTilOppsummeringFraArbeidssituasjon,
    selectCheckboxByNameAndValue,
    selectRadioNo,
    selectRadioYes,
    setInputValueByName,
} from '../../utils';
import { fyllUtArbeidIPeriodeFrilansarbeid } from '../arbeid-i-periode/arbeidIPeriode';

dayjs.extend(isoWeek);
dayjs.locale(locale);

export const fyllUtArbeidssituasjonFrilanser = () => {
    getTestElement('arbeidssituasjonFrilanser').within(() => {
        selectRadioYes('frilans.erFortsattFrilanser');
        selectRadioNo('frilans.misterHonorar');
        setInputValueByName('frilans.arbeidsforholdFrilansarbeid.normalarbeidstid.timerPerUke', '5');
    });
};

export const fyllUtArbeidssituasjonErIkkeFrilanser = () => {
    getTestElement('arbeidssituasjonFrilanser').within(() => {
        selectRadioNo('frilans.harHattInntektSomFrilanser');
    });
};

export const fyllUtArbeidssituasjonFrilanserKunHonorarMisterIkkeHonorar = () => {
    selectRadioYes('frilans.harHattInntektSomFrilanser');
    selectCheckboxByNameAndValue('frilans.frilanstyper', 'HONORARARBEID');
    selectRadioNo('frilans.misterHonorar');
};

export const fyllUtArbeidssituasjonErFrilanserOgFårHonorar = () => {
    getTestElement('arbeidssituasjonFrilanser').within(() => {
        selectRadioYes('frilans.harHattInntektSomFrilanser');

        cy.contains('Jeg jobber som frilanser').parent().click();
        cy.contains('Jeg får honorar for verv').parent().click();
        selectRadioYes('frilans.misterHonorar');

        const startdato = getSøknadsdato().startOf('week').subtract(3, 'weeks').format('YYYY-MM-DD');
        cy.get('input[name="frilans.startdato"]').click().type(startdato).blur();

        selectRadioNo('frilans.erFortsattFrilanser');

        const sluttdato = getSøknadsdato().format('YYYY-MM-DD');
        cy.get('input[name="frilans.sluttdato"]').click().type(sluttdato).blur();

        setInputValueByName('frilans.arbeidsforholdFrilansarbeid.normalarbeidstid.timerPerUke', '5');
        setInputValueByName('frilans.arbeidsforholdHonorararbeid.normalarbeidstid.timerPerUke', '10');
    });
};
export const fyllUtArbeidssituasjonFrilansarbeidOgHonorarMisterIkkeHonorar = () => {
    getTestElement('arbeidssituasjonFrilanser').within(() => {
        selectRadioYes('frilans.harHattInntektSomFrilanser');

        cy.contains('Jeg jobber som frilanser').parent().click();
        cy.contains('Jeg får honorar for verv').parent().click();
        selectRadioNo('frilans.misterHonorar');

        const startdato = getSøknadsdato().startOf('week').subtract(10, 'years').format('YYYY-MM-DD');
        cy.get('input[name="frilans.startdato"]').click().type(startdato).blur();

        selectRadioNo('frilans.erFortsattFrilanser');

        const sluttdato = getSøknadsdato().format('YYYY-MM-DD');
        cy.get('input[name="frilans.sluttdato"]').click().type(sluttdato).blur();

        setInputValueByName('frilans.arbeidsforholdFrilansarbeid.normalarbeidstid.timerPerUke', '5');
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

        getTestElement('arbeidssituasjon-frilanser').should(
            'contain',
            'Er ikke frilanser og får ikke honorar i perioden det søkes for'
        );
    });
};

const cleanupFrilanser = () => {
    /** Tømmer mellomlagring ved å si at en ikke er frilanser og så gå frem og tilbake */
    selectRadioNo('frilans.harHattInntektSomFrilanser');
    clickFortsett();
    clickTilbake();
};

const erFrilanserKunHonorarMisterIkkeHonorar = () => {
    it('er frilanser kun honorar mister ikke honorar', () => {
        cleanupFrilanser();
        fyllUtArbeidssituasjonFrilanserKunHonorarMisterIkkeHonorar();
        gåTilOppsummeringFraArbeidssituasjon();
        getTestElement('arbeidssituasjon-frilanser').should(
            'contain',
            'Jeg mister ikke honorar for verv i søknadsperioden'
        );
    });
};

const erFrilanserFrilansarbeidOgHonorarMisterIkkeHonorar = () => {
    it('er frilanser med frilansarbeid og honorar, mister ikke honorar', () => {
        cleanupFrilanser();
        fyllUtArbeidssituasjonFrilansarbeidOgHonorarMisterIkkeHonorar();
        clickFortsett();
        fyllUtArbeidIPeriodeFrilansarbeid();
        gåTilOppsummeringFraArbeidIPerioden();

        /** Arbeidssituasjon */
        const el = getTestElement('arbeidssituasjon-frilanser');
        el.should('contain', 'Jeg jobber som frilanser. Jobber normalt 5 timer per uke');
        el.should('contain.text', 'Jeg får honorar for styreverv eller andre verv');
        el.should('contain', 'Startet ');
        el.should('contain', 'Sluttet ');

        /** Arbeid i perioden */
        cy.get('h2')
            .contains('Jobb i søknadsperioden')
            .parent()
            .within(() => {
                cy.get('h3').contains('Frilanser').siblings().should('contain', 'Jobber ikke i søknadsperioden');

                cy.get('h3')
                    .contains('Honorar for styreverv/andre små verv')
                    .siblings()
                    .should('contain', 'Mister ikke honorar på grunn av pleiepenger');
            });
    });
};

export const testArbeidssituasjonFrilanser = () => {
    describe('Arbeidssituasjon frilanser', () => {
        erIkkeFrilanser();
        erFrilanserUtenOppdrag();
        erFrilanserMedOppdrag();
        erFrilanserKunHonorarMisterIkkeHonorar();
        erFrilanserFrilansarbeidOgHonorarMisterIkkeHonorar();
    });
};
