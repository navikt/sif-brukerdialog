import { Meta, StoryFn } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import StartPåNyttDialog from './StartPåNyttDialog';

export default {
    title: 'Components/StartPåNyttDialog',
    component: StartPåNyttDialog,
    decorators: [withIntl],
} as Meta<typeof StartPåNyttDialog>;

const Template: StoryFn = () => (
    <div style={{ maxWidth: '50rem' }}>
        <StartPåNyttDialog open={true} onCancel={() => null} onConfirm={() => null} />
    </div>
);

export const Default = Template.bind({});

Default.args = {};
Default.parameters = {};
