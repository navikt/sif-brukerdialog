import { kontonummerStegMessages_nb } from './nb';

export const kontonummerStegMessages_nn: Record<keyof typeof kontonummerStegMessages_nb, string> = {
    'kontonummerSteg.tittel': 'Kontonummer for utbetaling',
    'kontonummerSteg.beskrivelse':
        'For å få pengane inn på bankkontoen din, må du ha registrert kontonummeret ditt hos Nav.',
    'kontonummerSteg.kontonummer.spm': 'Er kontonummeret ditt {kontonummer}?',
    'kontonummerSteg.kontonummer.ja.label': 'Ja',
    'kontonummerSteg.kontonummer.nei.label': 'Nei',
    'kontonummerSteg.validation.kontonummerErRiktig.yesOrNoIsUnanswered': 'Du må svare på om kontonummeret stemmer',
    'kontonummerSteg.kontonummer.stemmerIkke.info':
        'Gå til <Lenke>personopplysningar på Min side</Lenke> for å endre kontonummeret ditt.',
    'kontonummerSteg.kontonummer.stemmerIkke.info.2':
        'Vi rår deg til å endre kontonummeret ditt før du sender inn søknaden, slik at pengane blir sette inn på kontoen din.',
    'kontonummerSteg.harIkkeKontonummer.info.1': 'Du har ikkje registrert kontonummer hos oss',
    'kontonummerSteg.harIkkeKontonummer.info.2':
        'Registrer bankkontonummeret ditt hos Nav slik at du får pengane utbetalt til rett konto. Gå til <Lenke>personopplysningar på Min side</Lenke> for å leggje inn kontonummeret ditt.',
    'kontonummerSteg.harIkkeKontonummer.info.3':
        'Du kan framleis sende inn søknaden, men vi rår deg til å leggje inn kontonummeret med ein gong slik at pengane ikkje blir forseinka.',
    'kontonummerSteg.kontonummerInfoMangler.info.1': 'Vi klarer ikkje sjå om du har kontonummer hos oss',
    'kontonummerSteg.kontonummerInfoMangler.info.2':
        'For at du skal få utbetalt pengane til rett konto, er det viktig at du har registrert kontonummeret ditt. Gå til <Lenke>personopplysningar på Min side</Lenke> for å sjekke dette.',
    'kontonummerSteg.kontonummerInfoMangler.info.3':
        'Du kan framleis sende inn søknaden, men vi rår deg til å sjekke kontonummeret med ein gong slik at pengane ikkje blir forseinka.',
};
