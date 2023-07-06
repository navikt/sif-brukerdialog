import { contextConfig } from '../contextConfig';
import { utfyllingUtils } from '../utils/utfyllingUtils';

const {
    startSøknad,
    sendInnSøknad,
    fyllUtOmAnnetBarn,
    fyllUtOmBarn,
    kontrollerKvittering,
    kontrollerOppsummering,
    lastOppLegeerklæring,
} = utfyllingUtils;

const startUrl = 'http://localhost:8080/familie/sykdom-i-familien/soknad/omsorgspenger/soknad/velkommen';

describe('Fylle ut søknad med registrert barn', () => {
    contextConfig();
    describe('Med delt bosted', () => {
        const props = { deltBosted: true, harRegistrertBarn: true };
        before(() => {
            cy.visit(startUrl);
        });
        startSøknad();
        fyllUtOmBarn(props);
        lastOppLegeerklæring();
        kontrollerOppsummering(props);
        sendInnSøknad();
        kontrollerKvittering();
    });
    describe('Registrert barn med delt omsorg (ikke delt bosted)', () => {
        const props = { deltBosted: false, harRegistrertBarn: true };
        before(() => {
            cy.visit(startUrl);
        });
        startSøknad();
        fyllUtOmBarn(props);
        lastOppLegeerklæring();
        kontrollerOppsummering(props);
        sendInnSøknad();
        kontrollerKvittering();
    });
    describe('Med annet barn', () => {
        const props = { deltBosted: true, harRegistrertBarn: true };
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
