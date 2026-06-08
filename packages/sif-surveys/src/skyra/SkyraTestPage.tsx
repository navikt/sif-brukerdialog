import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';

import { Skyra } from './Skyra';
import { SkyraHandler } from './SkyraHandler';
import { SkyraSlug } from './SkyraSlug';

interface Props {
    slugs: SkyraSlug[];
}

export const SkyraTestPage = ({ slugs }: Props) => {
    return (
        <>
            <SkyraHandler />
            <VStack gap="space-40">
                <VStack gap="space-16">
                    <Heading size="large" level="1">
                        Skyra testside
                    </Heading>
                    <VStack gap="space-16">
                        {slugs.map((slug) => (
                            <Box key={slug}>
                                <BodyShort>Slug: {slug}</BodyShort>
                                <Skyra slug={slug} />
                            </Box>
                        ))}
                    </VStack>
                </VStack>
            </VStack>
        </>
    );
};
