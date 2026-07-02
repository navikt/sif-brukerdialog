import { useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { BostedSøknadsdata } from '@app/types/Soknadsdata';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { SøknadStep, SøknadStepForm, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { useForm } from 'react-hook-form';

import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';
import { BostedFormFields, BostedFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<BostedFormValues>();

const stepId = SøknadStepId.BOSTED;

export const BostedForm = () => {
    const { validateField } = useSifValidate('bostedForm');
    const { text } = useAppIntl();

    const { lagretData, commit, draftFormValues } = useStepData<BostedSøknadsdata, BostedFormValues>(stepId);
    const methods = useForm<BostedFormValues>({ defaultValues: draftFormValues ?? toBostedFormValues(lagretData) });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const onSubmit = (data: BostedFormValues) => commit(toBostedSøknadsdata(data));

    const erBosattITrondheim = methods.watch(BostedFormFields.erBosattITrondheim);

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={false}>
                <YesOrNoQuestion
                    name={BostedFormFields.erBosattITrondheim}
                    legend={text('bostedSteg.spørsmål.erBosattITrondheim')}
                    validate={validateField(BostedFormFields.erBosattITrondheim, getYesOrNoValidator())}
                />
                {erBosattITrondheim === YesOrNo.YES && (
                    <YesOrNoQuestion
                        name={BostedFormFields.borUtenforTrondheim}
                        legend={text('bostedSteg.spørsmål.borUtenforTrondheim')}
                        validate={validateField(BostedFormFields.borUtenforTrondheim, getYesOrNoValidator())}
                    />
                )}
            </SøknadStepForm>
        </SøknadStep>
    );
};
