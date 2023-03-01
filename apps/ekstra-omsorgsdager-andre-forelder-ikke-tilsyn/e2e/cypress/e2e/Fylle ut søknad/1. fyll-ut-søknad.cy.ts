import { contextConfig } from '../contextConfig';
import { utfyllingUtils } from '../utils/utfyllingUtils';

const {
    startSøknad,
    sendInnSøknad,
    fyllOmAnnenForelder,
    fyllOmAnnenForelderSituasjon,
    fyllUtOmBarn,
    kontrollerKvittering,
    kontrollerOppsummering,
} = utfyllingUtils;

const startUrl =
    'http://localhost:8080/familie/sykdom-i-familien/soknad/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/soknad/velkommen';

describe('Fylle ut søknad', () => {
    contextConfig({ barn: [] });

    describe('Med ingen registrerte barn', () => {
        before(() => {
            cy.visit(startUrl);
        });
        startSøknad();
        fyllOmAnnenForelder();
        fyllOmAnnenForelderSituasjon();
        fyllUtOmBarn();
        kontrollerOppsummering();
        sendInnSøknad();
        kontrollerKvittering();
    });
});
