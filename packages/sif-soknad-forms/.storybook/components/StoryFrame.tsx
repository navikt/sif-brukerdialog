import { Box } from '@navikt/ds-react';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    maxWidth?: number;
    minHeight?: number;
}

export const StoryFrame = ({ children, maxWidth, minHeight }: Props) => {
    return <Box style={{ ...(maxWidth ? { maxWidth } : {}), ...(minHeight ? { minHeight } : {}) }}>{children}</Box>;
};
