import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { IntlShape } from 'react-intl';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { OmBarnaSøknadsdata } from '../../../types/søknadsdata/OmBarnaSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmBarnaFormValues } from './OmBarnaStep';
import { prettifyDate } from '@navikt/sif-common-utils';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';

export const getOmBarnaStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OmBarnaFormValues,
): OmBarnaFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: OmBarnaFormValues = {
        andreBarn: [],
    };

    const { omBarna } = søknadsdata;
    if (omBarna) {
        switch (omBarna.type) {
            case 'andreBarn':
                return {
                    andreBarn: omBarna.andreBarn,
                };
        }
    }
    return defaultValues;
};

export const getOmBarnaSøknadsdataFromFormValues = (values: OmBarnaFormValues): OmBarnaSøknadsdata | undefined => {
    const { andreBarn } = values;
    return {
        type: 'andreBarn',
        andreBarn,
    };
};

export const barnItemLabelRenderer = (barnet: RegistrertBarn, intl: IntlShape) => (
    <div style={{ display: 'flex' }}>
        <span style={{ order: 1 }}>
            {intlHelper(intl, 'step.omBarna.født')} {prettifyDate(barnet.fødselsdato)}
        </span>
        <span style={{ order: 2, paddingLeft: '1rem', justifySelf: 'flex-end' }}>
            {formatName(barnet.fornavn, barnet.etternavn, barnet.mellomnavn)}
        </span>
    </div>
);
