import type { Meta, StoryObj } from '@storybook/react-vite';

import { withEmptyPage } from '../../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../../storybook/hooks/withIntl';
import { BehandlingStatus } from '../../../types';
import StatusTag from '../../status-tag/StatusTag';
import PageHeader from './PageHeader';
const meta: Meta<typeof PageHeader> = {
    component: PageHeader,
    title: 'Components/PageHeader',
    parameters: {
        layout: 'centered',
    },
    decorators: [withIntl, withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
    args: {
        documentTitle: 'Tittel på side',
        titleTag: <StatusTag status={BehandlingStatus.AVSLUTTET} />,
    },
};
