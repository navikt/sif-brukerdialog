import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { DeltakelsePeriode } from '@shared/types/DeltakelsePeriode';
import { SøkYtelseOppgave } from '@shared/types/Oppgave';
import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';
import { UtvidetKontonummerInfo } from '@sif/api/ung-deltaker';

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
    søknadOppgave: SøkYtelseOppgave;
    svar: SøknadSvar;
    søknadStartet: boolean;
    søknadSendt: boolean;
    kontonummerInfo: UtvidetKontonummerInfo;
    barn: RegistrertBarn[];
    setSpørsmålSvar: (key: Spørsmål, value: unknown) => void;
    setSøknadSendt: () => void;
    startSøknad: (bekrefter: true) => void;
    avbrytOgSlett: () => void;
}
