import { ArbeidFrilansSøknadsdata } from './ArbeidFrilansSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from './ArbeidSelvstendigSøknadsdata';
import { ArbeidsgivereSøknadsdata } from './ArbeidsgivereSøknadsdata';
import { OpptjeningUtlandSøknadsdata } from './OpptjeningUtlandSøknadsdata';
import { UtenlandskNæringSøknadsdata } from './UtenlandskNæringSøknadsdata';
import { VernepliktigSøknadsdata } from './VernepliktigSøknadsdata';

export interface ArbeidssituasjonSøknadsdata {
    arbeidsgivere?: ArbeidsgivereSøknadsdata;
    frilans: ArbeidFrilansSøknadsdata;
    selvstendig: ArbeidSelvstendigSøknadsdata;
    opptjeningUtland: OpptjeningUtlandSøknadsdata;
    utenlandskNæring: UtenlandskNæringSøknadsdata;
    vernepliktig?: VernepliktigSøknadsdata;
}
