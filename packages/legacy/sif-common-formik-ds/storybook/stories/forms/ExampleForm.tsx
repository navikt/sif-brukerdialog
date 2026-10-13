/* eslint-disable no-console */
import { Box, Heading, Panel } from '@navikt/ds-react';
import { getCheckedValidator, getRequiredFieldValidator } from '@navikt/sif-validation';
import * as React from 'react';
import { useIntl } from 'react-intl';

import { getIntlFormErrorHandler } from '../../../src';
import { ISODateString } from '../../../src/components/formik-datepicker/dateFormatUtils';
import FormikValidationErrorSummary from '../../../src/components/formik-validation-error-summary/FormikValidationErrorSummary';
import { getTypedFormComponents } from '../../../src/components/getTypedFormComponents';
import { YesOrNo } from '../../../src/types';
import { ValidationError } from '../../../src/validation/types';
import { mockAnimalOptions, MockAnimals } from '../../mock-data';
import ExampleListAndDialog from './ExampleListAndDialog';

enum Fields {
    checked = 'checked',
    date = 'date',
    checkboxes = 'checkboxes',
    confirmation = 'confirmation',
    country = 'country',
    vedlegg = 'vedlegg',
    name = 'name',
    group = 'group',
    radio = 'radio',
    select = 'select',
    description = 'description',
    time = 'time',
    yesOrNo = 'yesOrNo',
    dateRange_from = 'dateRange_from',
    dateRange_to = 'dateRange_to',
    list = 'list',
}
interface FieldValues {
    [Fields.checked]?: boolean;
    [Fields.date]?: ISODateString;
    [Fields.checkboxes]?: string[];
    [Fields.confirmation]?: boolean;
    [Fields.country]?: string;
    [Fields.vedlegg]?: string[];
    [Fields.name]?: string;
    [Fields.group]?: string;
    [Fields.radio]?: MockAnimals;
    [Fields.description]?: string;
    [Fields.yesOrNo]?: YesOrNo;
    [Fields.dateRange_from]?: Date;
    [Fields.dateRange_to]?: Date;
    [Fields.list]?: any[];
}

const Form = getTypedFormComponents<Fields, FieldValues, ValidationError>();

const ExampleForm: React.FunctionComponent = () => {
    const intl = useIntl();

    return (
        <Panel border={true} style={{ margin: '1rem' }}>
            <Heading size="medium">Example form</Heading>
            <Form.FormikWrapper
                initialValues={{}}
                onSubmit={(values) => console.log(values)}
                renderForm={({ values }) => {
                    return (
                        <Form.Form
                            includeButtons={true}
                            onValidSubmit={() => console.log('submit')}
                            onCancel={() => console.log('cancel')}
                            formErrorHandler={getIntlFormErrorHandler(intl)}>
                            <Box marginBlock="space-32">
                                <Form.DatePicker name={Fields.date} label="Choose a date" />
                            </Box>
                            <Box marginBlock="space-32">
                                <Form.Checkbox
                                    name={Fields.checked}
                                    label="Check this"
                                    description="What"
                                    validate={getCheckedValidator()}
                                />
                            </Box>
                            <Box marginBlock="space-32">
                                <ExampleListAndDialog
                                    name={Fields.list}
                                    labels={{ addLabel: 'Legg til', modalTitle: 'Some title', listTitle: 'Some items' }}
                                />
                            </Box>
                            <Box marginBlock="space-32">
                                <Form.CheckboxGroup
                                    name={Fields.checkboxes}
                                    legend="Favourite animals"
                                    description="Choose any animal, just not the cat."
                                    checkboxes={[
                                        { label: 'Dog', value: MockAnimals.dog },
                                        { label: 'Cat', value: MockAnimals.cat, disabled: true },
                                        { label: 'Fish', value: MockAnimals.fish },
                                    ]}
                                    validate={getCheckedValidator()}
                                />
                            </Box>
                            <Box marginBlock="space-32">
                                <Form.CountrySelect name={Fields.country} label="Which country is the best for cats?" />
                            </Box>
                            <Box marginBlock="space-32">
                                <Form.TextField
                                    name={Fields.name}
                                    label="What is the name of the beast?"
                                    description="Yes, I do refer to the cat ..."
                                    width="l"
                                />
                            </Box>
                            <Box marginBlock="space-32">
                                <Form.YesOrNoQuestion
                                    name={Fields.yesOrNo}
                                    legend="Do you want more questions?"
                                    labels={{ no: 'No', yes: 'Yes' }}
                                />
                            </Box>
                            {values.yesOrNo === YesOrNo.YES && (
                                <Box marginBlock="space-32">
                                    <Panel border={true}>
                                        <Form.InputGroup name={Fields.group} legend="Some more questions then">
                                            Some content in this group
                                            <Box marginBlock="space-32">
                                                <Form.Textarea
                                                    name={Fields.description}
                                                    label="Please type some words"
                                                    maxLength={200}
                                                />
                                            </Box>
                                            <Box marginBlock="space-32">
                                                <Form.TimeInput label="What's the time?" name={Fields.time} />
                                            </Box>
                                        </Form.InputGroup>
                                    </Panel>
                                </Box>
                            )}
                            <Box marginBlock="space-32">
                                <Form.Select
                                    label="Choose ONE animal"
                                    name={Fields.select}
                                    validate={getRequiredFieldValidator()}>
                                    <option></option>
                                    {mockAnimalOptions.map((a) => (
                                        <option key={a.value} value={a.value}>
                                            {a.label}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Box>
                            <Box marginBlock="space-32">
                                <Form.DateRangePicker
                                    legend="Choose some daterange"
                                    fromInputProps={{ label: 'Daterange from', name: Fields.dateRange_from }}
                                    toInputProps={{ label: 'Daterange to', name: Fields.dateRange_to }}
                                />
                            </Box>
                            <Box marginBlock="space-32">
                                <Form.RadioGroup
                                    legend="Choose ONE animal"
                                    name={Fields.radio}
                                    radios={mockAnimalOptions}
                                    validate={getCheckedValidator()}
                                />
                            </Box>
                            <Box marginBlock="space-32">
                                <Form.ConfirmationCheckbox
                                    name={Fields.confirmation}
                                    label="I confirm"
                                    validate={getCheckedValidator()}>
                                    Please confirm that you do not like cats
                                </Form.ConfirmationCheckbox>
                            </Box>
                            <FormikValidationErrorSummary
                                wrapper={(summary) => <Box marginBlock="space-32">{summary}</Box>}
                            />
                        </Form.Form>
                    );
                }}
            />
        </Panel>
    );
};

export default ExampleForm;
