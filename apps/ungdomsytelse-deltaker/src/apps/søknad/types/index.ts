import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { DeltakelsePeriode } from '@navikt/ung-common';

export enum Steg {
    'KONTONUMMER' = 'kontonummer',
    'BARN' = 'barn',
    'OPPSUMMERING' = 'oppsummering',
}

export enum Spørsmål {
    FORSTÅR_PLIKTER = 'harForståttRettigheterOgPlikter',
    KONTONUMMER = 'kontonummer',
    BARN = 'barn',
}

export type SøknadSvar = {
    [Spørsmål.FORSTÅR_PLIKTER]?: boolean;
    [Spørsmål.KONTONUMMER]?: YesOrNo;
    [Spørsmål.BARN]?: YesOrNo;
};

export interface SøknadContextType {
    søker: Søker;
    deltakelsePeriode: DeltakelsePeriode;
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
