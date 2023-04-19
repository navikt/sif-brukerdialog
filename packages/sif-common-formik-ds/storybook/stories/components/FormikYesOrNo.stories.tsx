import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import FormikYesOrNoQuestion from '../../../src/components/formik-yes-or-no-question/FormikYesOrNoQuestion';
import { YesOrNo } from '../../../src/types';

export default {
    title: 'Component/FormikYesOrNoQuestion',
    component: FormikYesOrNoQuestion,
    decorators: [withFormikWrapper],
} as Meta<typeof FormikYesOrNoQuestion>;

const Template: StoryFn<typeof FormikYesOrNoQuestion> = (args) => <FormikYesOrNoQuestion {...args} />;

export const Default = Template.bind({});
Default.args = {
    legend: 'Answer yes or no',
    name: 'yesOrNoQuestion',
};
Default.parameters = {
    formik: {
        initialValues: {
            yesOrNoQuestion: YesOrNo.YES,
        },
    },
};
