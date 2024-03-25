import { flereSakerMock } from '../../../e2e/playwright/mockdata/flere-saker.mock';
import { withEmptyPage } from '../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../storybook/hooks/withIntl';
import VelgSakPage from './VelgSakPage';

import type { Meta, StoryObj } from '@storybook/react';
const meta: Meta<typeof VelgSakPage> = {
    component: VelgSakPage,
    title: 'Content/VelgSakPage',
    parameters: {
        layout: 'centered',
    },
    decorators: [withEmptyPage, withIntl],
};
export default meta;

type Story = StoryObj<typeof VelgSakPage>;

export const Default: Story = {
    name: 'Flere saker',
    args: {
        saker: flereSakerMock,
    },
};
