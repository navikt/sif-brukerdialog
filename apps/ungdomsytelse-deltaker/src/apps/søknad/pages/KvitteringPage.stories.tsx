import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouter } from '../../../../storybook/decorators/withRouter';
import KvitteringPage from './KvitteringPage';

const meta: Meta = {
    title: 'Søknad/Sider/Kvittering',
    parameters: {},
    decorators: [withIntl, withRouter],
};

export default meta;

type Story = StoryObj;

export const Kvittering: Story = {
    render: () => <KvitteringPage />,
};
