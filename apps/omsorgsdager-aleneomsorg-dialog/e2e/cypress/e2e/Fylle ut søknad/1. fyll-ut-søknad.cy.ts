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

describe('Fylle ut søknad', () => {
    contextConfig({ barn: [] });

    describe('Enkelt', () => {
        startSøknad();
        fyllOmAleneomsorgForBarn();
        fyllTidspunktForAleneomsorg();
        sendInnSøknad();
        kontrollerKvittering();
    });
});
