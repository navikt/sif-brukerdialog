import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { SøkYtelseOppgave } from '../../../types/Oppgave';
import { DeltakelsePeriode } from '../../../types/DeltakelsePeriode';

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

export type KontonummerInfo =
    | {
          harKontonummer: true;
          kontonummerFraRegister: string;
          formatertKontonummer?: string;
      }
    | {
          harKontonummer: false;
      }
    | {
          harKontonummer: undefined;
      };

export interface SøknadContextType {
    søker: Søker;
    deltakelsePeriode: DeltakelsePeriode;
    søknadOppgave: SøkYtelseOppgave;
    svar: SøknadSvar;
    søknadStartet: boolean;
    søknadSendt: boolean;
    kontonummerInfo: KontonummerInfo;
    barn: RegistrertBarn[];
    setSpørsmålSvar: (key: Spørsmål, value: unknown) => void;
    setSøknadSendt: () => void;
    startSøknad: (bekrefter: true) => void;
    avbrytOgSlett: () => void;
}
