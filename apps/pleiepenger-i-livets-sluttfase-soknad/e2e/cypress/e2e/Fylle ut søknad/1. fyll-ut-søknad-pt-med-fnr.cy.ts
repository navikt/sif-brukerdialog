import { contextConfig } from '../contextConfig';
import { fyllUtLegeerklæringSteg } from '../utils/legeerklæring';
// import { fyllUtMedlemskapSteg } from '../utils/medlemskap';
// import { kontrollerOppsummering } from '../utils/oppsummering';
import { utfyllingUtils } from '../utils/utfyllingUtils';

const { startSøknad, fyllUtOpplysningerOmPleietrengende } = utfyllingUtils;

const startUrl =
    'http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger-i-livets-sluttfase/soknad/velkommen';

describe('Fylle ut søknad pleietrengende med fnr', () => {
    contextConfig();

    describe('Pleietrengende med fnr', () => {
        before(() => {
            cy.visit(startUrl);
        });
        startSøknad();
        fyllUtOpplysningerOmPleietrengende();
        fyllUtLegeerklæringSteg('komplett');
        // fyllUtPeriodenEnkelt();
        // fyllUtArbeidssituasjonEnkelt();
        // fyllUtMedlemskapSteg('komplett');
        // kontrollerOppsummering('komplett');
    });
});
