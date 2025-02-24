import type { Meta, StoryObj } from '@storybook/react';

import { BodyShort, Box, Button, HStack, VStack } from '@navikt/ds-react';
import { getDateValidator } from '@navikt/sif-validation';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { useFormikContext } from 'formik';
import { datepickerUtils } from '../../../src/components/formik-datepicker/datepickerUtils';
import FormikDatepicker, { FormikDatepickerProps } from '../../../src/components/formik-datepicker/FormikDatepicker';
import { withFormikWrapper } from '../../decorators/StoryFormikWrapper';
import { withIntl } from '../../decorators/withIntl';

const meta: Meta<typeof FormikDatepicker> = {
    title: 'Component/FormikDatepicker',
    component: FormikDatepicker,
    decorators: [withIntl, withFormikWrapper],
};

export default meta;

type Story = StoryObj<typeof FormikDatepicker>;

const Wrapper = ({ children }) => {
    const formik = useFormikContext();
    return (
        <>
            {children}
            <BodyShort style={{ marginTop: '1rem' }}>
                Formik value: <span data-testid="formik-value">{formik.values['date']}</span>
            </BodyShort>
        </>
    );
};

const ModifyValueButtons = () => {
    const { setFieldValue } = useFormikContext();
    return (
        <HStack gap="2">
            <Button type="button" onClick={() => setFieldValue('date', '')} variant="secondary" size="small">
                Tøm felt
            </Button>
            <Button type="button" onClick={() => setFieldValue('date', '2025-01-01')} variant="secondary" size="small">
                Sett dato
            </Button>
        </HStack>
    );
};

export const Default: Story = {
    render: () => (
        <Wrapper>
            <VStack gap="2">
                <FormikDatepicker {...defaultProps} />
                <Box>
                    <ModifyValueButtons />
                </Box>
            </VStack>
        </Wrapper>
    ),
};

/*
 * See https://storybook.js.org/docs/react/writing-stories/play-function#working-with-the-canvas
 * to learn more about using the canvasElement to query the DOM
 */
export const Validation: Story = {
    render: () => {
        return (
            <Wrapper>
                <FormikDatepicker {...defaultProps} />
            </Wrapper>
        );
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await userEvent.type(canvas.getByLabelText('Velg en dato'), '02-10-2000');
        await userEvent.tab();
        await userEvent.tab();

        await expect(canvas.getByTestId('formik-value').innerText).toEqual('2000-10-02');

        await canvas.getByTestId('typedFormikForm-submitButton').click();

        const errorMessage = await canvas.findByText('dateIsBeforeMin');

        await expect(errorMessage).toBeInTheDocument();
    },
};

const validator = getDateValidator({
    required: true,
    min: new Date(2015, 0, 1),
    max: new Date(),
    onlyWeekdays: true,
});

const defaultProps: FormikDatepickerProps<any, any> = {
    id: 'datepicker',
    name: 'date',
    label: 'Velg en dato',
    description: 'Some description',
    dropdownCaption: true,
    minDate: datepickerUtils.getDateFromDateString('2025-02-02'),
    maxDate: new Date(2030, 1, 10),
    validate: validator,
};
