import { contextConfig } from '../contextConfig';
import { cyApiMockData } from '../data/cyApiMockData';
import { fyllUtFraværSteg } from '../utils/fravær';
import { fyllUtLegeerklæringSteg } from '../utils/legeerklæring';
import { fyllUtMedlemskapSteg } from '../utils/medlemskap';
import { kontrollerOppsummering } from '../utils/oppsummering';
import { fyllUtSituasjonSteg } from '../utils/situasjon';
import { utfyllingUtils } from '../utils/utfyllingUtils';

const { startSøknad } = utfyllingUtils;

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspengerutbetaling-arbeidstaker';

describe('Fylle ut søknad komplett', () => {
    const barn = cyApiMockData.barnMock.barn[4];
    contextConfig({ barn: [barn] });
    describe('Komplett søknad', () => {
        before(() => {
            cy.visit(startUrl);
        });
        startSøknad();
        utfyllingUtils.fyllUtOmBarn();
        fyllUtSituasjonSteg();
        fyllUtFraværSteg();
        fyllUtLegeerklæringSteg('komplett');
        fyllUtMedlemskapSteg('komplett');
        kontrollerOppsummering('komplett');
    });
});
