import dayjs = require('dayjs');
import { gotoStep } from '../../contextConfig';
import {
    clickFortsett,
    getElement,
    getInputByName,
    getTestElement,
    gåTilOppsummeringFraArbeidIPerioden,
    gåTilOppsummeringFraArbeidssituasjon,
    selectRadioByNameAndValue,
    selectRadioNo,
    selectRadioNyYesOrNo,
    selectRadioYes,
} from '../../utils';
import { fyllUtArbeidstidJobberIkke } from '../arbeid-i-periode/arbeidIPeriode';

export const fyllUtArbeidssituasjonErIkkeSelvstendig = () => {
    getTestElement('arbeidssituasjonSelvstendig').within(() => {
        selectRadioNo('er-selvstendig');
    });
};

const virksomhet = {
    næringstype: 'JORDBRUK_SKOGBRUK',
    registrertINorge: 'yes',
    navn: 'Abc',
    organisasjonsnummer: '999263550' /** Navs orgnur */,
    fraOgMed: '01.01.2010',
    tilOgMed: dayjs().subtract(1, 'day').format('DD.MM.YYYY'),
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: 'yes',
    varigEndringINæringsinntekt_dato: dayjs().subtract(1, 'year').format('DD.MM.YYYY'),
    varigEndringINæringsinntekt_inntektEtterEndring: '100',
    varigEndringINæringsinntekt_forklaring: 'Lorem ipsum',
    harRegnskapsfører: 'no',
};

const fyllUtVirksomhetDialog = () => {
    cy.get('.formikModalForm__modal').within(() => {
        selectRadioByNameAndValue('næringstype', virksomhet.næringstype);
        selectRadioByNameAndValue('registrertINorge', virksomhet.registrertINorge);
        getInputByName('navnPåVirksomheten').click().type(virksomhet.navn).blur();
        getInputByName('organisasjonsnummer').click().type(virksomhet.organisasjonsnummer).blur();
        getInputByName('fom').click().type(virksomhet.fraOgMed).blur();
        getInputByName('tom').click().type(virksomhet.tilOgMed).blur();
        selectRadioByNameAndValue(
            'hattVarigEndringAvNæringsinntektSiste4Kalenderår',
            virksomhet.hattVarigEndringAvNæringsinntektSiste4Kalenderår
        );
        getInputByName('varigEndringINæringsinntekt_dato')
            .click()
            .type(virksomhet.varigEndringINæringsinntekt_dato)
            .blur();
        getInputByName('varigEndringINæringsinntekt_inntektEtterEndring')
            .click()
            .type(virksomhet.varigEndringINæringsinntekt_inntektEtterEndring)
            .blur();
        getInputByName('varigEndringINæringsinntekt_forklaring')
            .click()
            .type(virksomhet.varigEndringINæringsinntekt_forklaring)
            .blur();
        selectRadioByNameAndValue('harRegnskapsfører', virksomhet.harRegnskapsfører);
        getElement('button[type="submit"]').click();
    });
    getInputByName('selvstendig.arbeidsforhold.normalarbeidstid.timerPerUke').click().type('5').blur();
};

export const fyllUtArbeidssituasjonErSelvstendig = () => {
    getTestElement('arbeidssituasjonSelvstendig').within(() => {
        selectRadioYes('er-selvstendig');
        selectRadioNyYesOrNo('har-flere-virksomheter', true);
        getElement('button').contains('Registrer virksomhet').click();
    });
    fyllUtVirksomhetDialog();
};

const erIkkeSN = () => {
    it('Er ikke selvstendig næringsdrivende', () => {
        gotoStep('arbeidssituasjon');
        fyllUtArbeidssituasjonErIkkeSelvstendig();
        gåTilOppsummeringFraArbeidssituasjon();
        const el = getTestElement('arbeidssituasjon-sn');
        el.should('contain', 'Er ikke selvstendig næringsdrivende i perioden det søkes for');
    });
};

const erSN = () => {
    it('Er selvstendig næringsdrivende', () => {
        gotoStep('arbeidssituasjon');
        fyllUtArbeidssituasjonErSelvstendig();
        clickFortsett();
        getTestElement('arbeidIPerioden_selvstendig').within(() => {
            fyllUtArbeidstidJobberIkke();
        });
        gåTilOppsummeringFraArbeidIPerioden();

        const el = getTestElement('arbeidssituasjon-sn');
        el.should('contain', 'Er selvstendig næringsdrivende i perioden');
        el.should('contain', 'Har flere virksomheter');
        el.should('contain', 'Jobber normalt 5 timer per uke');
        el.should('contain', `Navn: ${virksomhet.navn}`);
        el.should('contain', `Næringstype: Jordbruker.`);
        el.should('contain', `Startet ${virksomhet.fraOgMed}, avsluttet ${virksomhet.tilOgMed}.`);
    });
};

export const testArbeidssituasjonSN = () => {
    describe('Arbeidssituasjon selvstendig næringsdrivende', () => {
        erIkkeSN();
        erSN();
    });
};
