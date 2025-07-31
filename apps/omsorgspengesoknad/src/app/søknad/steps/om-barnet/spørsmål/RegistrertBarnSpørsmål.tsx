import { Heading, VStack } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { VelgBarnFormPart } from '@navikt/sif-common-forms-ds';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { useAppIntl } from '../../../../i18n';
import { OmBarnetFormFields } from '../OmBarnetStep';

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
                <VelgBarnFormPart
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
