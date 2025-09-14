import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import { Meta, StoryFn } from '@storybook/react-vite';

import { withIntlWrapper, withStoryWrapper } from '../../../storybook/decorators';
import DaySelector from './DaySelector';

export default {
    title: 'Inputs/DaySelector',
    component: DaySelector,
    decorators: [withStoryWrapper, withIntlWrapper],
} as Meta<typeof DaySelector>;

const Template: StoryFn<typeof DaySelector> = (args) => {
    return <DaySelector {...args}>Content</DaySelector>;
};

export const Default = Template.bind({});
Default.args = {
    dateRange: ISODateRangeToDateRange('2023-07-01/2029-09-30'),
    onChange: () => {},
};
