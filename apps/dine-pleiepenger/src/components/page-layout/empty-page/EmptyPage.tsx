import { Theme, VStack } from '@navikt/ds-react';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const EmptyPage = ({ children }: Props) => (
    <Theme hasBackground={false}>
        <VStack align="center" justify="start" padding="space-24" paddingBlock="space-24 space-128" minHeight="20rem">
            {children}
        </VStack>
    </Theme>
);

export default EmptyPage;
