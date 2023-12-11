import { contextConfig } from '../contextConfig';
import { fyllUtArbeidssituasjonEnkelt } from '../utils/arbeidssituasjon';
import { fyllUtArbeidstidToMånederEnArbeidsgiver } from '../utils/arbeidstid';
import { fyllUtLegeerklæringSteg } from '../utils/legeerklæring';
import { fyllUtMedlemskapSteg } from '../utils/medlemskap';
import { kontrollerOppsummering } from '../utils/oppsummering';
import { fyllUtOpplysningerOmPleietrengende } from '../utils/pleietrengende';
import { fyllUtPeriodenEnkeltKalender } from '../utils/tidsrom';
import { startSøknad } from '../utils/velkommen';

const startUrl =
    'http://localhost:8080/familie/sykdom-i-familien/soknad/pleiepenger-i-livets-sluttfase/soknad/velkommen';

describe('Fylle ut søknad pleietrengende med fnr', () => {
    contextConfig();

    describe('Pleietrengende med fnr', () => {
        before(() => {
            cy.visit(startUrl);
        });
        it('Starter applikasjonen', () => {
            cy.get('h1').contains('Hei PRESENTABEL', { timeout: 10000 }).should('be.visible');
        });

        startSøknad();
        fyllUtOpplysningerOmPleietrengende();
        fyllUtPeriodenEnkeltKalender();
        fyllUtArbeidssituasjonEnkelt();
        fyllUtArbeidstidToMånederEnArbeidsgiver();
        fyllUtMedlemskapSteg();
        fyllUtLegeerklæringSteg('komplett');
        kontrollerOppsummering('komplett');
    });
});
