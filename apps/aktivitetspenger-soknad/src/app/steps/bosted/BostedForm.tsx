import { AppText, useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStepForm } from '@sif/soknad-app';
import { BostedSøknadsdata } from '@app/types/Soknadsdata';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { SøknadStep, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { SifInfoCard } from '@sif/soknad-ui';
import { FormLayout, SifGuidePanel } from '@sif/soknad-ui/components';
import { useForm } from 'react-hook-form';

import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';
import { BostedFormFields, BostedFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<BostedFormValues>();

const stepId = SøknadStepId.BOSTED;

export const BostedForm = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('bostedForm');

    const { lagretData, commit, draftFormValues } = useStepData<BostedSøknadsdata, BostedFormValues>(stepId);
    const methods = useForm<BostedFormValues>({ defaultValues: draftFormValues ?? toBostedFormValues(lagretData) });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const onSubmit = (data: BostedFormValues) => commit(toBostedSøknadsdata(data));

    const erBosattITrondheim = methods.watch(BostedFormFields.erBosattITrondheim);

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={false}>
                <FormLayout.Content>
                    <SifGuidePanel>
                        <AppText id="bostedSteg.veileder.tekst" />
                    </SifGuidePanel>
                    <FormLayout.Questions>
                        <YesOrNoQuestion
                            name={BostedFormFields.erBosattITrondheim}
                            legend={text('bostedSteg.spørsmål.erBosattITrondheim')}
                            validate={validateField(BostedFormFields.erBosattITrondheim, getYesOrNoValidator())}
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
