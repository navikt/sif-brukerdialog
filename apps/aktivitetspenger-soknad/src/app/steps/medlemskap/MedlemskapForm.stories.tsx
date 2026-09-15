import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouter } from '../../../../storybook/decorators/withRouter';
import { withSøknadAppContext } from '../../../../storybook/decorators/withSøknadAppContext';
import { MedlemskapForm } from './MedlemskapForm';

const meta: Meta = {
    title: 'Søknad/Steg/Medlemskap',
    decorators: [withIntl, withRouter, (Story) => withSøknadAppContext(Story)],
};

export default meta;

type Story = StoryObj;

export const Standard: Story = {
    render: () => <MedlemskapForm />,
};
