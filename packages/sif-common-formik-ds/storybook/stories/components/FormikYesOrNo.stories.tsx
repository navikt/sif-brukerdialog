import { Meta, StoryFn } from '@storybook/react-vite';
import * as React from 'react';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import FormikYesOrNoQuestion from '../../../src/components/formik-yes-or-no-question/FormikYesOrNoQuestion';
import { YesOrNo } from '../../../src/types';

const meta: Meta<typeof FormikYesOrNoQuestion> = {
    title: 'Component/FormikYesOrNoQuestion',
    component: FormikYesOrNoQuestion,
    decorators: [withFormikWrapper],
};

export default meta;

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
