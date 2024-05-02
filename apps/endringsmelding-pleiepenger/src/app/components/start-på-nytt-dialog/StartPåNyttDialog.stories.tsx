import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import StartPåNyttDialog from './StartPåNyttDialog';

const meta: Meta<typeof StartPåNyttDialog> = {
    title: 'Components/StartPåNyttDialog',
    component: StartPåNyttDialog,
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof StartPåNyttDialog>;

export const Default: Story = {};
