import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { DeltakelsePeriode } from '../../../types/DeltakelsePeriode';
import { SøkYtelseOppgave } from '../../../types/Oppgave';

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

export type KontonummerOppslagInfo = KontonummerInfo & {
    formatertKontonummer?: string;
};

export interface SøknadContextType {
    søker: Søker;
    deltakelsePeriode: DeltakelsePeriode;
    søknadOppgave: SøkYtelseOppgave;
    svar: SøknadSvar;
    søknadStartet: boolean;
    søknadSendt: boolean;
    kontonummerInfo: KontonummerOppslagInfo;
    barn: RegistrertBarn[];
    setSpørsmålSvar: (key: Spørsmål, value: unknown) => void;
    setSøknadSendt: () => void;
    startSøknad: (bekrefter: true) => void;
    avbrytOgSlett: () => void;
}
