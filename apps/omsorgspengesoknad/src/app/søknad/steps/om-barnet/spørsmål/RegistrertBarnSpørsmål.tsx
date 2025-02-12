import { Heading, HStack, VStack } from '@navikt/ds-react';
import { getRequiredFieldValidator } from '@navikt/sif-common-validation';
import { AppText, useAppIntl } from '../../../../i18n';
import { OmBarnetFormFields } from '../OmBarnetStep';
import { mapBarnTilRadioProps } from '../omBarnetStepUtils';
import { omBarnetFormComponents } from '../omBarnetFormComponents';
import RegistrerteBarnHelpText from '@navikt/sif-common-ui/src/components/registrerte-barn-liste/RegistrerteBarnHelpText';
import { RegistrertBarn } from '@navikt/sif-common-api';

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
                    legend={
                        <>
                            <HStack gap="2" marginBlock={'2 2'}>
                                {text('steg.omBarnet.spm.barnetSøknadenGjelder.registrerteBarn.label')}
                                <RegistrerteBarnHelpText />
                            </HStack>
                        </>
                    }
                    description={<AppText id="steg.omBarnet.spm.barnetSøknadenGjelder.info" />}
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
