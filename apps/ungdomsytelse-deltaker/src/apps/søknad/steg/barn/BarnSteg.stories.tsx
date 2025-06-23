import type { Meta, StoryObj } from '@storybook/react-vite';

import BarnSteg from './BarnSteg';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withSøknadContext } from '../../../../../storybook/decorators/withSøknadContext';
import { withRouter } from '../../../../../storybook/decorators/withRouter';

const meta: Meta = {
    title: 'Søknad/Steg/Barn',
    parameters: {},
    decorators: [withIntl, (Story) => withSøknadContext(Story), withRouter],
};

export default meta;

type Story = StoryObj;

export const Barn: Story = {
    render: () => <BarnSteg />,
};
