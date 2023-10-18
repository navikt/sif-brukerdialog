export interface ErIkkeFrilanser {
    type: 'erIkkeFrilanser';
    erFrilanser: false;
}

export interface FrilansPågående {
    type: 'pågående';
    erFrilanser: true;
    startdato: string;
    jobberFortsattSomFrilans: true;
    jobberNormaltTimer: number;
}

export interface FrilansSluttetISøknadsperiode {
    type: 'sluttetISøknadsperiode';
    erFrilanser: true;
    startdato: string;
    jobberFortsattSomFrilans: false;
    sluttdato: string;
    jobberNormaltTimer: number;
}

export interface FrilansSluttetFørSøknadsperiode {
    type: 'sluttetFørSøknadsperiode';
    erFrilanser: true;
    startdato: string;
    jobberFortsattSomFrilans: false;
    sluttdato: string;
}

export type ArbeidFrilansSøknadsdata =
    | ErIkkeFrilanser
    | FrilansPågående
    | FrilansSluttetISøknadsperiode
    | FrilansSluttetFørSøknadsperiode;
