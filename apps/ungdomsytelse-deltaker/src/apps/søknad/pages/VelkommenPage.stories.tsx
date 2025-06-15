import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withSøknadContext } from '../../../../storybook/decorators/withSøknadContext';
import VelkommenPage from './VelkommenPage';
import { withRouter } from '../../../../storybook/decorators/withRouter';

const meta: Meta = {
    title: 'Søknad/Sider/Velkommen',
    parameters: {},
    decorators: [withIntl, (Story) => withSøknadContext(Story), withRouter],
};

export default meta;

type Story = StoryObj;

export const Velkommen: Story = {
    render: () => <VelkommenPage />,
};
