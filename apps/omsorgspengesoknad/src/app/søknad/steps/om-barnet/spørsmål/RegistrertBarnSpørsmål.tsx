import { Heading, VStack } from '@navikt/ds-react';
import { useAppIntl } from '../../../../i18n';
import { OmBarnetFormFields } from '../OmBarnetStep';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { VelgBarnInput } from '@navikt/sif-common-ui';
import { getRequiredFieldValidator } from '@navikt/sif-validation';

interface Props {
    registrerteBarn: RegistrertBarn[];
}

const RegistrertBarnSpørsmål = ({ registrerteBarn }: Props) => {
    const { text } = useAppIntl();

    return (
        <VStack gap="4">
            <Heading level="2" size="medium">
                {text('steg.omBarnet.spm.barnetSøknadenGjelder.label')}
            </Heading>
            <VStack gap="2">
                <VelgBarnInput
                    name={OmBarnetFormFields.barnetSøknadenGjelder}
                    registrerteBarn={registrerteBarn}
                    inkluderAnnetBarn={true}
                    validate={getRequiredFieldValidator()}
                />
            </VStack>
        </VStack>
    );
};

export default RegistrertBarnSpørsmål;
