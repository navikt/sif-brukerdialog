import { Meta, StoryObj } from '@storybook/react';
import { withFormikWrapper } from '../../../storybook/decorators/withFormikWrapper';
import FormikCountrySelect from '../../../src/components/formik-country-select/FormikCountrySelect';

const meta: Meta<typeof FormikCountrySelect> = {
    title: 'Component/FormikCountrySelect',
    component: FormikCountrySelect,
    decorators: [withFormikWrapper],
};

export default meta;

type Story = StoryObj<typeof FormikCountrySelect>;

export const AllCountries: Story = {
    name: 'Alle land',
    args: {},
};
export const EøsCountries: Story = {
    name: 'Eøs/efta-land',
    args: {
        showOnlyEuAndEftaCountries: true,
    },
};
