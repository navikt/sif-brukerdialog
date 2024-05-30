import type { Meta, StoryObj } from '@storybook/react';
import { søkerMock } from '../../../storybook/data/søkerMock';
import { withAmplitudeProvider, withIntl, withFormikWrapper } from '../../../storybook/decorators';
import VelkommenPage from './VelkommenPage';

const meta: Meta<typeof VelkommenPage> = {
    title: 'Pages/VelkommenPage',
    component: VelkommenPage,
    decorators: [withAmplitudeProvider, withIntl, withFormikWrapper],
    args: {
        søker: søkerMock,
    },
};
export default meta;

type Story = StoryObj<typeof VelkommenPage>;

export const Default: Story = {};
