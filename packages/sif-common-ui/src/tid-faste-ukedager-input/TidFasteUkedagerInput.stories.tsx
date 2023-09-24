import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { ISODateRangeToDateRange } from '@navikt/sif-common-utils/lib';
import { withFormikWrapper, withIntl, withRouterProvider } from '../../storybook/decorators';
import TidFasteUkedagerInput from './TidFasteUkedagerInput';

export default {
    title: 'Component/form-element/TidFasteUkedagerInput',
    component: TidFasteUkedagerInput,
    decorators: [withIntl, withFormikWrapper, withRouterProvider],
} as Meta<typeof TidFasteUkedagerInput>;

const Template: StoryFn<typeof TidFasteUkedagerInput> = (args) => {
    return <TidFasteUkedagerInput name="abc" />;
};

export const Default = Template.bind({});
Default.args = {
    dateRange: ISODateRangeToDateRange('2023-07-01/2023-09-30'),
};
