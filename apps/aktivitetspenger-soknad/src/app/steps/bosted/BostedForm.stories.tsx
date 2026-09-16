import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouter } from '../../../../storybook/decorators/withRouter';
import { withSøknadAppContext } from '../../../../storybook/decorators/withSøknadAppContext';
import { BostedForm } from './BostedForm';

const meta: Meta = {
    title: 'Søknad/Steg/Bosted',
    decorators: [withIntl, withRouter, (Story) => withSøknadAppContext(Story)],
};

export default meta;

type Story = StoryObj;

export const Standard: Story = {
    render: () => <BostedForm />,
};
