import type { Meta, StoryObj } from '@storybook/react-vite';

import { withSøknadContext } from '../../../../storybook/decorators/withSøknadContext';
import VelkommenPage from './VelkommenPage';

const meta: Meta = {
    title: 'Søknad/Sider/Velkommen',
    parameters: {},
    decorators: [(Story) => withSøknadContext(Story)],
};

export default meta;

type Story = StoryObj;

export const Velkommen: Story = {
    render: () => <VelkommenPage />,
};
