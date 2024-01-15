import { Heading, Panel } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { date1YearAgo, date1YearFromNow } from '@navikt/sif-common-utils';
import { flatten } from 'flat';
import OpptjeningUtlandForm, {
    OpptjeningUtlandFormErrors,
} from '../../../src/forms/opptjening-utland/OpptjeningUtlandForm';
import OpptjeningUtlandListAndDialog from '../../../src/forms/opptjening-utland/OpptjeningUtlandListAndDialog';
import opptjeningUtlandMessages from '../../../src/forms/opptjening-utland/opptjeningUtlandMessages';
import { OpptjeningUtland } from '../../../src/forms/opptjening-utland/types';
import MessagesPreview from '../../components/messages-preview/MessagesPreview';
import SubmitPreview from '../../components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../components/validation-error-messages/ValidationErrorMessages';

enum FormField {
    'opptjeningUtland' = 'opptjeningUtland',
}

interface FormValues {
    [FormField.opptjeningUtland]: OpptjeningUtland[];
}
const initialValues: FormValues = {
    opptjeningUtland: [],
};

const OpptjeningUtlandExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<OpptjeningUtland> | undefined>(undefined);
    const [listFormValues, setListFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const intl = useIntl();
    return (
        <>
            <Block>
                <Heading level="2" size="small">
                    Liste og dialog
                </Heading>
            </Block>
            <Panel border={true}>
                <TypedFormikWrapper<FormValues>
                    initialValues={initialValues}
                    onSubmit={setListFormValues}
                    renderForm={() => {
                        return (
                            <TypedFormikForm<FormValues, ValidationError>
                                includeButtons={true}
                                submitButtonLabel="Valider skjema"
                                formErrorHandler={getFormErrorHandler(intl)}>
                                <OpptjeningUtlandListAndDialog
                                    minDate={date1YearAgo}
                                    maxDate={date1YearFromNow}
                                    name={FormField.opptjeningUtland}
                                    validate={getListValidator({ required: true })}
                                    labels={{
                                        addLabel: 'Legg til jobb i annet EØS-land',
                                        listTitle: 'Registrert jobb i annet EØS-land',
                                        modalTitle: 'Jobb i annet EØS-land',
                                        emptyListText: 'Ingen jobb i annet EØS-land er lagt til',
                                    }}
                                />
                            </TypedFormikForm>
                        );
                    }}
                />
                <SubmitPreview values={listFormValues} />
            </Panel>

            <Block margin="xxl" padBottom="l">
                <FormValidationErrorMessages
                    validationErrorIntlKeys={flatten(OpptjeningUtlandFormErrors)}
                    intlMessages={opptjeningUtlandMessages}
                />
            </Block>

            <Block margin="xxl" padBottom="l">
                <Heading level="2" size="small">
                    Kun dialog
                </Heading>
            </Block>

            <Block>
                <Panel border={true}>
                    <OpptjeningUtlandForm
                        opptjening={initialValues.opptjeningUtland[0]}
                        minDate={date1YearAgo}
                        maxDate={date1YearFromNow}
                        onSubmit={setSingleFormValues}
                        onCancel={null}
                    />
                    <SubmitPreview values={singleFormValues} />
                </Panel>
            </Block>

            <MessagesPreview messages={opptjeningUtlandMessages} showExplanation={false} />
        </>
    );
};

export default OpptjeningUtlandExample;
