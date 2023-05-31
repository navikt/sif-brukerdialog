import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { Duration } from '@navikt/sif-common-utils/lib';
import { RegistrerteBarn } from './RegistrerteBarn';
import { SøknadFormValues } from './SøknadFormValues';

export enum SøknadsimportEndringstype {
    'endretUtenlandskNæring' = 'endretUtenlandskNæring',
    'endretOpptjeningUtlandet' = 'endretOpptjeningUtlandet',
    'endretBostedUtland' = 'endretBostedUtland',
}

export type SøknadsimportEndring = {
    type: SøknadsimportEndringstype;
};

export interface AnsattNormalarbeidstidSnitt {
    id: string;
    timerISnitt: Duration;
}

export interface ImportertSøknadMetadata {
    søknadId: string;
    mottatt: Date;
    søknadsperiode: DateRange;
    endringer: SøknadsimportEndring[];
    barn: RegistrerteBarn;
    ansattNormalarbeidstidSnitt?: AnsattNormalarbeidstidSnitt[];
}

export type ImportertSøknad = {
    metaData: ImportertSøknadMetadata;
    formValues: SøknadFormValues;
};
