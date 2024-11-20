import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import FormikNumberInput from '../../../src/components/formik-number-input/FormikNumberInput';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import getNumberValidator from '@navikt/sif-common-formik-ds/src/validation/getNumberValidator';

const meta: Meta<typeof FormikNumberInput> = {
    title: 'Component/FormikNumberInput',
    component: FormikNumberInput,
    decorators: [withFormikWrapper, withIntl],
};

export default meta;

const Template: StoryFn<typeof FormikNumberInput> = (args) => (
    <FormikNumberInput {...args} validate={getNumberValidator()} useFormatting={true} />
);

export const Default = Template.bind({});
Default.args = {
    label: 'FormikNumberInput',
    name: 'FormikNumberInput',
    description: 'Some description i appropriate',
};
Default.parameters = {
    formik: {
        initialValues: {
            FormikNumberInput: '1 232,23',
        },
    },
};
