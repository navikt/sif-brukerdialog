import { contextConfig } from '../integration-utils/contextConfig';
import { testArbeidssituasjonAnsatt } from '../integration-utils/steps/arbeidssituasjon/ansatt';
import { testArbeidssituasjonFrilanser } from '../integration-utils/steps/arbeidssituasjon/frilanser';
// import { mellomlagring } from '../integration-utils/mocks/mellomlagring';
import { testArbeidssituasjonSN } from '../integration-utils/steps/arbeidssituasjon/selvstendigNæringsdrivende';
import { testArbeidssituasjonUtenlandskNæring } from '../integration-utils/steps/arbeidssituasjon/utenlandskNæring';
import { testArbeidssituasjonOpptjeningUtland } from '../integration-utils/steps/arbeidssituasjon/opptjeningUtland';
import { fyllUtVelkommenSide } from '../integration-utils/steps/velkommenside';
import { fyllUtOmBarnSteg } from '../integration-utils/steps/opplysningerOmBarnet';
import { fyllUtPeriodeSteg } from '../integration-utils/steps/periode';

describe('Arbeidssituasjoner', () => {
    contextConfig();

    it('henter mellomlagring og annen info', () => {
        cy.wait(['@getMellomlagring', '@getSøker', '@getBarn']);
    });

    beforeEach(() => {
        fyllUtVelkommenSide();
        fyllUtOmBarnSteg();
        fyllUtPeriodeSteg();
    });

    testArbeidssituasjonAnsatt();
    testArbeidssituasjonFrilanser();
    testArbeidssituasjonSN();
    testArbeidssituasjonUtenlandskNæring();
    testArbeidssituasjonOpptjeningUtland();
});
