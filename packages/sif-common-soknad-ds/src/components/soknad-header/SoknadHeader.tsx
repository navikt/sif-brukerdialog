import { Heading, HStack, Show } from '@navikt/ds-react';
import React from 'react';
import PageBoundary from '@navikt/sif-common-core-ds/src/components/page-boundary/PageBoundary';
import { ApplicationPictogram } from '../application-pictogram/ApplicationPictogram';

interface Props {
    title: string;
    level?: '1' | '2';
}

const SoknadHeader: React.FunctionComponent<Props> = ({ title, level = '1' }) => (
    <div style={{ borderBottom: '4px var(--ax-bg-brand-blue-strong) solid' }}>
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

export default SoknadHeader;
