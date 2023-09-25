import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import DaySelector from '../../../src/components/day-selector/DaySelector';
import { withStoryWrapper } from '../../decorators/withStoryWrapper';

export default {
    title: 'Component/form-element/DaySelector',
    component: DaySelector,
    decorators: [withStoryWrapper],
} as Meta<typeof DaySelector>;

const Template: StoryFn<typeof DaySelector> = (args) => {
    return <DaySelector dateRange={args.dateRange}>Content</DaySelector>;
};

export const Default = Template.bind({});
Default.args = {
    dateRange: ISODateRangeToDateRange('2023-07-01/2023-09-30'),
};
