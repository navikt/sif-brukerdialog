import { Heading, Panel } from '@navikt/ds-react';
/* eslint-disable no-console */
import * as React from 'react';
import { useState } from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import MessagesPreview from '../../components/messages-preview/MessagesPreview';
import { date4YearsAgo, dateToday } from '@navikt/sif-common-utils';
import { TypedFormikForm, TypedFormikWrapper } from '@navikt/sif-common-formik-ds';
import { getListValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import { flatten } from 'flat';
import AnnetBarnForm, { AnnetBarnFormErrors } from '../../../src/forms/annet-barn/AnnetBarnForm';
import AnnetBarnListAndDialog from '../../../src/forms/annet-barn/AnnetBarnListAndDialog';
import annetBarnMessages from '../../../src/forms/annet-barn/annetBarnMessages';
import { AnnetBarn } from '../../../src/forms/annet-barn/types';
import SubmitPreview from '../../components/submit-preview/SubmitPreview';
import FormValidationErrorMessages from '../../components/validation-error-messages/ValidationErrorMessages';

enum FormField {
    'annetBarn' = 'annetBarn',
}

interface FormValues {
    [FormField.annetBarn]: AnnetBarn[];
}
const initialValues: FormValues = { annetBarn: [] };

const AnnetBarnExample = () => {
    const [singleFormValues, setSingleFormValues] = useState<Partial<AnnetBarn> | undefined>(undefined);
    const [listFormValues, setListFormValues] = useState<Partial<FormValues> | undefined>(undefined);
    const visBarnTypeValg = true;
    const annetBarn = listFormValues?.[FormField.annetBarn];
    const disallowedFødselsnumre = annetBarn ? annetBarn.map((barn) => barn.fnr) : undefined;

    return (
        <>
            <Block padBottom="l">
                <Heading size="medium" level="2">
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
                                submitButtonLabel="Valider skjema">
                                <AnnetBarnListAndDialog<FormField>
                                    name={FormField.annetBarn}
                                    validate={getListValidator({ required: true })}
                                    labels={{
                                        addLabel: 'Legg til barn',
                                        listTitle: 'Registrerte barn',
                                        modalTitle: 'Legg til barn',
                                        emptyListText: 'Ingen barn er lagt til',
                                    }}
                                    minDate={date4YearsAgo}
                                    maxDate={dateToday}
                                    visBarnTypeValg={visBarnTypeValg}
                                    disallowedFødselsnumre={disallowedFødselsnumre}
                                />
                            </TypedFormikForm>
                        );
                    }}
                />
                <SubmitPreview values={listFormValues} />
            </Panel>
            <Block margin="xxl" padBottom="l">
                <FormValidationErrorMessages
                    validationErrorIntlKeys={flatten(AnnetBarnFormErrors)}
                    formName={'annetBarn'}
                    intlMessages={annetBarnMessages}
                />
            </Block>
            <Block margin="xxl" padBottom="l">
                <Heading level="2" size="small">
                    Kun dialog
                </Heading>
            </Block>

            <Panel border={true}>
                <AnnetBarnForm
                    annetBarn={{}}
                    onSubmit={setSingleFormValues}
                    onCancel={() => {
                        console.log('cancel me');
                    }}
                    minDate={date4YearsAgo}
                    maxDate={dateToday}
                />
            </Panel>
            <SubmitPreview values={singleFormValues} />

            <MessagesPreview messages={annetBarnMessages} showExplanation={false} />
        </>
    );
};

export default AnnetBarnExample;
