import type { Meta, StoryObj } from '@storybook/react';
import { withAmplitudeProvider } from '../../../storybook/decorators/withAmplitude';
import { withIntl } from '../../../storybook/decorators/withIntl';
import IkkeTilgangPage from './IkkeTilgangPage';

const meta: Meta<typeof IkkeTilgangPage> = {
    title: 'Pages/IkkeTilgangPage',
    component: IkkeTilgangPage,
    decorators: [withAmplitudeProvider, withIntl],
};
export default meta;

type Story = StoryObj<typeof IkkeTilgangPage>;

export const Default: Story = {};
