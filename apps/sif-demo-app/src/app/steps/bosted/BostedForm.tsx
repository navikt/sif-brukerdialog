import { SøknadFormButtons, SøknadStepId, useSøknadForm, useStepDefaultValues, useStepSubmit } from '@app/setup';
import { Radio, RadioGroup } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { StepFormValues } from '@sif/soknad/types';

import { BostedSøknadsdata } from '../../types/Søknadsdata';
import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';

export enum BostedFormFields {
    borITrondheim = 'borITrondheim',
}

export interface BostedFormValues extends StepFormValues {
    [BostedFormFields.borITrondheim]?: 'ja' | 'nei';
}

const stepId = SøknadStepId.BOSTED;

export const BostedForm = () => {
    const defaultValues = useStepDefaultValues<BostedFormValues, BostedSøknadsdata>({
        stepId,
        toFormValues: toBostedFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<BostedFormValues, BostedSøknadsdata>({
        stepId,
        toSøknadsdata: toBostedSøknadsdata,
    });

    const { handleSubmit, setValue, watch } = useSøknadForm(stepId, defaultValues);

    const borITrondheim = watch(BostedFormFields.borITrondheim);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout.Content>
                <RadioGroup
                    legend="Bor du i Trondheim"
                    onChange={(value) => setValue(BostedFormFields.borITrondheim, value)}
                    value={borITrondheim}>
                    <Radio value="ja">Ja</Radio>
                    <Radio value="nei">Nei</Radio>
                </RadioGroup>
                <SøknadFormButtons stepId={stepId} isPending={isPending} />
            </FormLayout.Content>
        </form>
    );
};
