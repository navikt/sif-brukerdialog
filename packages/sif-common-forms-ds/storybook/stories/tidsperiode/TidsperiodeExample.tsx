/* eslint-disable no-console */
import * as React from 'react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import MessagesPreview from '../../components/messages-preview/MessagesPreview';
import { date1YearAgo, date1YearFromNow, dateToday } from '@navikt/sif-common-utils';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds/lib';
import { getListValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import flat from 'flat';
import { DateTidsperiode } from '../../../src/forms/tidsperiode';
import TidsperiodeForm, { TidsperiodeFormErrors } from '../../../src/forms/tidsperiode/TidsperiodeForm';
import TidsperiodeListAndDialog from '../../../src/forms/tidsperiode/TidsperiodeListAndDialog';
import tidsperiodeMessages from '../../../src/forms/tidsperiode/tidsperiodeMessages';
import SubmitPreview from '../../components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../components/validation-error-messages/ValidationErrorMessages';
import { Heading, Panel } from '@navikt/ds-react';

enum FormField {
    'tidsperiode' = 'tidsperiode',
}

interface FormValues {
    [FormField.tidsperiode]: DateTidsperiode[];
}
const initialValues: FormValues = { tidsperiode: [] };

const TidsperiodeExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<DateTidsperiode> | undefined>(undefined);
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
                                <TidsperiodeListAndDialog<FormField>
                                    name={FormField.tidsperiode}
                                    minDate={date1YearAgo}
                                    maxDate={dateToday}
                                    validate={getListValidator({ required: true })}
                                    labels={{
                                        addLabel: 'Legg til periode',
                                        listTitle: 'Registrerte periode',
                                        modalTitle: 'Periode',
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
                    validationErrorIntlKeys={flat(TidsperiodeFormErrors)}
                    intlMessages={tidsperiodeMessages}
                />
            </Block>

            <Block margin="xxl" padBottom="l">
                <Heading level="2" size="small">
                    Kun dialog
                </Heading>
            </Block>

            <Panel border={true}>
                <TidsperiodeForm
                    minDate={date1YearAgo}
                    maxDate={date1YearFromNow}
                    tidsperiode={{}}
                    onSubmit={setSingleFormValues}
                    onCancel={() => console.log('cancel me')}
                />
            </Panel>
            <SubmitPreview values={singleFormValues} />

            <MessagesPreview messages={tidsperiodeMessages} showExplanation={false} />
        </>
    );
};

export default TidsperiodeExample;
