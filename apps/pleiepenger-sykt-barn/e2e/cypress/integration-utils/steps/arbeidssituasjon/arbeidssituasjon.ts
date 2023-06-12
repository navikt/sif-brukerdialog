import { TestType } from '../../types/TestTyper';
import { clickFortsett } from '../../utils';
import { fyllUtArbeidssituasjonAnsatt } from './ansatt';
import { fyllUtArbeidssituasjonErFrilanserOgFårHonorar } from './frilanser';
//import { fyllUtArbeidssituasjonFrilanser } from './frilanser';
import { fyllUtArbeidssituasjonOpptjeningUtland } from './opptjeningUtland';
import { fyllUtArbeidssituasjonErIkkeSelvstendig } from './selvstendigNæringsdrivende';
import { fyllUtArbeidssituasjonStønadGodtgjørelse } from './stønadGodtgjørelse';
import { fyllUtArbeidssituasjonUtenlandskNæring } from './utenlandskNæring';

export const fyllUtArbeidssituasjonSteg = (testType: TestType = TestType.ENKEL) => {
    it('Steg 3: Arbeidssituasjon', () => {
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
