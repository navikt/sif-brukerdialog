import { RegistrertBarn } from '@navikt/sif-common-api';
import { YesOrNo } from '@navikt/sif-common-formik-ds';

export enum Steg {
    'OPPSTART' = 'oppstart',
    'BARN' = 'barn',
    'KONTONUMMER' = 'kontonummer',
    'OPPSUMMERING' = 'oppsummering',
}

export enum Spørsmål {
    FORSTÅR_PLIKTER = 'harForståttRettigheterOgPlikter',
    OPPSTART = 'oppstart',
    BARN = 'barn',
    KONTONUMMER = 'kontonummer',
}

export type SøknadSvar = {
    [Spørsmål.FORSTÅR_PLIKTER]?: boolean;
    [Spørsmål.OPPSTART]?: YesOrNo;
    [Spørsmål.BARN]?: YesOrNo;
    [Spørsmål.KONTONUMMER]?: YesOrNo;
};

export interface SøknadContextType {
    svar: SøknadSvar;
    søknadStartet: boolean;
    søknadSendt: boolean;
    kontonummer?: string;
    barn: RegistrertBarn[];
    setSpørsmålSvar: (key: Spørsmål, value: unknown | undefined) => void;
    setSøknadSendt: (sendtInn: boolean) => void;
    startSøknad: (bekrefter: true) => void;
    avbrytOgSlett: () => void;
}
