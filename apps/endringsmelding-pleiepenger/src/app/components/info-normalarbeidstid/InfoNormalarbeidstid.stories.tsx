import { Meta, StoryFn } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { InfoNormalarbeidstid } from './InfoNormalarbeidstid';

export default {
    title: 'Components/InfoNormalarbeidstid',
    component: InfoNormalarbeidstid,
    decorators: [withIntl],
} as Meta<typeof InfoNormalarbeidstid>;

const Template: StoryFn = () => (
    <div style={{ maxWidth: '50rem' }}>
        <InfoNormalarbeidstid />
    </div>
);

export const Default = Template.bind({});

Default.args = {};
Default.parameters = {};
