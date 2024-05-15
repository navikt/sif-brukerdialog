import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import InfoNormalarbeidstid from './InfoNormalarbeidstid';

const meta: Meta<typeof InfoNormalarbeidstid> = {
    title: 'Components/InfoNormalarbeidstid',
    component: InfoNormalarbeidstid,
    decorators: [withIntl],
};

export default meta;

type Story = StoryObj<typeof InfoNormalarbeidstid>;

export const Default: Story = {};
