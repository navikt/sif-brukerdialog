import { Bleed, BodyShort, VStack } from '@navikt/ds-react';
import React from 'react';

interface Props {
    title?: string;
    children: React.ReactNode;
}

export const PeriodeInfoPanel = ({ title, children }: Props) => (
    <Bleed marginBlock="space-1">
        <VStack gap="space-8">
            {title && (
                <BodyShort weight="semibold" size="large" className="capitalize">
                    {title}
                </BodyShort>
            )}
            {children}
        </VStack>
    </Bleed>
);
