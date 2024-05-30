import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../../storybook/decorators/withIntl';
import UtenlandskNæringExample from './UtenlandskNæringExample';

const meta: Meta<typeof UtenlandskNæringExample> = {
    component: UtenlandskNæringExample,
    title: 'Form/UtenlandskNæring',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof UtenlandskNæringExample>;

export const Default: Story = {
    name: 'Default',
    render: () => <UtenlandskNæringExample />,
};
