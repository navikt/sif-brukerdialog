import { useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { StartdatoSøknadsdata } from '@app/types/Soknadsdata';
import { getDateValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { FormLayout } from '@sif/soknad-ui';

import { toStartdatoFormValues, toStartdatoSøknadsdata } from './startdatoStegUtils';
import { StartdatoFormFields, StartdatoFormValues } from './types';

const { Datepicker } = createSifFormComponents<StartdatoFormValues>();

const stepId = SøknadStepId.STARTDATO;
const currentYear = new Date().getFullYear();
const minDate = new Date(currentYear, 0, 1);
const maxDate = new Date(currentYear, 11, 31);

export const StartdatoForm = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('startdatoForm');

    const defaultValues = useStepDefaultValues<StartdatoFormValues, StartdatoSøknadsdata>({
        stepId,
        toFormValues: toStartdatoFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<StartdatoFormValues, StartdatoSøknadsdata>({
        stepId,
        toSøknadsdata: toStartdatoSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Content>
                <FormLayout.Questions>
                    <Datepicker
                        name={StartdatoFormFields.startdato}
                        label={text('startdatoSteg.startdato.label')}
                        minDate={minDate}
                        maxDate={maxDate}
                        validate={validateField(
                            StartdatoFormFields.startdato,
                            getDateValidator({ required: true, min: minDate, max: maxDate }),
                        )}
                    />
                </FormLayout.Questions>
            </FormLayout.Content>
        </AppForm>
    );
};