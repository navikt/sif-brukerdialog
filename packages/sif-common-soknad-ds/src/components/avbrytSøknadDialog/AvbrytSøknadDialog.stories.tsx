import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import AvbrytSøknadDialog from './AvbrytSøknadDialog';

const meta: Meta<typeof AvbrytSøknadDialog> = {
    component: AvbrytSøknadDialog,
    title: 'Component/AvbrytSøknadDialog',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof AvbrytSøknadDialog>;

export const Default: Story = {
    name: 'Default',
    render: () => <AvbrytSøknadDialog synlig={true} onFortsettSøknad={() => null} onAvbrytSøknad={() => null} />,
};
