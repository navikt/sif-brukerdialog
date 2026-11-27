import { MockStegSøknadsdata } from '@app/types/Soknadsdata';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStep, SøknadStepForm, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { FormLayout } from '@sif/soknad-ui/components';
import { useForm } from 'react-hook-form';

type MockFormValues = Record<string, never>;

export const MockSteg = ({ stepId }: { stepId: SøknadStepId }) => {
    const { commit, draftFormValues } = useStepData<MockStegSøknadsdata, MockFormValues>(stepId);
    const methods = useForm<MockFormValues>({
        defaultValues: draftFormValues ?? {},
    });
    useSaveSøknadFormValues(stepId, methods.getValues);

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={() => commit({ mock: true })}>
                <FormLayout.Content>
                    <></>
                </FormLayout.Content>
            </SøknadStepForm>
        </SøknadStep>
    );
};
