import { RegistrertBarn } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { prettifyDate } from '@navikt/sif-common-utils';
import { AppIntlShape } from '../../../i18n';
import { OmBarnaSøknadsdata } from '../../../types/søknadsdata/OmBarnaSøknadsdata';
import { Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmBarnaFormValues } from './OmBarnaStep';

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

export const barnItemLabelRenderer = (barnet: RegistrertBarn, { text }: AppIntlShape) => (
    <div style={{ display: 'flex' }}>
        <span style={{ order: 1 }}>
            {text('step.omBarna.født')} {prettifyDate(barnet.fødselsdato)}
        </span>
        <span style={{ order: 2, paddingLeft: '1rem', justifySelf: 'flex-end' }}>
            {formatName(barnet.fornavn, barnet.etternavn, barnet.mellomnavn)}
        </span>
    </div>
);
