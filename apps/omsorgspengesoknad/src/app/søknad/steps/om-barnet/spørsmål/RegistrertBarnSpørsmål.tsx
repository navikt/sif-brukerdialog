import { Heading, VStack } from '@navikt/ds-react';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useAppIntl } from '../../../../i18n';
import { OmBarnetFormFields } from '../OmBarnetStep';
import { mapBarnTilRadioProps } from '../omBarnetStepUtils';
import { omBarnetFormComponents } from '../omBarnetFormComponents';
import { RegistrertBarn } from '@navikt/sif-common';

interface Props {
    registrerteBarn: RegistrertBarn[];
    søknadenGjelderEtAnnetBarn?: boolean;
    onAnnetBarnSelected: () => void;
}

const { RadioGroup, Checkbox } = omBarnetFormComponents;

const RegistrertBarnSpørsmål = ({ registrerteBarn, søknadenGjelderEtAnnetBarn, onAnnetBarnSelected }: Props) => {
    const { text } = useAppIntl();

    return (
        <VStack gap="4">
            <Heading level="2" size="medium">
                {text('steg.omBarnet.spm.barnetSøknadenGjelder.label')}
            </Heading>
            <VStack gap="2">
                <RadioGroup
                    legend={text('steg.omBarnet.spm.barnetSøknadenGjelder.registrerteBarn.label')}
                    description={text('steg.omBarnet.spm.barnetSøknadenGjelder.info')}
                    name={OmBarnetFormFields.barnetSøknadenGjelder}
                    radios={registrerteBarn.map((barn) => mapBarnTilRadioProps(barn, søknadenGjelderEtAnnetBarn))}
                    validate={søknadenGjelderEtAnnetBarn ? undefined : getRequiredFieldValidator()}
                />
                <Checkbox
                    label={text('steg.omBarnet.spm.gjelderAnnetBarn.label')}
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
