import { testArbeidssituasjonAnsatt } from '../integration-utils/steps/arbeidssituasjon/ansatt';
import { testArbeidssituasjonFrilanser } from '../integration-utils/steps/arbeidssituasjon/frilanser';
import { testArbeidssituasjonOpptjeningUtland } from '../integration-utils/steps/arbeidssituasjon/opptjeningUtland';
import { testArbeidssituasjonSN } from '../integration-utils/steps/arbeidssituasjon/selvstendigNæringsdrivende';
import { testArbeidssituasjonUtenlandskNæring } from '../integration-utils/steps/arbeidssituasjon/utenlandskNæring';

describe('Arbeidssituasjoner', () => {
    testArbeidssituasjonAnsatt();
    testArbeidssituasjonFrilanser();
    testArbeidssituasjonSN();
    testArbeidssituasjonUtenlandskNæring();
    testArbeidssituasjonOpptjeningUtland();
});
