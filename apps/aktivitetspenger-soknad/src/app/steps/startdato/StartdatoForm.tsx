import { useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { AppForm } from '@app/setup/soknad/AppForm';
import { StartdatoSøknadsdata } from '@app/types/Soknadsdata';
import { getDateValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { SøknadStep, useStepData } from '@sif/soknad-app';
import { FormLayout } from '@sif/soknad-ui';
import { useForm } from 'react-hook-form';

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

    const { lagretData, commit } = useStepData<StartdatoSøknadsdata>(stepId);
    const methods = useForm<StartdatoFormValues>({ defaultValues: toStartdatoFormValues(lagretData) });

    const onSubmit = (data: StartdatoFormValues) => commit(toStartdatoSøknadsdata(data));

    return (
        <SøknadStep stepId={stepId}>
            <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={false}>
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
        </SøknadStep>
    );
};
