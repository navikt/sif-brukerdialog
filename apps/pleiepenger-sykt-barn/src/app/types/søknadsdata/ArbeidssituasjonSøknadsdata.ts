import { ArbeidssituasjonAnsattSøknadsdata } from './ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidssituasjonFrilansSøknadsdata } from './ArbeidssituasjonFrilansSøknadsdata';
import { ArbeidssituasjonSelvstendigSøknadsdata } from './ArbeidssituasjonSelvstendigSøknadsdata';
import { OpptjeningUtlandSøknadsdata } from './OpptjeningUtlandSøknadsdata';
import { UtenlandskNæringSøknadsdata } from './UtenlandskNæringSøknadsdata';

export type ArbeidssituasjonSøknadsdata = {
    arbeidsgivere: ArbeidssituasjonAnsattSøknadsdata[];
    frilans?: ArbeidssituasjonFrilansSøknadsdata;
    selvstendig?: ArbeidssituasjonSelvstendigSøknadsdata;
    opptjeningUtland?: OpptjeningUtlandSøknadsdata;
    utenlandskNæring?: UtenlandskNæringSøknadsdata;
};
