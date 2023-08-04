import { ArbeidssituasjonAnsattSøknadsdata } from './_ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidssituasjonFrilansSøknadsdata } from './_ArbeidssituasjonFrilansSøknadsdata';
import { ArbeidssituasjonSelvstendigSøknadsdata } from './_ArbeidssituasjonSelvstendigSøknadsdata';
import { OpptjeningUtlandSøknadsdata } from './_OpptjeningUtlandSøknadsdata';
import { UtenlandskNæringSøknadsdata } from './_UtenlandskNæringSøknadsdata';

export type ArbeidssituasjonSøknadsdata = {
    arbeidsgivere: ArbeidssituasjonAnsattSøknadsdata[];
    frilans?: ArbeidssituasjonFrilansSøknadsdata;
    selvstendig?: ArbeidssituasjonSelvstendigSøknadsdata;
    opptjeningUtland?: OpptjeningUtlandSøknadsdata;
    utenlandskNæring?: UtenlandskNæringSøknadsdata;
};
