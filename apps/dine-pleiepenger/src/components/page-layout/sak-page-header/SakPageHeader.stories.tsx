import { Behandlingsstatus } from '../../../server/api-models/Behandlingsstatus';
import { withEmptyPage } from '../../../storybook/hooks/withEmptyPage';
import { withIntl } from '../../../storybook/hooks/withIntl';
import StatusTag from '../../status-tag/StatusTag';
import SakPageHeader from './SakPageHeader';

import type { Meta, StoryObj } from '@storybook/react';
const meta: Meta<typeof SakPageHeader> = {
    component: SakPageHeader,
    title: 'Components/SakPageHeader',
    parameters: {
        layout: 'centered',
    },
    decorators: [withIntl, withEmptyPage],
};
export default meta;

type Story = StoryObj<typeof SakPageHeader>;

export const Default: Story = {
    args: {
        saksnr: '123123',
        navn: 'Tore Tang',
        titleTag: <StatusTag status={Behandlingsstatus.AVSLUTTET} />,
    },
};
