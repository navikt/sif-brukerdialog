import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { ISODateToDate } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { ImportertSøknadMetadata } from '../types/ImportertSøknad';
import { InnsendtSøknadInnhold } from '../types/InnsendtSøknad';
import { SøknadFormField, SøknadFormValues } from '../types/SøknadFormValues';

export const forrigeSøknadErGyldig = (søknad: InnsendtSøknadInnhold): boolean => {
    if (dayjs(søknad.mottatt).isBefore(ISODateToDate('2022-06-01'), 'day')) {
        return false;
    }
    const maxAlderDato = dayjs().subtract(10, 'weeks');
    if (dayjs(søknad.mottatt).isBefore(maxAlderDato, 'day')) {
        return false;
    }
    return true;
};

export const søknadErBasertPåForrigeSøknad = (
    values: Partial<SøknadFormValues>,
    importertSøknadMetadata?: ImportertSøknadMetadata
): boolean => {
    return values[SøknadFormField.brukForrigeSøknad] === YesOrNo.YES && importertSøknadMetadata !== undefined;
};
