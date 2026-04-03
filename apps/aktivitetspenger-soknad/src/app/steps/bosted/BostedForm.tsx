import { useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { BostedSøknadsdata } from '@app/types/Soknadsdata';
import { BodyLong, Heading } from '@navikt/ds-react';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';

import { SifInfoCard } from '../../../../../../packages/sif-soknad-ui/src/components/sif-info-card/SifInfoCard';
import { toBostedFormValues, toBostedSøknadsdata } from './bostedStegUtils';
import { BostedFormFields, BostedFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<BostedFormValues>();

const stepId = SøknadStepId.BOSTED;

export const BostedForm = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('bostedForm');

    const defaultValues = useStepDefaultValues<BostedFormValues, BostedSøknadsdata>({
        stepId,
        toFormValues: toBostedFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<BostedFormValues, BostedSøknadsdata>({
        stepId,
        toSøknadsdata: toBostedSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);
    const borITrondheim = methods.watch(BostedFormFields.borITrondheim);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <YesOrNoQuestion
                name={BostedFormFields.borITrondheim}
                legend={text('bostedSteg.spørsmål.borITrondheim')}
                validate={validateField(BostedFormFields.borITrondheim, getYesOrNoValidator())}
            />
            {borITrondheim === YesOrNo.NO && (
                <SifInfoCard variant="warning">
                    <Heading level="3" size="small" spacing>
                        Når du ikke bor i Tronheim
                    </Heading>
                    <BodyLong spacing>Info</BodyLong>
                </SifInfoCard>
            )}
        </AppForm>
    );
};
