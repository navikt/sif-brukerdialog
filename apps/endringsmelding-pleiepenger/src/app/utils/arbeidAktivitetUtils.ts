import { ArbeidAktivitet, ArbeidAktiviteter, ArbeidAktivitetType } from '../types/Sak';

export const getArbeidAktivitetNavn = (arbeidAktivitet: ArbeidAktivitet): string => {
    switch (arbeidAktivitet.type) {
        case ArbeidAktivitetType.arbeidstaker:
            return arbeidAktivitet.arbeidsgiver.navn;
        case ArbeidAktivitetType.frilanser:
            return 'Frilanser';
        case ArbeidAktivitetType.selvstendigNæringsdrivende:
            return 'Selvstendig næringsdrivende';
    }
};

export const getAktiviteterSomKanEndres = ({
    arbeidstakerArktiviteter,
    frilanser,
    selvstendigNæringsdrivende,
}: ArbeidAktiviteter): ArbeidAktivitet[] => {
    const aktiviteter: ArbeidAktivitet[] = [...arbeidstakerArktiviteter];
    if (frilanser) {
        aktiviteter.push(frilanser);
    }
    if (selvstendigNæringsdrivende) {
        aktiviteter.push(selvstendigNæringsdrivende);
    }
    return aktiviteter;
};
