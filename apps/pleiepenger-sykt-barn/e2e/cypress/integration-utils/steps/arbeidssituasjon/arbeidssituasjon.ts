import { contextConfig } from '../../contextConfig';
import { TestType } from '../../types/TestTyper';
import { clickFortsett } from '../../utils';
import { fyllUtArbeidssituasjonAnsatt } from './ansatt';
import { fyllUtArbeidssituasjonErFrilanserOgFårHonorar } from './frilanser';
//import { fyllUtArbeidssituasjonFrilanser } from './frilanser';
import { fyllUtArbeidssituasjonOpptjeningUtland } from './opptjeningUtland';
import { fyllUtArbeidssituasjonErIkkeSelvstendig } from './selvstendigNæringsdrivende';
import { fyllUtArbeidssituasjonStønadGodtgjørelse } from './stønadGodtgjørelse';
import { fyllUtArbeidssituasjonUtenlandskNæring } from './utenlandskNæring';
import { mellomlagring } from '../../mocks/mellomlagring';

export const fyllUtArbeidssituasjonSteg = (testType: TestType = TestType.ENKEL) => {
    it('Steg 3: Arbeidssituasjon', () => {
        contextConfig({ mellomlagring, step: 'arbeidssituasjon' });
        fyllUtArbeidssituasjonAnsatt();
        fyllUtArbeidssituasjonStønadGodtgjørelse(testType);
        //fyllUtArbeidssituasjonErIkkeFrilanser();
        //fyllUtArbeidssituasjonFrilanser();
        fyllUtArbeidssituasjonErFrilanserOgFårHonorar();
        fyllUtArbeidssituasjonErIkkeSelvstendig();
        fyllUtArbeidssituasjonUtenlandskNæring(testType);
        fyllUtArbeidssituasjonOpptjeningUtland(testType);
        clickFortsett();
    });
};
