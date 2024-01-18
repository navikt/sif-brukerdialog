import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import DaySelector from './DaySelector';

import { withIntlWrapper, withStoryWrapper } from '../../../storybook/decorators';

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
