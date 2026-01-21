import { Bleed, Box, Heading, HStack, Show, VStack } from '@navikt/ds-react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';

import { ApplicationPictogram } from '../application-pictogram/ApplicationPictogram';

interface Props {
    title: string;
    level?: '1' | '2';
    useStandard?: boolean;
}

const SoknadHeader = ({ title, level = '1', useStandard }: Props) => {
    if (useStandard) {
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
    }
    return (
        <div style={{ boxShadow: '0 -4px 0 var(--ax-brand-blue-500, var(--ax-bg-brand-blue-strong)) inset' }}>
            <PageBoundary>
                <HStack gap="space-16" paddingBlock="space-8 space-8" align="center" wrap={false}>
                    <Show above="sm">
                        <ApplicationPictogram style={{ width: '2.5rem', height: '2.5rem' }} />
                    </Show>
                    <Heading size="small" level={level}>
                        {title}
                    </Heading>
                </HStack>
            </PageBoundary>
        </div>
    );
};

export default SoknadHeader;
