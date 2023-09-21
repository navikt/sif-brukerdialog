import 'cypress-axe';
import { contextConfig } from '../contextConfig';
import { Søknadstype } from '../../../../src/app/types/Søknadstype';

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/ettersending';

const getSøknadstypeUrl = (søknadstype: string) => {
    return `${startUrl}/${søknadstype}`;
};

describe('Direktelenker', () => {
    contextConfig();

    it('Kommer til valg av ytelse når url ikke inneholder søknadstype', () => {
        cy.visit(startUrl);
        cy.get('legend').contains('Velg hva denne ettersendelsen gjelder').should('exist');
    });

    it('Pleiepenger for sykt barn', () => {
        cy.visit(getSøknadstypeUrl(Søknadstype.pleiepengerSyktBarn));
        cy.get('h2').contains('Ettersendelse av dokumentasjon til søknad om pleiepenger for sykt barn').should('exist');
    });
    it('Pleiepenger i livets sluttfase', () => {
        cy.visit(getSøknadstypeUrl(Søknadstype.pleiepengerLivetsSluttfase));
        cy.get('h2')
            .contains('Ettersendelse av dokumentasjon til søknad om pleiepenger i livets sluttfase')
            .should('exist');
    });
    it('Omsorgspenger - generell', () => {
        cy.visit(getSøknadstypeUrl(Søknadstype.omsorgspenger));
        cy.get('h2').contains('Ettersendelse av dokumentasjon for omsorgspenger').should('exist');
    });
    it('Omsorgspenger - kronisk syk', () => {
        cy.visit(getSøknadstypeUrl(Søknadstype.ekstraomsorgsdager));
        cy.get('h2')
            .contains('Søknad om ekstra omsorgsdager for barn som har kronisk/langvarig sykdom eller funksjonshemning')
            .should('exist');
    });
    it('Omsorgspengerutbetaling SN/Fri', () => {
        cy.visit(getSøknadstypeUrl(Søknadstype.utbetaling));
        cy.get('h2')
            .contains('Søknad om utbetaling av omsorgspenger for selvstendig næringsdrivende og frilansere')
            .should('exist');
    });
    it('Omsorgspengerutbetaling - arbeidstaker', () => {
        cy.visit(getSøknadstypeUrl(Søknadstype.utbetalingarbeidstaker));
        cy.get('h2').contains('Søknad om utbetaling av omsorgspenger når arbeidsgiver ikke utbetaler').should('exist');
    });
    it('Omsorgspengerutbetaling - regnet som alene', () => {
        cy.visit(getSøknadstypeUrl(Søknadstype.regnetsomalene));
        cy.get('h2')
            .contains('Søknad om ekstra omsorgsdager når den andre forelderen ikke kan ha tilsyn med barn')
            .should('exist');
    });
});
