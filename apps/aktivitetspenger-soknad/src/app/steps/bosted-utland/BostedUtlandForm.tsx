import { SøknadStepId } from '@app/setup/config/SøknadStepId';
import { useSøknadMellomlagring, useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/søknad/AppForm';
import { Button, Heading, VStack } from '@navikt/ds-react';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { BostedUtland, BostedUtlandFormDialog, BostedUtlandList } from '@sif/soknad-forms';
import { FormLayout } from '@sif/soknad-ui';
import { useState } from 'react';

import { BostedUtlandSøknadsdata } from '../../types/Søknadsdata';
import { toBostedUtlandStegFormValues, toBostedUtlandStegSøknadsdata } from './bostedUtlandStegUtils';
import { BostedUtlandFormFields, BostedUtlandFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<BostedUtlandFormValues>();

const stepId = SøknadStepId.BOSTED_UTLAND;

const oppdaterBosteder = (bosteder: BostedUtland[] | undefined, bosted: BostedUtland) => {
    if (!bosteder) return [bosted];
    if (bosteder.map((b) => b.id).includes(bosted.id)) {
        return bosteder.map((b) => (b.id === bosted.id ? bosted : b));
    }
    return [...bosteder, bosted];
};

export const BostedUtlandForm = () => {
    const { validateField } = useSifValidate();
    const [dialogBosted, setDialogBosted] = useState<{ bosted: BostedUtland | undefined } | undefined>(undefined);
    const { lagreSøknadSteg } = useSøknadMellomlagring();

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

    methods.register(BostedUtlandFormFields.bosteder, {
        validate: (value) => {
            if (harBoddIUtlandetSiste5år === YesOrNo.YES) {
                return validateField(
                    BostedUtlandFormFields.bosteder,
                    getListValidator({ minItems: 1, required: true }),
                )(value);
            }
        },
    });

    const oppdaterBosted = (bosted: BostedUtland) => {
        methods.setValue(BostedUtlandFormFields.bosteder, oppdaterBosteder(bosteder, bosted));
        methods.trigger(BostedUtlandFormFields.bosteder);
        lagreSøknadSteg(stepId, methods.getValues());
    };

    const slettBosted = (bosted: BostedUtland) => {
        methods.setValue(
            BostedUtlandFormFields.bosteder,
            bosteder?.filter((b) => b.id !== bosted.id),
        );
        lagreSøknadSteg(stepId, methods.getValues());
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
                    <VStack gap="space-16">
                        <Heading size="xsmall" level="3">
                            Bosteder i utlandet siste 5 år
                        </Heading>
                        {bosteder && bosteder.length > 0 && (
                            <BostedUtlandList
                                bosteder={bosteder}
                                onEdit={(bosted) => setDialogBosted({ bosted })}
                                onDelete={slettBosted}
                            />
                        )}
                        <div>
                            <Button
                                id={BostedUtlandFormFields.bosteder}
                                type="button"
                                variant="secondary"
                                size="small"
                                onClick={() => setDialogBosted({ bosted: undefined })}>
                                Legg til bosted
                            </Button>
                        </div>
                        <BostedUtlandFormDialog
                            bosted={dialogBosted?.bosted}
                            alleBosteder={bosteder}
                            isOpen={dialogBosted !== undefined}
                            onValidSubmit={(bosted) => {
                                oppdaterBosted(bosted);
                                setDialogBosted(undefined);
                            }}
                            onCancel={() => setDialogBosted(undefined)}
                        />
                    </VStack>
                )}
            </FormLayout.Questions>
        </AppForm>
    );
};
