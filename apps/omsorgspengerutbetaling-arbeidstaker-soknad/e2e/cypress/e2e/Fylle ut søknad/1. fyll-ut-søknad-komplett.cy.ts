import { utfyllingUtils } from '../utils/utfyllingUtils';

const { startSøknad } = utfyllingUtils;

const startUrl =
    'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling-arbeidstaker/soknad/velkommen';

describe('Fylle ut søknad komplett', () => {
    describe('Komplett søknad', () => {
        before(() => {
            cy.visit(startUrl);
        });
        startSøknad();
    });
});
