import { Behandlingsstatus } from '../../../server/api-models/Behandlingsstatus';
import { withEmptyPage } from '../../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../../storybook/hooks/withIntl';
import StatusTag from '../../status-tag/StatusTag';
import PageHeader from './PageHeader';

import type { Meta, StoryObj } from '@storybook/react';
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
        title: 'Tittel på side',
        titleTag: <StatusTag status={Behandlingsstatus.AVSLUTTET} />,
    },
};
