import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import AnnetBarnExample from './AnnetBarnExample';

const meta: Meta<typeof AnnetBarnExample> = {
    component: AnnetBarnExample,
    title: 'Form/Annet barn',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof AnnetBarnExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <AnnetBarnExample />,
};
