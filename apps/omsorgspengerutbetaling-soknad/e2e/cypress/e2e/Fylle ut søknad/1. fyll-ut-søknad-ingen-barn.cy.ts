import { contextConfig } from '../contextConfig';
import { utfyllingUtils } from '../utils/utfyllingUtils';
import { cyApiMockData } from '../data/cyApiMockData';
import { fyllUtMedlemskapSteg } from '../utils/medlemskap';
import { fyllUtLegeerklæringSteg } from '../utils/legeerklæring';
import { kontrollerOppsummering } from '../utils/oppsummering';
const {
    startSøknad,
    fyllUtOmBarnMinstEttYngre13år,
    fyllUtFraværSteg,
    fyllerUtArbeidssituasjonSteg,
    fyllerUtFraværFraSteg,
    sendInnSøknad,
    kontrollerKvittering,
} = utfyllingUtils;

describe('Fylle ut søknad med registrert barn som yngre 13 år', () => {
    const barn = cyApiMockData.barnMock.barn[4];
    contextConfig({ barn: [barn] });

    describe('Med registrerte barn', () => {
        startSøknad();
        fyllUtOmBarnMinstEttYngre13år();
        fyllUtFraværSteg();
        fyllUtLegeerklæringSteg('komplett');
        fyllerUtArbeidssituasjonSteg();
        fyllerUtFraværFraSteg();
        fyllUtMedlemskapSteg('komplett');
        kontrollerOppsummering('komplett');
        sendInnSøknad();
        kontrollerKvittering();
    });
});
