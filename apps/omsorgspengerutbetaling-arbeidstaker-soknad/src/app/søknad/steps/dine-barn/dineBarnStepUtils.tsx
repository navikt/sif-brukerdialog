import { dateFormatter } from '@navikt/sif-common-utils';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import dayjs from 'dayjs';
import { DineBarnFormValues } from './DineBarnStep';
import { DineBarnSøknadsdata } from '../../../types/søknadsdata/DineBarnSøknadsdata';
import { FormattedMessage } from 'react-intl';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { dateToday } from '@navikt/sif-common-utils';
import './dineBarn.css';
import { RegistrertBarn } from '../../../types/RegistrertBarn';

export const nYearsAgo = (years: number): Date => {
    return dayjs(dateToday).subtract(years, 'y').startOf('year').toDate();
};

export const barnItemLabelRenderer = (registrertBarn: RegistrertBarn) => {
    return (
        <span className="dineBarn">
            <FormattedMessage
                id="step.dineBarn.født"
                values={{ dato: dateFormatter.compact(registrertBarn.fødselsdato) }}
            />

            <span className="dineBarn__navn">
                {formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn)}
            </span>
        </span>
    );
};

export const getDineBarnSøknadsdataFromFormValues = (values: DineBarnFormValues): DineBarnSøknadsdata | undefined => {
    const { andreBarn } = values;

    if (andreBarn && andreBarn.length > 0) {
        return {
            type: 'dineBarnHarAnnetBarn',
            andreBarn,
        };
    }

    return { type: 'dineBarnHarIkkeAnnetBarn' };
};

export const getDineBarnStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: DineBarnFormValues,
): DineBarnFormValues => {
    if (formValues) {
        return formValues;
    }

    const { dineBarn } = søknadsdata;

    return dineBarn && dineBarn.type === 'dineBarnHarAnnetBarn' ? { andreBarn: dineBarn.andreBarn } : { andreBarn: [] };
};
