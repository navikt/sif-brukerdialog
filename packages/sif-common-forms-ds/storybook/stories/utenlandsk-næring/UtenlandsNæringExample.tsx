import { Heading, Panel } from '@navikt/ds-react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
// import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
// import DialogFormWrapper from '@navikt/sif-common-formik-ds/src/components/formik-modal-form-and-list/dialog-form-wrapper/DialogFormWrapper';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { flatten } from 'flat';
import { UtenlandskNæring } from '../../../src/forms/utenlandsk-næring';
import UtenlandskNæringForm, {
    UtenlandskNæringFormErrors,
} from '../../../src/forms/utenlandsk-næring/UtenlandskNæringForm';
import UtenlandskNæringListAndDialog from '../../../src/forms/utenlandsk-næring/UtenlandskNæringListAndDialog';
import utenlandskNæringMessages from '../../../src/forms/utenlandsk-næring/utenlandskNæringMessages';
import MessagesPreview from '../../components/messages-preview/MessagesPreview';
import SubmitPreview from '../../components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../components/validation-error-messages/ValidationErrorMessages';

enum FormField {
    'utenlandskNæring' = 'utenlandskNæring',
}

interface FormValues {
    [FormField.utenlandskNæring]: UtenlandskNæring[];
}
const initialValues: FormValues = {
    utenlandskNæring: [],
};

const UtenlandskNæringExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<UtenlandskNæring> | undefined>(undefined);
    const [listFormValues, setListFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const intl = useIntl();
    return (
        <>
            <Block padBottom="l">
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
                                <UtenlandskNæringListAndDialog
                                    name={FormField.utenlandskNæring}
                                    validate={getListValidator({ required: true })}
                                    labels={{
                                        addLabel: 'Legg til næringsvirksomhet i et annet EØS-land',
                                        deleteLabel: 'Fjern',
                                        editLabel: 'Endre',
                                        infoTitle: 'Virksomhet',
                                        modalTitle: 'Virksomhet',
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
                    validationErrorIntlKeys={flatten(UtenlandskNæringFormErrors)}
                    intlMessages={utenlandskNæringMessages}
                />
            </Block>

            <Block margin="xxl" padBottom="l">
                <Heading level="2" size="small">
                    Kun dialog
                </Heading>
            </Block>

            <Block>
                <Panel border={true}>
                    <UtenlandskNæringForm
                        utenlandskNæring={initialValues.utenlandskNæring[0]}
                        onSubmit={setSingleFormValues}
                        onCancel={null}
                    />
                    <SubmitPreview values={singleFormValues} />
                </Panel>
            </Block>

            <MessagesPreview messages={utenlandskNæringMessages} showExplanation={false} />
        </>
    );
};

export default UtenlandskNæringExample;
