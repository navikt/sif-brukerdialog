import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { Button, VStack } from '@navikt/ds-react';
import { FormLayout } from '@navikt/sif-common-ui';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';
import { useState } from 'react';

import { BostedUtland } from '../../../dialog-forms/bosted-utland';
import { BostedUtlandFormDialog } from '../../../dialog-forms/bosted-utland/BostedUtlandDialog';
import { BostedUtlandSøknadsdata } from '../../types/Søknadsdata';
import { toBostedUtlandStegFormValues, toBostedUtlandStegSøknadsdata } from './bostedUtlandStegUtils';

export enum BostedUtlandFormFields {
    harBoddIUtlandetSiste5år = 'harBoddIUtlandetSiste5år',
    bosteder = 'bosteder',
}

export interface BostedUtlandFormValues extends StepFormValues {
    [BostedUtlandFormFields.harBoddIUtlandetSiste5år]?: YesOrNo;
    [BostedUtlandFormFields.bosteder]?: BostedUtland[];
}

const { YesOrNoQuestion } = createSifFormComponents<BostedUtlandFormValues>();

const stepId = SøknadStepId.BOSTED_UTLAND;

export const BostedUtlandForm = () => {
    const { validateField } = useSifValidate();
    const [dialogOpen, setDialogOpen] = useState(false);

    const defaultValues = useStepDefaultValues<BostedUtlandFormValues, BostedUtlandSøknadsdata>({
        stepId,
        toFormValues: toBostedUtlandStegFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<BostedUtlandFormValues, BostedUtlandSøknadsdata>({
        stepId,
        toSøknadsdata: toBostedUtlandStegSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);
    const harBoddIUtlandetSiste5år = methods.watch(BostedUtlandFormFields.harBoddIUtlandetSiste5år);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Questions>
                <YesOrNoQuestion
                    name={BostedUtlandFormFields.harBoddIUtlandetSiste5år}
                    legend="Har du bodd i utlandet de siste 5 årene?"
                    validate={validateField(BostedUtlandFormFields.harBoddIUtlandetSiste5år, getYesOrNoValidator())}
                />
                {harBoddIUtlandetSiste5år === YesOrNo.YES && (
                    <VStack>
                        <div>
                            <Button type="button" variant="secondary" size="small" onClick={() => setDialogOpen(true)}>
                                Vis dialog
                            </Button>
                        </div>
                        <BostedUtlandFormDialog
                            bosted={undefined}
                            isOpen={dialogOpen}
                            onValidSubmit={(values) => {
                                // eslint-disable-next-line no-console
                                console.log(values);
                                setDialogOpen(false);
                            }}
                            onCancel={() => setDialogOpen(false)}
                        />
                    </VStack>
                )}
            </FormLayout.Questions>
        </AppForm>
    );
};
