import { ArbeidsgivereSøknadsdata } from './ArbeidAnsattSøknadsdata';
import { ArbeidFrilansSøknadsdata, FrilanserSøknadsdata } from './ArbeidFrilansSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from './ArbeidSelvstendigSøknadsdata';
import { OpptjeningUtlandSøknadsdata } from './OpptjeningUtlandSøknadsdata';
import { UtenlandskNæringSøknadsdata } from './UtenlandskNæringSøknadsdata';

export interface ArbeidSøknadsdata {
    arbeidsgivere?: ArbeidsgivereSøknadsdata;
    frilans?: ArbeidFrilansSøknadsdata;
    frilansNy?: FrilanserSøknadsdata;
    selvstendig?: ArbeidSelvstendigSøknadsdata;
    opptjeningUtland?: OpptjeningUtlandSøknadsdata;
    utenlandskNæring?: UtenlandskNæringSøknadsdata;
}
