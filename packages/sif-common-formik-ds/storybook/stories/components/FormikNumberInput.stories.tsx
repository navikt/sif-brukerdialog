import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import FormikNumberInput from '../../../src/components/formik-number-input/FormikNumberInput';
import getNumberValidator from '../../../src/validation/getNumberValidator';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import { withIntl } from '../../decorators/withIntl';
import { IntlShape, useIntl } from 'react-intl';
import { parseNumberString } from '../../../src/utils/parseNumberString';

const meta: Meta<typeof FormikNumberInput> = {
    title: 'Component/FormikNumberInput',
    component: FormikNumberInput,
    decorators: [withIntl, withFormikWrapper],
};

export default meta;

const FormikNumberInputExample = (args: any) => {
    const intl = useIntl();
    return (
        <FormikNumberInput
            {...args}
            formatter={(value) => getNumberFormatter(intl)(value, true)}
            validate={getNumberValidator({
                min: 0,
                max: 2000,
                allowDecimals: true,
            })}
        />
    );
};

const Template: StoryFn<typeof FormikNumberInput> = (args) => <FormikNumberInputExample {...args} />;

const getNumberFormatter =
    (intl: IntlShape) =>
    (value: string | undefined, withDecimals?: boolean): string => {
        try {
            const number = parseNumberString(value);
            return intl.formatNumber(number, {
                maximumFractionDigits: 3,
            });
        } catch {}
        return value || '';
    };

export const Default = Template.bind({});

Default.args = {
    label: 'FormikNumberInput',
    name: 'FormikNumberInput',
    description: 'Some description if appropriate',
};
Default.parameters = {
    formik: {
        initialValues: {
            FormikNumberInput: '52000.12',
        },
    },
};
