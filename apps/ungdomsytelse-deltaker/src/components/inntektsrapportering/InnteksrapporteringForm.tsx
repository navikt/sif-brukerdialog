import { Box, Heading, VStack } from '@navikt/ds-react';
import { DeltakelseSøktFor } from '../../api/types';
import { getMånederForInnteksrapportering } from '../../utils/deltakelserUtils';
import InntektEnMånedForm from './InntektEnMånedForm';
import { FormLayout } from '@navikt/sif-common-ui';

interface Props {
    deltakelse: DeltakelseSøktFor;
}

const InntektsrapporteringForm = ({ deltakelse }: Props) => {
    const måneder = getMånederForInnteksrapportering(deltakelse);

    return (
        <Box>
            <Heading level="3" size="small" spacing={true}>
                Måneder du kan rapportere inntekt for
            </Heading>
            <VStack gap="2">
                {måneder.reverse().map((måned) => {
                    return (
                        <FormLayout.Panel key={måned.from.toISOString()}>
                            <InntektEnMånedForm deltakelse={deltakelse} måned={måned} />
                        </FormLayout.Panel>
                    );
                })}
            </VStack>
        </Box>
    );
};

export default InntektsrapporteringForm;
