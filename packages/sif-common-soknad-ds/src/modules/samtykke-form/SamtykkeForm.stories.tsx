import { Meta, StoryObj } from '@storybook/react';
import SamtykkeForm from './SamtykkeForm';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../storybook/decorators/withPageWidth';

const meta: Meta<typeof SamtykkeForm> = {
    component: SamtykkeForm,
    title: 'Modules/SamtykkeForm',
    decorators: [withIntl, withPageWidth],
};

export default meta;

type Story = StoryObj<typeof SamtykkeForm>;

export const Default: Story = {
    name: 'Default',
    render: () => <SamtykkeForm synlig={true} onFortsettSøknad={() => null} onFortsettSøknadSenere={() => null} />,
};
