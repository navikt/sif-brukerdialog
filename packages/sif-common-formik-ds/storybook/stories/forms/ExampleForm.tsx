/* eslint-disable no-console */
import { Heading, Panel } from '@navikt/ds-react';
import * as React from 'react';
import { Accept } from 'react-dropzone';
import { useIntl } from 'react-intl';
import { getCheckedValidator, getRequiredFieldValidator } from '@navikt/sif-validation';
import { getIntlFormErrorHandler } from '../../../src';
import { ISODateString } from '../../../src/components/formik-datepicker/dateFormatUtils';
import FormikValidationErrorSummary from '../../../src/components/formik-validation-error-summary/FormikValidationErrorSummary';
import { getTypedFormComponents } from '../../../src/components/getTypedFormComponents';
import { YesOrNo } from '../../../src/types';
import { ValidationError } from '../../../src/validation/types';
import FormBlock from '../../components/form-block/FormBlock';
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
    const accept: Accept = {
        'image/png': ['.png'],
        'text/html': ['.html', '.htm'],
    };
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
                            <FormBlock>
                                <Form.DatePicker name={Fields.date} label="Choose a date" />
                            </FormBlock>
                            <FormBlock>
                                <Form.Checkbox
                                    name={Fields.checked}
                                    label={'Check this'}
                                    description={'What'}
                                    validate={getCheckedValidator()}
                                />
                            </FormBlock>
                            <FormBlock>
                                <ExampleListAndDialog
                                    name={Fields.list}
                                    labels={{ addLabel: 'Legg til', modalTitle: 'Some title', listTitle: 'Some items' }}
                                />
                            </FormBlock>
                            <FormBlock>
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
                            </FormBlock>
                            <FormBlock>
                                <Form.CountrySelect name={Fields.country} label="Which country is the best for cats?" />
                            </FormBlock>
                            <FormBlock>
                                <Form.TextField
                                    name={Fields.name}
                                    label="What is the name of the beast?"
                                    description="Yes, I do refer to the cat ..."
                                    width="l"
                                />
                            </FormBlock>
                            <FormBlock>
                                <Form.YesOrNoQuestion
                                    name={Fields.yesOrNo}
                                    legend={'Do you want more questions?'}
                                    labels={{ no: 'No', yes: 'Yes' }}
                                />
                            </FormBlock>
                            {values.yesOrNo === YesOrNo.YES && (
                                <FormBlock margin="l">
                                    <Panel border={true}>
                                        <Form.InputGroup name={Fields.group} legend="Some more questions then">
                                            Some content in this group
                                            <FormBlock>
                                                <Form.Textarea
                                                    name={Fields.description}
                                                    label="Please type some words"
                                                    maxLength={200}
                                                />
                                            </FormBlock>
                                            <FormBlock>
                                                <Form.TimeInput label="What's the time?" name={Fields.time} />
                                            </FormBlock>
                                        </Form.InputGroup>
                                    </Panel>
                                </FormBlock>
                            )}
                            <FormBlock>
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
                            </FormBlock>
                            <FormBlock>
                                <Form.DateRangePicker
                                    legend="Choose some daterange"
                                    fromInputProps={{ label: 'Daterange from', name: Fields.dateRange_from }}
                                    toInputProps={{ label: 'Daterange to', name: Fields.dateRange_to }}
                                />
                            </FormBlock>
                            <FormBlock>
                                <Form.RadioGroup
                                    legend="Choose ONE animal"
                                    name={Fields.radio}
                                    radios={mockAnimalOptions}
                                    validate={getCheckedValidator()}
                                />
                            </FormBlock>
                            <FormBlock>
                                <Form.ConfirmationCheckbox
                                    name={Fields.confirmation}
                                    label="I confirm"
                                    validate={getCheckedValidator()}>
                                    Please confirm that you do not like cats
                                </Form.ConfirmationCheckbox>
                            </FormBlock>
                            <FormikValidationErrorSummary wrapper={(summary) => <FormBlock>{summary}</FormBlock>} />
                        </Form.Form>
                    );
                }}
            />
        </Panel>
    );
};

export default ExampleForm;
