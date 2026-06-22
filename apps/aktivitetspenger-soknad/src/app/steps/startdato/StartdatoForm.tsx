import { useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStepForm } from '@sif/soknad-app';
import { StartdatoSøknadsdata } from '@app/types/Soknadsdata';
import { getDateValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';
import { SøknadStep, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { FormLayout } from '@sif/soknad-ui';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

import { toStartdatoFormValues, toStartdatoSøknadsdata } from './startdatoStegUtils';
import { StartdatoFormFields, StartdatoFormValues } from './types';

const { Datepicker } = createSifFormComponents<StartdatoFormValues>();

const stepId = SøknadStepId.STARTDATO;
// Utvider periode for startdato pga testing. Startdato skal tas
// bort senere i utviklingen av denne søknaden.
const minDate = dayjs().subtract(4, 'year').startOf('day').toDate();
const maxDate = dayjs().add(4, 'years').endOf('day').toDate();
export const StartdatoForm = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('startdatoForm');

    const { lagretData, commit, draftFormValues } = useStepData<StartdatoSøknadsdata, StartdatoFormValues>(stepId);
    const methods = useForm<StartdatoFormValues>({
        defaultValues: draftFormValues ?? toStartdatoFormValues(lagretData),
    });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const onSubmit = (data: StartdatoFormValues) => commit(toStartdatoSøknadsdata(data));

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={false}>
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
            </SøknadStepForm>
        </SøknadStep>
    );
};
