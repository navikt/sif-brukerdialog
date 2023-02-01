import { contextConfig } from '../contextConfig';
import { utfyllingUtils } from '../utils/utfyllingUtils';

const {
    startSøknad,
    sendInnSøknad,
    fyllUtOmAnnetBarn,
    kontrollerKvittering,
    kontrollerOppsummering,
    lastOppLegeerklæring,
} = utfyllingUtils;

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspenger/soknad/velkommen';

describe('Fylle ut søknad uten registrert barn', () => {
    contextConfig({ barn: [] });

    describe('Med ingen registrerte barn', () => {
        const props = { deltBosted: true, harRegistrertBarn: false };
        before(() => {
            cy.visit(startUrl);
        });
        startSøknad();
        fyllUtOmAnnetBarn(props);
        lastOppLegeerklæring();
        kontrollerOppsummering(props);
        sendInnSøknad();
        kontrollerKvittering();
    });
});
