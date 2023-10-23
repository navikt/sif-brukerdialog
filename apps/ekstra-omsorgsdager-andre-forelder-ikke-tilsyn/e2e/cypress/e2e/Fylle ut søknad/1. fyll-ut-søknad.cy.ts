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

describe('Fylle ut søknad', () => {
    contextConfig({ barn: [] });

    describe('Med Sykdom', () => {
        startSøknad();
        fyllOmAnnenForelder();
        fyllOmAnnenForelderSituasjon();
        fyllUtOmBarn();
        kontrollerOppsummering();
        sendInnSøknad();
        kontrollerKvittering();
    });
});
