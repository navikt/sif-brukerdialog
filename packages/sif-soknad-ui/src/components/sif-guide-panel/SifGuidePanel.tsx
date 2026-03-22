import { BodyLong, GuidePanel, GuidePanelProps, Heading, VStack } from '@navikt/ds-react';
import { useMediaQuery } from 'react-responsive';

export type GuideMood = 'happy' | 'uncertain';

import VeilederSVG from './VeilederSVG';

export interface SifGuidePanelProps extends GuidePanelProps {
    mood?: GuideMood;
    switchToPosterBreakpoint?: number;
}

export const SifGuidePanel = ({
    mood = 'happy',
    poster,
    title,
    switchToPosterBreakpoint = 576,
    children,
    ...restProps
}: SifGuidePanelProps) => {
    const isNarrow = useMediaQuery({
        query: `(max-width: ${switchToPosterBreakpoint}px)`,
    });
    const illustration = mood === 'uncertain' ? <VeilederSVG mood="uncertain" /> : undefined;
    return (
        <GuidePanel {...restProps} poster={isNarrow ? true : poster} illustration={illustration}>
            <VStack gap="space-2">
                {title && (
                    <Heading level="2" size="medium">
                        {title}
                    </Heading>
                )}
                <BodyLong spacing={false} as="div">
                    {children}
                </BodyLong>
            </VStack>
        </GuidePanel>
    );
};
