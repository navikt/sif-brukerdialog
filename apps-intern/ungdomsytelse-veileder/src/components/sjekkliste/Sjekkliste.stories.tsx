import type { Meta, StoryObj } from '@storybook/react-vite';

import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import Sjekkliste from './Sjekkliste';

const meta: Meta<typeof Sjekkliste> = {
    component: Sjekkliste,
    title: 'Components/Sjekkliste',
    parameters: {},
    decorators: [withIntl, withVeilederContext],
};
export default meta;

type Story = StoryObj<typeof Sjekkliste>;

export const SjekklisteStory: Story = {
    name: 'Sjekkliste',
};
