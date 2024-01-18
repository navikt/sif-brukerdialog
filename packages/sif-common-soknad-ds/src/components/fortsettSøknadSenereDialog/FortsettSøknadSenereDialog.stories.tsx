import { Meta, StoryObj } from '@storybook/react';
import FortsettSøknadSenereDialog from './FortsettSøknadSenereDialog';
import { withIntl } from '../../../storybook/decorators/withIntl';

const meta: Meta<typeof FortsettSøknadSenereDialog> = {
    component: FortsettSøknadSenereDialog,
    title: 'Component/FortsettSøknadSenereDialog',
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof FortsettSøknadSenereDialog>;

export const Default: Story = {
    name: 'Default',
    render: () => (
        <FortsettSøknadSenereDialog synlig={true} onFortsettSøknad={() => null} onFortsettSøknadSenere={() => null} />
    ),
};
