import { AppText } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { Alert } from '@navikt/ds-react';

import { getDefaultValues, DeltBostedFormValues, toSøknadsdata } from './deltBostedStegUtils';

export const DeltBostedForm = () => {
    const stepId = SøknadStepId.DELT_BOSTED;
    const methods = useSøknadRhfForm<DeltBostedFormValues>(stepId, getDefaultValues());
    const { onSubmit, isPending } = useStepSubmit({ stepId, toSøknadsdata });

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <Alert variant="info">
                <AppText id="deltBostedSteg.info" />
            </Alert>
        </AppForm>
    );
};
