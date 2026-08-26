import type { Meta, StoryObj } from '@storybook/react-vite';
import { mockRegistrerteBarn } from '@sif/api/mock-data';

import { withIntl } from '../../../../storybook/decorators/withIntl';
import { withRouter } from '../../../../storybook/decorators/withRouter';
import { withSøknadAppContext } from '../../../../storybook/decorators/withSøknadAppContext';
import { BarnForm } from './BarnForm';

const meta: Meta = {
    title: 'Søknad/Steg/Barn',
    decorators: [withIntl, withRouter],
};

export default meta;

type Story = StoryObj;

export const MedBarn: Story = {
    render: () => <BarnForm />,
    decorators: [(Story) => withSøknadAppContext(Story)],
};

export const IngenBarn: Story = {
    render: () => <BarnForm />,
    decorators: [
        (Story) =>
            withSøknadAppContext(Story, {
                registrerteBarn: [],
            }),
    ],
};

export const FlereBarn: Story = {
    render: () => <BarnForm />,
    decorators: [
        (Story) =>
            withSøknadAppContext(Story, {
                registrerteBarn: [...mockRegistrerteBarn, ...mockRegistrerteBarn],
            }),
    ],
};
