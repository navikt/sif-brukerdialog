import { Meta, StoryFn } from '@storybook/react-vite';
import * as React from 'react';
import FormikNumberInput from '../../../src/components/formik-number-input/FormikNumberInput';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { getNumberValidator } from '@navikt/sif-validation';

const meta: Meta<typeof FormikNumberInput> = {
    title: 'Component/FormikNumberInput',
    component: FormikNumberInput,
    decorators: [withFormikWrapper, withIntl],
};

export default meta;

const Template: StoryFn<typeof FormikNumberInput> = (args, x) => {
    const allowDecimals = args.integerValue === true ? false : true;
    return <FormikNumberInput {...args} validate={getNumberValidator({ allowDecimals })} />;
};

export const Default = Template.bind({});
Default.args = {
    label: 'FormikNumberInput',
    name: 'FormikNumberInput',
    description: 'Some description i appropriate',
};
Default.parameters = {
    formik: {
        initialValues: {
            FormikNumberInput: '12123.12',
        },
    },
};
