import { ArbeidsgivereSøknadsdata } from './arbeidAnsattSøknadsdata';
import { ArbeidFrilansSøknadsdata } from './arbeidFrilansSøknadsdata';
import { ArbeidSelvstendigSøknadsdata } from './arbeidSelvstendigSøknadsdata';
import { OpptjeningUtlandSøknadsdata } from './opptjeningUtlandSøknadsdata';
import { UtenlandskNæringSøknadsdata } from './utenlandskNæringSøknadsdata';

export interface ArbeidSøknadsdata {
    arbeidsgivere?: ArbeidsgivereSøknadsdata;
    frilans?: ArbeidFrilansSøknadsdata;
    selvstendig?: ArbeidSelvstendigSøknadsdata;
    opptjeningUtland?: OpptjeningUtlandSøknadsdata;
    utenlandskNæring?: UtenlandskNæringSøknadsdata;
}
