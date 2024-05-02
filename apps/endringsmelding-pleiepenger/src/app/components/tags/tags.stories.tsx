import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { HStack } from '@navikt/ds-react';
import EndretTag from './EndretTag';
import NyTag from './NyTag';
import FerieTag from './FerieTag';
import KortUkeTag from './KortUkeTag';

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
