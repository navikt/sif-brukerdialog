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
import { BostedUtlandList } from '../../../dialog-forms/bosted-utland/BostedUtlandList';
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
    const [dialogBosted, setDialogBosted] = useState<{ bosted: BostedUtland | undefined } | undefined>(undefined);

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
    const bosteder = methods.watch(BostedUtlandFormFields.bosteder);

    const oppdaterBosted = (bosted: BostedUtland) => {
        methods.setValue(BostedUtlandFormFields.bosteder, [bosted]);
    };

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
                            <Button
                                type="button"
                                variant="secondary"
                                size="small"
                                onClick={() => setDialogBosted({ bosted: undefined })}>
                                Vis dialog
                            </Button>
                        </div>
                        <BostedUtlandFormDialog
                            bosted={dialogBosted?.bosted}
                            isOpen={dialogBosted !== undefined}
                            onValidSubmit={(bosted) => {
                                oppdaterBosted(bosted);
                                setDialogBosted(undefined);
                            }}
                            onCancel={() => setDialogBosted(undefined)}
                        />
                        <BostedUtlandList bosteder={bosteder || []} onEdit={(bosted) => setDialogBosted({ bosted })} />
                    </VStack>
                )}
            </FormLayout.Questions>
        </AppForm>
    );
};
