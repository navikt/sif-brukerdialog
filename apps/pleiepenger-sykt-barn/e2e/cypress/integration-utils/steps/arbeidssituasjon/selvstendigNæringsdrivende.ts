import dayjs = require('dayjs');
import {
    clickFortsett,
    getInputByName,
    getSøknadsdato,
    getTestElement,
    gåTilOppsummeringFraArbeidIPerioden,
    gåTilOppsummeringFraArbeidssituasjon,
    selectRadio,
    selectRadioNo,
    selectRadioYes,
} from '../../utils';
import { fyllUtArbeidstidJobberIkke } from '../arbeid-i-periode/arbeidIPeriode';

export const fyllUtArbeidssituasjonErIkkeSelvstendig = () => {
    getTestElement('arbeidssituasjonSelvstendig').within(() => {
        selectRadioNo('selvstendig.harHattInntektSomSN');
    });
};

const virksomhet = {
    næringstype: 'JORDBRUK_SKOGBRUK',
    registrertINorge: 'yes',
    navn: 'Abc',
    organisasjonsnummer: '999263550' /** Navs orgnur */,
    fraOgMed: '01.01.2010',
    tilOgMed: getSøknadsdato().subtract(1, 'day').format('DD.MM.YYYY'),
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: 'yes',
    varigEndringINæringsinntekt_dato: getSøknadsdato().subtract(1, 'year').format('DD.MM.YYYY'),
    varigEndringINæringsinntekt_inntektEtterEndring: '100',
    varigEndringINæringsinntekt_forklaring: 'Lorem ipsum',
    harRegnskapsfører: 'no',
};

const fyllUtVirksomhetDialog = () => {
    cy.get('.formikModalForm__modal').within(() => {
        selectRadio('næringstype', virksomhet.næringstype);
        selectRadio('registrertINorge', virksomhet.registrertINorge);
        getInputByName('navnPåVirksomheten').click().type(virksomhet.navn).blur();
        getInputByName('organisasjonsnummer').click().type(virksomhet.organisasjonsnummer).blur();
        getInputByName('fom').click().type(virksomhet.fraOgMed).blur();
        getInputByName('tom').click().type(virksomhet.tilOgMed).blur();
        selectRadio(
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
        selectRadio('harRegnskapsfører', virksomhet.harRegnskapsfører);
        cy.get('button[type="submit"]').click();
    });
    getInputByName('selvstendig.arbeidsforhold.normalarbeidstid.timerPerUke').click().type('5').blur();
};

export const fyllUtArbeidssituasjonErSelvstendig = () => {
    getTestElement('arbeidssituasjonSelvstendig').within(() => {
        selectRadioYes('selvstendig.harHattInntektSomSN');
        selectRadioYes('selvstendig.harFlereVirksomheter');
        cy.get('button').contains('Registrer virksomhet').click();
    });
    fyllUtVirksomhetDialog();
};

const erIkkeSN = () => {
    it('Er ikke selvstendig næringsdrivende', () => {
        fyllUtArbeidssituasjonErIkkeSelvstendig();
        gåTilOppsummeringFraArbeidssituasjon();
        const el = getTestElement('arbeidssituasjon-sn');
        el.should('contain', 'Er ikke selvstendig næringsdrivende i perioden det søkes for');
    });
};

const erSN = () => {
    it('Er selvstendig næringsdrivende', () => {
        fyllUtArbeidssituasjonErSelvstendig();
        clickFortsett();
        cy.get('h3')
            .contains('Selvstendig næringsdrivende')
            .parent()
            .within(() => {
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
