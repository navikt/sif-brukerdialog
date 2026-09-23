import { AppText } from '@app/i18n';
import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { Bleed, Box, InfoCard, Tag } from '@navikt/ds-react';
import { ReactNode } from 'react';

interface Props {
    spacing?: boolean;
    children: ReactNode;
}

export const Todo = ({ children, spacing = true }: Props) => (
    <Box marginBlock={spacing ? 'space-0 space-24' : 'space-0'}>
        <Bleed marginInline="space-8">
            <div style={{ zIndex: 2, position: 'relative' }}>
                <Tag variant="strong" size="xsmall" data-color="danger" style={{ rotate: '-12deg' }}>
                    <AppText id="component.todo.label" />
                </Tag>
            </div>
        </Bleed>
        <Bleed marginBlock="space-8">
            <InfoCard data-color="danger" size="small">
                <InfoCard.Message icon={<ExclamationmarkTriangleFillIcon aria-hidden />}>{children}</InfoCard.Message>
            </InfoCard>
        </Bleed>
    </Box>
);
export const TodoFlag = () => (
    <span
        style={{ zIndex: 2, position: 'absolute', display: 'inline-block', padding: '0 .5rem', marginTop: '-0.25rem' }}>
        <Tag variant="strong" size="xsmall" data-color="danger" style={{ rotate: '-12deg' }}>
            <AppText id="component.todo.label" />
        </Tag>
    </span>
);
