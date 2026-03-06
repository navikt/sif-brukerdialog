import { Box, GuidePanel, Heading, VStack } from '@navikt/ds-react';

import { AppText } from '../../i18n';

interface Props {
    fornavn: string;
}

const VelkommenMelding = ({ fornavn }: Props) => {
    return (
        <GuidePanel poster={true}>
            <Box paddingBlock="space-16 space-0">
                <Heading level="1" size="medium" spacing={true}>
                    <AppText id="velkommenMelding.hei" values={{ fornavn }} />
                </Heading>
                <VStack gap="space-16">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure non ea natus, dolorem quo optio
                    officia maxime tenetur nemo sint provident reiciendis recusandae similique culpa quam a.
                    Necessitatibus, accusantium doloribus.
                </VStack>
            </Box>
        </GuidePanel>
    );
};

export default VelkommenMelding;
