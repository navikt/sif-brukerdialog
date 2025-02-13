import { RegistrertBarn, Søker } from '@navikt/sif-common-api';
import { ArbeidstidFormValues } from '../søknad/steps/arbeidstid/ArbeidstidStep';
import { Arbeidsgiver } from './Arbeidsgiver';
import { KvitteringInfo } from './KvitteringInfo';
import { StepId } from './StepId';
import { SøknadRoutes } from './SøknadRoutes';
import { Søknadsdata } from './søknadsdata/Søknadsdata';
import { Institusjon } from '../api/institusjonService';

export type ArbeidstidStepTempFormValues = {
    stepId: StepId.ARBEIDSTID;
    values: Partial<ArbeidstidFormValues>;
};

export type TempFormValues = ArbeidstidStepTempFormValues | undefined;

export interface SøknadContextState {
    versjon: string;
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    institusjoner: Institusjon[];
    frilansoppdrag?: Arbeidsgiver[];
    søknadsdata: Søknadsdata;
    tempFormData?: TempFormValues;
    kvitteringInfo?: KvitteringInfo;
    søknadRoute?: SøknadRoutes;
    søknadSendt?: boolean;
    børMellomlagres?: boolean;
}
