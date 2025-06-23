import type { Meta, StoryObj } from '@storybook/react-vite';

import BarnSteg from './BarnSteg';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { withSøknadContext } from '../../../../../storybook/decorators/withSøknadContext';
import { withRouter } from '../../../../../storybook/decorators/withRouter';

const meta: Meta = {
    title: 'Søknad/Steg/Barn',
    parameters: {},
    decorators: [withIntl, withRouter],
};

export default meta;

type Story = StoryObj;

export const IngenBarn: Story = {
    render: () => <BarnSteg />,
    decorators: [
        (Story) =>
            withSøknadContext(Story, {
                barn: [],
            }),
    ],
};

export const EttBarn: Story = {
    render: () => <BarnSteg />,
    decorators: [(Story) => withSøknadContext(Story)],
};

export const ToBarn: Story = {
    render: () => <BarnSteg />,
    decorators: [
        (Story) =>
            withSøknadContext(Story, {
                barn: [
                    { aktørId: '123', fornavn: 'SVAL', etternavn: 'FOTBALLBINGE', fødselsdato: new Date('2010-01-01') },
                    { aktørId: '456', fornavn: 'UNDERFUNDIG', etternavn: 'SKRUE', fødselsdato: new Date('2023-10-23') },
                ],
            }),
    ],
};
