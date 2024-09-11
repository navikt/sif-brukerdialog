import { Heading, VStack } from '@navikt/ds-react';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
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

const RegistrertBarnSpørsmål = ({ registrerteBarn, søknadenGjelderEtAnnetBarn, onAnnetBarnSelected }: Props) => {
    const { text } = useAppIntl();

    return (
        <VStack gap="4">
            <Heading level="2" size="medium">
                {text('steg.omBarnet.spm.hvilketBarn.label')}
            </Heading>
            <VStack gap="2">
                <RadioGroup
                    legend={text('steg.omBarnet.spm.hvilketBarn.registrerteBarn.label')}
                    description={text('steg.omBarnet.spm.hvilketBarn.info')}
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
