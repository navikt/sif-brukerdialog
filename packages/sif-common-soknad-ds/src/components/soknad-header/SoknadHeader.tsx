import { Bleed, Box, Heading, HStack, Show, VStack } from '@navikt/ds-react';
import React from 'react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import { ApplicationPictogram } from '../application-pictogram/ApplicationPictogram';

interface Props {
    title: string;
    level?: '1' | '2';
    useStandard?: boolean;
}

const SoknadHeader: React.FunctionComponent<Props> = ({ title, level = '1', useStandard }) => {
    if (useStandard) {
        return (
            <VStack gap="0">
                <Bleed marginInline={{ lg: '24' }}>
                    <Box
                        width={{ xs: '48px', lg: '64px' }}
                        height={{ xs: '48px', lg: '64px' }}
                        position={{ xs: 'relative', lg: 'absolute' }}>
                        <ApplicationPictogram style={{ zoom: '1' }} />
                    </Box>
                </Bleed>
                <VStack
                    gap="1"
                    marginBlock={{ xs: `${level === '1' ? '12 0' : '10 0'}`, lg: '0' }}
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
        <div style={{ boxShadow: '0 -4px 0 var(--a-deepblue-400, var(--ax-bg-brand-blue-strong)) inset' }}>
            <PageBoundary>
                <HStack gap="4" paddingBlock="2 2" align="center" wrap={false}>
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
