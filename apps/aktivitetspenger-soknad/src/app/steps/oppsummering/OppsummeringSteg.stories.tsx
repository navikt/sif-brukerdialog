import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouter } from '../../../../storybook/decorators/withRouter';
import { withSøknadAppContext } from '../../../../storybook/decorators/withSøknadAppContext';
import { OppsummeringSteg } from './OppsummeringSteg';

const meta: Meta = {
    title: 'Søknad/Steg/Oppsummering',
    decorators: [withIntl, withRouter, (Story) => withSøknadAppContext(Story)],
};

export default meta;

type Story = StoryObj;

export const Standard: Story = {
    render: () => <OppsummeringSteg />,
};
