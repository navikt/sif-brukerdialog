import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { Button, VStack } from '@navikt/ds-react';
import { Bosted } from '@navikt/k9-brukerdialog-prosessering-api';
import { FormLayout } from '@navikt/sif-common-ui';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';
import { useState } from 'react';

import { BostedUtlandFormDialog } from '../../../forms/bosted-utland/BostedUtlandDialog';
import { MedlemskapSøknadsdata } from '../../types/Søknadsdata';
import { toMedlemskapFormValues, toMedlemskapSøknadsdata } from './medlemskapStegUtils';

export enum MedlemskapFormFields {
    harBoddIUtlandetSiste5år = 'harBoddIUtlandetSiste5år',
    bosteder = 'bosteder',
}

export interface MedlemskapFormValues extends StepFormValues {
    [MedlemskapFormFields.harBoddIUtlandetSiste5år]?: YesOrNo;
    [MedlemskapFormFields.bosteder]?: Bosted[];
}

const { YesOrNoQuestion } = createSifFormComponents<MedlemskapFormValues>();

const stepId = SøknadStepId.MEDLEMSKAP;

export const MedlemskapForm = () => {
    const { validateField } = useSifValidate();
    const [dialogOpen, setDialogOpen] = useState(false);

    const defaultValues = useStepDefaultValues<MedlemskapFormValues, MedlemskapSøknadsdata>({
        stepId,
        toFormValues: toMedlemskapFormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<MedlemskapFormValues, MedlemskapSøknadsdata>({
        stepId,
        toSøknadsdata: toMedlemskapSøknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);
    const harBoddIUtlandetSiste5år = methods.watch(MedlemskapFormFields.harBoddIUtlandetSiste5år);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Questions>
                <YesOrNoQuestion
                    name={MedlemskapFormFields.harBoddIUtlandetSiste5år}
                    legend="Har du bodd i utlandet de siste 5 årene?"
                    validate={validateField(MedlemskapFormFields.harBoddIUtlandetSiste5år, getYesOrNoValidator())}
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
