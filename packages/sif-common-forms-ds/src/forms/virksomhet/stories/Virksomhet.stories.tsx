import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import VirksomhetExample from './VirksomhetExample';

const meta: Meta<typeof VirksomhetExample> = {
    component: VirksomhetExample,
    title: 'Form/Virksomhet',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof VirksomhetExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <VirksomhetExample />,
};
