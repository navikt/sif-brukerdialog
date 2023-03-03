import { contextConfig } from '../../contextConfig';
import { enArbeidsgiverMock } from '../../data/enArbeidsgiverMock';
import { enSakSN } from '../../data/enSakSN';
import { flereSakerMock } from '../../data/flereSakerMock';
import { ugyldigK9FormatSakMock } from '../../data/ugyldigK9FormatSakMock';
import { getTestElement } from '../../utils';

const startUrl = 'http://localhost:8080';

describe('Bruker har ikke tilgang til løsningen', () => {
    describe('Ugyldig k9format på sak', () => {
        contextConfig({ saker: [ugyldigK9FormatSakMock], arbeidsgivere: enArbeidsgiverMock });
        it('Viser riktig melding når bruker sak med ukjent format', () => {
            cy.visit(startUrl);
            cy.wait(['@getSak', '@getSoker', '@getMellomlagring']).then(() => {
                expect(getTestElement('ingen-tilgang-heading').first().contains('Hei STERK'));
                expect(getTestElement('ugyldigK9FormatSak')).to.exist;
            });
        });
    });
    describe('Ingen sak funnet', () => {
        contextConfig({ saker: [], arbeidsgivere: enArbeidsgiverMock });
        it('Viser riktig melding når bruker ikke har sak', () => {
            cy.visit(startUrl);
            cy.wait(['@getSak', '@getSoker', '@getMellomlagring']).then(() => {
                expect(getTestElement('ingen-tilgang-heading').first().contains('Hei STERK'));
                expect(getTestElement('ingenSak')).to.exist;
            });
        });
    });
    describe('Flere saker', () => {
        contextConfig({ saker: flereSakerMock, arbeidsgivere: enArbeidsgiverMock });
        it('Viser riktig melding når bruker har flere saker', () => {
            cy.visit(startUrl);
            cy.wait(['@getSak', '@getArbeidsgiver', '@getSoker', '@getMellomlagring']).then(() => {
                expect(getTestElement('ingen-tilgang-heading').first().contains('Hei STERK'));
                expect(getTestElement('flereSaker')).to.exist;
            });
        });
    });
    describe('Er SN', () => {
        contextConfig({ saker: enSakSN, arbeidsgivere: enArbeidsgiverMock });
        it('Viser riktig melding når bruker har flere saker', () => {
            cy.visit(startUrl);
            cy.wait(['@getSak', '@getArbeidsgiver', '@getSoker', '@getMellomlagring']).then(() => {
                expect(getTestElement('ingen-tilgang-heading').first().contains('Hei STERK'));
                expect(getTestElement('erSN')).to.exist;
            });
        });
    });
});
