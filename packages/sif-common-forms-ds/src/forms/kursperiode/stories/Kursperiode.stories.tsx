import { Meta, StoryObj } from '@storybook/react';
import KursperiodeExample from './KursperiodeExample';
import { withIntl } from '../../../../storybook/decorators/withIntl';

const meta: Meta<typeof KursperiodeExample> = {
    component: KursperiodeExample,
    title: 'Form/KursperiodeForm',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof KursperiodeExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <KursperiodeExample />,
};
