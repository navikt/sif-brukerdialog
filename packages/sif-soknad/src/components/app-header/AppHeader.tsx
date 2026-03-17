import { Bleed, Box, Heading, VStack } from '@navikt/ds-react';

import { ApplicationPictogram } from './ApplicationPictogram';

interface Props {
    title: string;
    level?: '1' | '2';
}

export const AppHeader = ({ title, level = '1' }: Props) => {
    return (
        <VStack gap="space-0">
            <Bleed marginInline={{ lg: `${level === '1' ? 'space-128' : 'space-96'}` }}>
                <Bleed marginInline={{ lg: 'space-8' }}>
                    <Box
                        width={{
                            xs: `${level === '1' ? '96px' : '64px'}`,
                            lg: `${level === '1' ? '96px' : '80px'}`,
                        }}
                        height={{
                            xs: `${level === '1' ? '96px' : '64px'}`,
                            lg: `${level === '1' ? '96px' : '80px'}`,
                        }}
                        position={{ xs: 'relative', lg: 'absolute' }}>
                        <ApplicationPictogram style={{ width: '100%', height: '100%' }} />
                    </Box>
                </Bleed>
            </Bleed>
            <VStack
                gap="space-4"
                marginBlock={{ xs: `${level === '1' ? 'space-24 space-0' : 'space-16 space-0'}`, lg: 'space-0' }}
                minHeight={{ lg: '80px' }}
                justify="center">
                <Heading level={level} size={level === '1' ? 'xlarge' : 'medium'}>
                    {title}
                </Heading>
            </VStack>
        </VStack>
    );
};
