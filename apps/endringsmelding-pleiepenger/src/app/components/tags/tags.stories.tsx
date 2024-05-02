import { Meta, StoryFn } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import EndretTag from './EndretTag';
import { VStack } from '@navikt/ds-react';
import NyTag from './NyTag';
import FerieTag from './FerieTag';
import KortUkeTag from './KortUkeTag';

export default {
    title: 'Components/Tags',
    decorators: [withIntl],
} as Meta;

const Template: StoryFn = () => (
    <div style={{ maxWidth: '10rem' }}>
        <VStack gap="5">
            <EndretTag />
            <NyTag />
            <FerieTag>Ferie</FerieTag>
            <KortUkeTag />
        </VStack>
    </div>
);

export const Default = Template.bind({});

Default.args = {};
Default.parameters = {};
