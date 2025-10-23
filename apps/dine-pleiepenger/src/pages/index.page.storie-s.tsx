import type { Meta, StoryObj } from '@storybook/react-vite';

import { withEmptyPage } from '../storybook/hooks/withEmptyPage';
import { withInnsynsdata } from '../storybook/hooks/withInnsynsdata';
import { withIntl } from '../storybook/hooks/withIntl';
import Page from './index.page';

const meta: Meta<typeof Page> = {
    component: Page,
    title: 'Page/Forside',
    parameters: {
        layout: 'centered',
    },
    decorators: [withIntl, withEmptyPage, withInnsynsdata],
};
export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
    args: {},
};
