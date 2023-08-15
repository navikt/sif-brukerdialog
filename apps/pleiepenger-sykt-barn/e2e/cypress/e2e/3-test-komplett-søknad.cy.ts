import 'cypress-axe';
import { contextConfig } from '../integration-utils/contextConfig';
import { fyllUtKomplettSøknad } from '../integration-utils/fyll-ut-søknad';
import { kvittering } from '../integration-utils/steps/kvittering';
import { oppsummeringTestLegeerklæringSteg } from '../integration-utils/steps/legeerklæring';
import { oppsummeringTestMedlemskapSteg } from '../integration-utils/steps/medlemskap';
import { oppsummeringTestNattevåkOgBeredskapSteg } from '../integration-utils/steps/nattevåkOgBeredskap';
import { oppsummeringTestOmDeg } from '../integration-utils/steps/omDegOppsummering';
import { oppsummeringTestOmsorgstilbudSteg } from '../integration-utils/steps/omsorgstilbud';
import { oppsummeringTestOmBarn } from '../integration-utils/steps/opplysningerOmBarnet';
import { oppsummeringTestPeriodeSteg } from '../integration-utils/steps/periode';
import { TestType } from '../integration-utils/types/TestTyper';

const TEST_TYPE = TestType.KOMPLETT;

describe('Kan jeg klikke meg komplett gjennom en hele søknad ', () => {
    context('med utmocket, tom mellomlagring', () => {
        contextConfig();
        fyllUtKomplettSøknad();

        it('STEG 9: Oppsummering - test', () => {
            oppsummeringTestOmDeg();
            oppsummeringTestOmBarn(TEST_TYPE);
            oppsummeringTestPeriodeSteg(TEST_TYPE);
            oppsummeringTestOmsorgstilbudSteg(TEST_TYPE);
            oppsummeringTestNattevåkOgBeredskapSteg(TEST_TYPE);
            oppsummeringTestMedlemskapSteg(TEST_TYPE);
            oppsummeringTestLegeerklæringSteg(TEST_TYPE);
        });

        kvittering();
    });
});
