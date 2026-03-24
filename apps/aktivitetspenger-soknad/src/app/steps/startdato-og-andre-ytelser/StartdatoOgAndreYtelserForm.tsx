import { useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { StartdatoOgAndreYtelserSøknadsdata } from '@app/types/Soknadsdata';
import { FormLayout } from '@navikt/sif-common-ui';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';

import {
    toStartdatoOgAndreYtelserFormValues,
    toStartdatoOgAndreYtelserSøknadsdata,
} from './startdatoOgAndreYtelserStegUtils';
import { StartdatoOgAndreYtelserFormFields, StartdatoOgAndreYtelserFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<StartdatoOgAndreYtelserFormValues>();

const stepId = SøknadStepId.STARTDATO_OG_ANDRE_YTELSER;

export const StartdatoOgAndreYtelserForm = () => {
    const { validateField } = useSifValidate();
    const { text } = useAppIntl();

    const defaultValues = useStepDefaultValues<StartdatoOgAndreYtelserFormValues, StartdatoOgAndreYtelserSøknadsdata>({
        stepId,
        toFormValues: toStartdatoOgAndreYtelserFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<
        StartdatoOgAndreYtelserFormValues,
        StartdatoOgAndreYtelserSøknadsdata
    >({
        stepId,
        toSøknadsdata: toStartdatoOgAndreYtelserSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Content>
                <FormLayout.Questions>
                    <YesOrNoQuestion
                        name={StartdatoOgAndreYtelserFormFields.harAndreYtelser}
                        legend={text('startdatoOgAndreYtelserSteg.spørsmål.harAndreYtelser')}
                        validate={validateField(
                            StartdatoOgAndreYtelserFormFields.harAndreYtelser,
                            getYesOrNoValidator(),
                        )}
                    />
                </FormLayout.Questions>
            </FormLayout.Content>
        </AppForm>
    );
};
