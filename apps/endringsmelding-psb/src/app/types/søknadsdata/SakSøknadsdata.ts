import { Arbeidsgiver } from '../Arbeidsgiver';

export interface SakSøknadsdata {
    arbeidsgivere: Arbeidsgiver[];
    erFrilanser: boolean;
    erSelvstendigNæringsdrivende: boolean;
}
