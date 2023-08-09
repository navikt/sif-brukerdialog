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
    selectRadioByLabel,
    selectRadioNo,
    selectRadioYes,
    setInputValueByName,
} from '../../utils';
import { fyllUtArbeidIPeriodeFrilanser } from '../arbeid-i-periode/arbeidIPeriode';

dayjs.extend(isoWeek);
dayjs.locale(locale);

export const fyllUtArbeidssituasjonFrilanser = () => {
    getTestElement('arbeidssituasjonFrilanser').within(() => {
        selectRadioYes('frilans.erFortsattFrilanser');
        setInputValueByName('frilans.arbeidsforhold.normalarbeidstid.timerPerUke', '5');
    });
};

export const fyllUtArbeidssituasjonErIkkeFrilanser = () => {
    getTestElement('arbeidssituasjonFrilanser').within(() => {
        selectRadioNo('frilans.harHattInntektSomFrilanser');
    });
};

export const fyllUtArbeidssituasjonFrilanserKunHonorarMisterIkkeHonorar = () => {
    selectRadioYes('frilans.harHattInntektSomFrilanser');
    selectRadioByLabel('Jeg får honorar for verv');
    selectRadioNo('frilans.misterHonorar');
};

export const fyllUtArbeidssituasjonErFrilanserOgMottarHonorar = () => {
    getTestElement('arbeidssituasjonFrilanser').within(() => {
        selectRadioYes('frilans.harHattInntektSomFrilanser');
        selectRadioByLabel('Jeg jobber som frilanser og får honorar for verv');

        const startdato = getSøknadsdato().startOf('week').subtract(3, 'weeks').format('YYYY-MM-DD');
        cy.get('input[name="frilans.startdato"]').click().type(startdato).blur();

        selectRadioNo('frilans.erFortsattFrilanser');

        const sluttdato = getSøknadsdato().format('YYYY-MM-DD');
        cy.get('input[name="frilans.sluttdato"]').click().type(sluttdato).blur();

        setInputValueByName('frilans.arbeidsforhold.normalarbeidstid.timerPerUke', '5');
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

        el.should('contain', 'Frilansoppdrag registrert i perioden');
        el.should('contain', 'Hurdal frilanssenter');
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

const erFrilanserFrilansarbeidOgMottarHonorar = () => {
    it('er frilanser med frilansarbeid og honorar', () => {
        cleanupFrilanser();
        fyllUtArbeidssituasjonErFrilanserOgMottarHonorar();
        clickFortsett();
        fyllUtArbeidIPeriodeFrilanser();
        gåTilOppsummeringFraArbeidIPerioden();

        /** Arbeidssituasjon */
        const el = getTestElement('arbeidssituasjon-frilanser');
        el.should('contain', 'Jeg jobber som frilanser og får honorar for styreverv eller andre verv');
        el.should('contain.text', 'Jobber normalt 5 timer per uke');
        el.should('contain', 'Startet ');
        el.should('contain', 'Sluttet ');
    });
};

export const testArbeidssituasjonFrilanser = () => {
    describe('Arbeidssituasjon frilanser', () => {
        erIkkeFrilanser();
        erFrilanserUtenOppdrag();
        erFrilanserMedOppdrag();
        erFrilanserKunHonorarMisterIkkeHonorar();
        erFrilanserFrilansarbeidOgMottarHonorar();
    });
};
