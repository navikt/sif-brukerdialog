import { ArbeidsgivereSøknadsdata } from './ArbeidAnsattSøknadsdata';
import { FrilanserSøknadsdata } from './ArbeidFrilansSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from './ArbeidSelvstendigSøknadsdata';
import { OpptjeningUtlandSøknadsdata } from './OpptjeningUtlandSøknadsdata';
import { UtenlandskNæringSøknadsdata } from './UtenlandskNæringSøknadsdata';

export interface ArbeidSøknadsdata {
    arbeidsgivere?: ArbeidsgivereSøknadsdata;
    frilanser?: FrilanserSøknadsdata;
    selvstendig?: ArbeidSelvstendigSøknadsdata;
    opptjeningUtland?: OpptjeningUtlandSøknadsdata;
    utenlandskNæring?: UtenlandskNæringSøknadsdata;
}
