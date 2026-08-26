import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouter } from '../../../../storybook/decorators/withRouter';
import { withSøknadAppContext } from '../../../../storybook/decorators/withSøknadAppContext';
import { Velkommen } from './Velkommen';

const meta: Meta = {
    title: 'Søknad/Sider/Velkommen',
    decorators: [withIntl, withRouter, (Story) => withSøknadAppContext(Story)],
};

export default meta;

type Story = StoryObj;

export const Standard: Story = {
    render: () => <Velkommen />,
};
