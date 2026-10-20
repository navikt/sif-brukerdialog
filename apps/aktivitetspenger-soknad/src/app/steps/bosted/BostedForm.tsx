import { AppText, useAppIntl } from '@app/i18n';
import { BostedSøknadsdata } from '@app/types/Soknadsdata';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { SøknadStep, SøknadStepForm, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { SifInfoCard } from '@sif/soknad-ui';
import { FormLayout, SifGuidePanel } from '@sif/soknad-ui/components';
import { getYesOrNoValidator } from '@sif/validation';
import { useForm } from 'react-hook-form';

import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';
import { BostedFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<BostedFormValues>();

const stepId = SøknadStepId.BOSTED;

export const BostedForm = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('bostedForm');

    const { lagretData, commit, draftFormValues } = useStepData<BostedSøknadsdata, BostedFormValues>(stepId);
    const methods = useForm<BostedFormValues>({ defaultValues: draftFormValues ?? toBostedFormValues(lagretData) });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const onSubmit = (data: BostedFormValues) => commit(toBostedSøknadsdata(data));

    const erBosattITrondheim = methods.watch('erBosattITrondheim');

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit}>
                <FormLayout.Content>
                    <SifGuidePanel>
                        <AppText id="bostedSteg.veileder.tekst" />
                    </SifGuidePanel>
                    <FormLayout.Questions>
                        <YesOrNoQuestion
                            name="erBosattITrondheim"
                            useCards={true}
                            legend={text('bostedSteg.spørsmål.erBosattITrondheim')}
                            validate={validateField('erBosattITrondheim', getYesOrNoValidator())}
                        />
                        {erBosattITrondheim === YesOrNo.NO && (
                            <SifInfoCard variant="warning">
                                <AppText id="bostedForm.borIkkeITrondheim.info" />
                            </SifInfoCard>
                        )}
                    </FormLayout.Questions>
                </FormLayout.Content>
            </SøknadStepForm>
        </SøknadStep>
    );
};
