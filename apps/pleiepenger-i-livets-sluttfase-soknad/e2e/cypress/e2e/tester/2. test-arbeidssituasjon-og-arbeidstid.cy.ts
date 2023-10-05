import { contextConfig } from '../contextConfig';
import { kontrollerOppsummering } from '../utils/oppsummering';

const mellomlagring = require('../data/mellomlagring.json');

const startUrl =
    'http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger-i-livets-sluttfase/soknad/velkommen';

describe('Arbeidssituasjoner og arbeidstid', () => {
    contextConfig({ mellomlagring });

    describe('Ansatt - jobber ikke i perioden (mellomlagret)', () => {
        before(() => {
            cy.visit(startUrl);
        });
        kontrollerOppsummering('komplett');
    });

    describe('Ansatt - jobber delvis', () => {
        before(() => {
            cy.visit(startUrl);
        });

        kontrollerOppsummering('komplett');
    });
});
