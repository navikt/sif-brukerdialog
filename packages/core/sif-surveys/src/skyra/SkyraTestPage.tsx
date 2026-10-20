import { BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { useEffect } from 'react';

import { Skyra } from './Skyra';
import { SkyraSlug } from './SkyraSlug';

interface Props {
    slugs: SkyraSlug[];
}

export const SkyraTestPage = ({ slugs }: Props) => {
    useEffect(() => {
        const skyra = (globalThis as any).skyra;
        if (skyra?.reload) {
            skyra.reload();
        }
    }, []);

    return (
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
    );
};
