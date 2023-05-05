import { contextConfig } from '../contextConfig';
import { utfyllingUtils } from '../utils/utfyllingUtils';

const {
    startSøknad,
    fyllOmAleneomsorgForBarn,
    fyllTidspunktForAleneomsorg,
    sendInnSøknad,
    kontrollerKvittering,
    //kontrollerOppsummering,
} = utfyllingUtils;

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgsdager-aleneomsorg/soknad/velkommen';

describe('Fylle ut søknad', () => {
    contextConfig({ barn: [] });

    describe('Enkelt', () => {
        before(() => {
            cy.visit(startUrl);
        });
        startSøknad();
        fyllOmAleneomsorgForBarn();
        fyllTidspunktForAleneomsorg();
        sendInnSøknad();
        kontrollerKvittering();
    });
});
