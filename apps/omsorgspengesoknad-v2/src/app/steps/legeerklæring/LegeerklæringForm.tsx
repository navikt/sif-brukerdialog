import { AppText } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { Alert } from '@navikt/ds-react';

import { getDefaultValues, LegeerklæringFormValues, toSøknadsdata } from './legeerklæringStegUtils';

export const LegeerklæringForm = () => {
    const stepId = SøknadStepId.LEGEERKLÆRING;
    const methods = useSøknadRhfForm<LegeerklæringFormValues>(stepId, getDefaultValues());
    const { onSubmit, isPending } = useStepSubmit({ stepId, toSøknadsdata });

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <Alert variant="info">
                <AppText id="legeerklæringSteg.info" />
            </Alert>
        </AppForm>
    );
};
