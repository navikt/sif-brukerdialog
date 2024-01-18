import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { ISODateRangeToDateRange } from '@navikt/sif-common-utils';
import TidFasteUkedagerInput from './TidFasteUkedagerInput';

import { withStoryWrapper, withFormikWrapper, withIntlWrapper } from '../../../storybook/decorators';

export default {
    title: 'Inputs/TidFasteUkedagerInput',
    component: TidFasteUkedagerInput,
    decorators: [withStoryWrapper, withIntlWrapper, withFormikWrapper],
} as Meta<typeof TidFasteUkedagerInput>;

const Template: StoryFn<typeof TidFasteUkedagerInput> = (args) => {
    return <TidFasteUkedagerInput name={'abc'} />;
};

export const Default = Template.bind({});
Default.args = {
    dateRange: ISODateRangeToDateRange('2023-07-01/2023-09-30'),
};
