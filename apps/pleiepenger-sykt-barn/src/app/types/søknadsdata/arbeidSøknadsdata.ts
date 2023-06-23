import { ArbeidsgivereSøknadsdata } from './ArbeidAnsattSøknadsdata';
import { ArbeidFrilansSøknadsdata } from './ArbeidFrilansSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from './ArbeidSelvstendigSøknadsdata';
import { OpptjeningUtlandSøknadsdata } from './OpptjeningUtlandSøknadsdata';
import { UtenlandskNæringSøknadsdata } from './UtenlandskNæringSøknadsdata';

export interface ArbeidSøknadsdata {
    arbeidsgivere?: ArbeidsgivereSøknadsdata;
    frilans?: ArbeidFrilansSøknadsdata;
    selvstendig?: ArbeidSelvstendigSøknadsdata;
    opptjeningUtland?: OpptjeningUtlandSøknadsdata;
    utenlandskNæring?: UtenlandskNæringSøknadsdata;
}
