import { Heading } from '@navikt/ds-react';
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import { OmBarnetFormFields, OmBarnetFormValues } from '../OmBarnetStep';
import { mapBarnTilRadioProps } from '../omBarnetStepUtils';
import { useAppIntl } from '../../../../i18n';

interface Props {
    registrerteBarn: RegistrertBarn[];
    søknadenGjelderEtAnnetBarn?: boolean;
}

const { RadioGroup, Checkbox } = getTypedFormComponents<OmBarnetFormFields, OmBarnetFormValues>();

const VelgRegistrertBarn: React.FunctionComponent<Props> = ({ registrerteBarn, søknadenGjelderEtAnnetBarn }) => {
    const { text } = useAppIntl();
    return (
        <>
            <Heading level="2" size="medium">
                {text('steg.omBarnet.hvilketBarn.spm')}
            </Heading>
            <FormBlock margin="l">
                <RadioGroup
                    legend={text('steg.omBarnet.hvilketBarn.registrerteBarn')}
                    description={text('steg.omBarnet.hvilketBarn.info')}
                    name={OmBarnetFormFields.barnetSøknadenGjelder}
                    radios={registrerteBarn.map((barn) => mapBarnTilRadioProps(barn, søknadenGjelderEtAnnetBarn))}
                    validate={søknadenGjelderEtAnnetBarn ? undefined : getRequiredFieldValidator()}
                />
            </FormBlock>
            <FormBlock margin="l">
                <Checkbox
                    label={text('steg.omBarnet.gjelderAnnetBarn')}
                    name={OmBarnetFormFields.søknadenGjelderEtAnnetBarn}
                />
            </FormBlock>
        </>
    );
};

export default VelgRegistrertBarn;
