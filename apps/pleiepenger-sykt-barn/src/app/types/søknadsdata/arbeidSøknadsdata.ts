import { ArbeidsgivereSøknadsdata } from './arbeidAnsattSøknadsdata';
import { FrilanserSøknadsdata } from './arbeidFrilansSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from './arbeidSelvstendigSøknadsdata';
import { OpptjeningUtlandSøknadsdata } from './OpptjeningUtlandSøknadsdata';
import { UtenlandskNæringSøknadsdata } from './UtenlandskNæringSøknadsdata';

export interface ArbeidSøknadsdata {
    arbeidsgivere?: ArbeidsgivereSøknadsdata;
    frilanser?: FrilanserSøknadsdata;
    selvstendig?: ArbeidSelvstendigSøknadsdata;
    opptjeningUtland?: OpptjeningUtlandSøknadsdata;
    utenlandskNæring?: UtenlandskNæringSøknadsdata;
}
