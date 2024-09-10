import { Heading, VStack } from '@navikt/ds-react';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import React from 'react';
import { useAppIntl } from '../../../../i18n';
import { RegistrertBarn } from '../../../../types/RegistrertBarn';
import { OmBarnetFormFields } from '../OmBarnetStep';
import { mapBarnTilRadioProps } from '../omBarnetStepUtils';
import { omBarnetFormComponents } from '../omBarnetFormComponents';

interface Props {
    registrerteBarn: RegistrertBarn[];
    søknadenGjelderEtAnnetBarn?: boolean;
    onAnnetBarnSelected: () => void;
}

const { RadioGroup, Checkbox } = omBarnetFormComponents;

const RegistrertBarnSpørsmål: React.FunctionComponent<Props> = ({
    registrerteBarn,
    søknadenGjelderEtAnnetBarn,
    onAnnetBarnSelected,
}) => {
    const { text } = useAppIntl();

    return (
        <VStack gap="4">
            <Heading level="2" size="medium">
                {text('steg.omBarnet.hvilketBarn.spm')}
            </Heading>
            <VStack gap="2">
                <RadioGroup
                    legend={text('steg.omBarnet.hvilketBarn.registrerteBarn')}
                    description={text('steg.omBarnet.hvilketBarn.info')}
                    name={OmBarnetFormFields.barnetSøknadenGjelder}
                    radios={registrerteBarn.map((barn) => mapBarnTilRadioProps(barn, søknadenGjelderEtAnnetBarn))}
                    validate={søknadenGjelderEtAnnetBarn ? undefined : getRequiredFieldValidator()}
                />
                <Checkbox
                    label={text('steg.omBarnet.gjelderAnnetBarn')}
                    name={OmBarnetFormFields.søknadenGjelderEtAnnetBarn}
                    afterOnChange={(isChecked) => {
                        if (isChecked) {
                            onAnnetBarnSelected();
                        }
                    }}
                />
            </VStack>
        </VStack>
    );
};

export default RegistrertBarnSpørsmål;
