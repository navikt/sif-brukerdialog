import React from 'react';
import { ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';

type Info = {
    tittel: string;
    tekst: React.ReactNode;
};

export const getDelvisAktivtArbeidsforholdInfo = (arbeidsforholdType: ArbeidsforholdType): Info | undefined => {
    switch (arbeidsforholdType) {
        case ArbeidsforholdType.FRILANSER:
            return {
                tittel: 'Når du er frilanser deler av søknadsperioden',
                tekst: 'Du har oppgitt at du er frilanser bare deler av søknadsperioden. Da oppgir du bare informasjon om den perioden som du er frilanser.',
            };
        case ArbeidsforholdType.SELVSTENDIG:
            return {
                tittel: 'Når du er selvstendig næringsdrivende deler av søknadsperioden',
                tekst: 'Du har oppgitt at du startet som selvstendig næringsdrivende i søknadsperioden. Da oppgir du bare informasjon om den perioden som du er selvstendig næringsdrivende.',
            };
        case ArbeidsforholdType.ANSATT:
            return {
                tittel: 'Når du er ansatt deler av søknadsperioden',
                tekst: 'Du har oppgitt at du er ansatt bare deler av søknadsperioden. Da gjelder spørsmålene nedenfor kun de dagene i søknadsperioden som du er selvstendig næringdrivende.',
            };
        default:
            return undefined;
    }
};
