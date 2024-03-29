import 'cypress-axe';
import { contextConfig, gotoArbeidssituasjonStep } from '../integration-utils/contextConfig';
import { mellomlagring } from '../integration-utils/mocks/mellomlagring';
import { testArbeidssituasjonAnsatt } from '../integration-utils/steps/arbeidssituasjon/ansatt';
import { testArbeidssituasjonFrilanser } from '../integration-utils/steps/arbeidssituasjon/frilanser';
import { testArbeidssituasjonOpptjeningUtland } from '../integration-utils/steps/arbeidssituasjon/opptjeningUtland';
import { testArbeidssituasjonSN } from '../integration-utils/steps/arbeidssituasjon/selvstendigNæringsdrivende';
import { testArbeidssituasjonUtenlandskNæring } from '../integration-utils/steps/arbeidssituasjon/utenlandskNæring';
import { getSøknadsperiode } from '../integration-utils/utils';

import dayjs = require('dayjs');

export const getMellomlagringForArbeidssituasjonerTest = () => {
    const søknadsperiode = getSøknadsperiode();
    mellomlagring.formValues.periodeFra = dayjs(søknadsperiode.from).format('YYYY-MM-DD');
    mellomlagring.formValues.periodeTil = dayjs(søknadsperiode.to).format('YYYY-MM-DD');
    return mellomlagring;
};

describe('Arbeidssituasjoner', () => {
    const datojustertMellomlagring = getMellomlagringForArbeidssituasjonerTest(); //{ ...mellomlagring };

    contextConfig({ mellomlagring: datojustertMellomlagring });
    beforeEach(() => {
        gotoArbeidssituasjonStep();
    });
    testArbeidssituasjonAnsatt();
    testArbeidssituasjonFrilanser();
    testArbeidssituasjonSN();
    testArbeidssituasjonUtenlandskNæring();
    testArbeidssituasjonOpptjeningUtland();
});
