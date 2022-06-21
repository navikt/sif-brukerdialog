/* eslint-disable no-console */
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import Box from '@navikt/sif-common-core/lib/components/box/Box';
import MessagesPreview from '@navikt/sif-common-core/lib/dev-utils/intl/messages-preview/MessagesPreview';
import { date1YearAgo, date1YearFromNow } from '@navikt/sif-common-core/lib/utils/dateUtils';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds/lib';
import { getListValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import flat from 'flat';
import { Utenlandsopphold } from '../../../src/forms/utenlandsopphold/types';
import UtenlandsoppholdForm, {
    UtlandsoppholdFormErrors,
} from '../../../src/forms/utenlandsopphold/UtenlandsoppholdForm';
import UtenlandsoppholdListAndDialog from '../../../src/forms/utenlandsopphold/UtenlandsoppholdListAndDialog';
import utenlandsoppholdMessages from '../../../src/forms/utenlandsopphold/utenlandsoppholdMessages';
import SubmitPreview from '../../components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../components/validation-error-messages/ValidationErrorMessages';
import { Heading, Panel } from '@navikt/ds-react';

enum FormField {
    'utenlandsopphold' = 'utenlandsopphold',
}

interface FormValues {
    [FormField.utenlandsopphold]: Utenlandsopphold[];
}
const initialValues: FormValues = {
    utenlandsopphold: [],
};

const UtenlandsoppholdExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<Utenlandsopphold> | undefined>(undefined);
    const [listFormValues, setListFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const intl = useIntl();
    return (
        <>
            <Box padBottom="l">
                <Heading level="2" size="small">
                    Liste og dialog
                </Heading>
            </Box>
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
                                <UtenlandsoppholdListAndDialog
                                    minDate={date1YearAgo}
                                    maxDate={date1YearFromNow}
                                    name={FormField.utenlandsopphold}
                                    validate={getListValidator({ required: true })}
                                    labels={{
                                        addLabel: 'Legg til utenlandsopphold',
                                        listTitle: 'Registrerte utenlandsopphold',
                                        modalTitle: 'Utenlandsopphold',
                                        emptyListText: 'Ingen utenlandsopphold er lagt til',
                                    }}
                                />
                            </TypedFormikForm>
                        );
                    }}
                />
                <SubmitPreview values={listFormValues} />
            </Panel>

            <Box margin="xxl" padBottom="l">
                <FormValidationErrorMessages
                    validationErrorIntlKeys={flat(UtlandsoppholdFormErrors)}
                    intlMessages={utenlandsoppholdMessages}
                />
            </Box>

            <Box margin="xxl" padBottom="l">
                <Heading level="2" size="small">
                    Kun dialog
                </Heading>
            </Box>

            <Panel border={true}>
                <UtenlandsoppholdForm
                    opphold={initialValues.utenlandsopphold[0]}
                    minDate={date1YearAgo}
                    maxDate={date1YearFromNow}
                    onSubmit={setSingleFormValues}
                    onCancel={() => console.log('cancel me')}
                />
                <SubmitPreview values={singleFormValues} />
            </Panel>

            <MessagesPreview messages={utenlandsoppholdMessages} showExplanation={false} />
        </>
    );
};

export default UtenlandsoppholdExample;
