import { HStack } from '@navikt/ds-react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../storybook/decorators/withIntl';
import EndretTag from './EndretTag';
import FerieTag from './FerieTag';
import KortUkeTag from './KortUkeTag';
import NyTag from './NyTag';

const meta: Meta = {
    title: 'Components/Tags',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj;

export const Tags: Story = {
    name: 'Tags',
    render: () => (
        <HStack gap="5">
            <EndretTag />
            <NyTag />
            <FerieTag>Ferie</FerieTag>
            <KortUkeTag />
        </HStack>
    ),
};
