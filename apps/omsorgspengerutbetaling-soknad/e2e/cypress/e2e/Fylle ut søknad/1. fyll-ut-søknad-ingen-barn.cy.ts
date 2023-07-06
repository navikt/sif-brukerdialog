import { contextConfig } from '../contextConfig';
import { utfyllingUtils } from '../utils/utfyllingUtils';
import { cyApiMockData } from '../data/cyApiMockData';

const {
    startSøknad,
    // sendInnSøknad,
    fyllUtOmBarnMinstEttYngre13år,
    fyllUtFraværSteg,
    // kontrollerKvittering,
    // kontrollerOppsummering,
    // lastOppLegeerklæring,
} = utfyllingUtils;

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspenger/soknad/velkommen';

describe('Fylle ut søknad med registrert barn som yngre 13 år', () => {
    const barn = cyApiMockData.barnMock.barn[4];
    contextConfig({ barn: [barn] });

    describe('Med registrerte barn', () => {
        before(() => {
            cy.visit(startUrl);
        });
        startSøknad();
        fyllUtOmBarnMinstEttYngre13år();
        fyllUtFraværSteg();
    });
});
