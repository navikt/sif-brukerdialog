import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { BostedUtland } from '@navikt/sif-common-forms-ds';
import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

export enum Steg {
    'KONTONUMMER' = 'kontonummer',
    'BARN' = 'barn',
    'BOSTED' = 'bosted',
    'MEDLEMSKAP' = 'medlemskap',
    'OPPSUMMERING' = 'oppsummering',
}

export enum Spørsmål {
    FORSTÅR_PLIKTER = 'harForståttRettigheterOgPlikter',
    KONTONUMMER = 'kontonummer',
    BOSTED = 'bosted',
    MEDLEMSKAP = 'medlemskap',
    MEDLEMSKAP_PERIODER = 'medlemskapPerioder',
    BARN = 'barn',
}

export type SøknadSvar = {
    [Spørsmål.FORSTÅR_PLIKTER]?: boolean;
    [Spørsmål.KONTONUMMER]?: YesOrNo;
    [Spørsmål.BOSTED]?: YesOrNo;
    [Spørsmål.MEDLEMSKAP]?: YesOrNo;
    [Spørsmål.MEDLEMSKAP_PERIODER]?: BostedUtland[];
    [Spørsmål.BARN]?: YesOrNo;
};

export type KontonummerOppslagInfo = Omit<KontonummerInfo, 'kontonummerErRiktig'> & {
    formatertKontonummer?: string;
};

export interface SøknadContextType {
    søknadsdata: {
        svar: SøknadSvar;
        søknadStartet: boolean;
        søknadSendt: boolean;
    };
    søker: Søker;
    kontonummerInfo: KontonummerOppslagInfo;
    registrerteBarn: RegistrertBarn[];
    setSpørsmålSvar: (key: Spørsmål, value: unknown) => void;
    setSøknadSendt: () => void;
    startSøknad: (bekrefter: true) => void;
    avbrytOgSlett: () => void;
}
