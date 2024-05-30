import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import TidsperiodeExample from './TidsperiodeExample';

const meta: Meta<typeof TidsperiodeExample> = {
    component: TidsperiodeExample,
    title: 'Form/Tidsperiode',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof TidsperiodeExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <TidsperiodeExample />,
};
