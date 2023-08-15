import { contextConfig } from '../integration-utils/contextConfig';
import { fyllUtEnkelSøknad } from '../integration-utils/fyll-ut-søknad';
import { kvittering } from '../integration-utils/steps/kvittering';
import { oppsummeringTestLegeerklæringSteg } from '../integration-utils/steps/legeerklæring';
import { oppsummeringTestMedlemskapSteg } from '../integration-utils/steps/medlemskap';
import { oppsummeringTestOmDeg } from '../integration-utils/steps/omDegOppsummering';
import { oppsummeringTestOmsorgstilbudSteg } from '../integration-utils/steps/omsorgstilbud';
import { oppsummeringTestOmBarn } from '../integration-utils/steps/opplysningerOmBarnet';
import { oppsummeringTestPeriodeSteg } from '../integration-utils/steps/periode';
import 'cypress-axe';

describe('Kan jeg klikke meg enkelt gjennom en hele søknad', () => {
    context('med utmocket, tom mellomlagring', () => {
        contextConfig();

        it('Går til startsiden', () => {
            cy.visit('/');
            cy.wait(['@getBarn', '@getSøker']);
        });

        fyllUtEnkelSøknad();

        it('STEG 9: Oppsummering - test', () => {
            oppsummeringTestOmDeg();
            oppsummeringTestOmBarn();
            oppsummeringTestPeriodeSteg();
            /** Oppsummeringer for arbeidssituasjon og arbeidstid kjøres som egne tester */
            oppsummeringTestOmsorgstilbudSteg();
            oppsummeringTestMedlemskapSteg();
            oppsummeringTestLegeerklæringSteg();
        });

        kvittering();
    });
});
