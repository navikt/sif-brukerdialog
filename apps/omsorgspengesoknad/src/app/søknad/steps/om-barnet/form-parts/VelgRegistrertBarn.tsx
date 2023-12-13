import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import { OmBarnetFormFields, OmBarnetFormValues } from '../OmBarnetStep';
import { mapBarnTilRadioProps } from '../omBarnetStepUtils';

interface Props {
    registrerteBarn: RegistrertBarn[];
    søknadenGjelderEtAnnetBarn?: boolean;
}

const { RadioGroup, Checkbox } = getTypedFormComponents<OmBarnetFormFields, OmBarnetFormValues>();

const VelgRegistrertBarn: React.FunctionComponent<Props> = ({ registrerteBarn, søknadenGjelderEtAnnetBarn }) => {
    const intl = useIntl();
    return (
        <>
            <Heading level="2" size="medium">
                {intlHelper(intl, 'steg.omBarnet.hvilketBarn.spm')}
            </Heading>
            <FormBlock margin="l">
                <RadioGroup
                    legend={intlHelper(intl, 'steg.omBarnet.hvilketBarn.registrerteBarn')}
                    description={intlHelper(intl, 'steg.omBarnet.hvilketBarn.info')}
                    name={OmBarnetFormFields.barnetSøknadenGjelder}
                    radios={registrerteBarn.map((barn) => mapBarnTilRadioProps(barn, søknadenGjelderEtAnnetBarn))}
                    validate={søknadenGjelderEtAnnetBarn ? undefined : getRequiredFieldValidator()}
                />
            </FormBlock>
            <FormBlock margin="l">
                <Checkbox
                    label={intlHelper(intl, 'steg.omBarnet.gjelderAnnetBarn')}
                    name={OmBarnetFormFields.søknadenGjelderEtAnnetBarn}
                />
            </FormBlock>
        </>
    );
};

export default VelgRegistrertBarn;
