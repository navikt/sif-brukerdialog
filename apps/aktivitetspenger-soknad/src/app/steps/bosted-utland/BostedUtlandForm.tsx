import { AppText, useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadMellomlagring, useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { BostedUtlandSøknadsdata } from '@app/types/Soknadsdata';
import { Heading, VStack } from '@navikt/ds-react';
import { getDateToday } from '@navikt/sif-common-utils';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { BostedUtlandListAndDialog } from '@sif/soknad-forms';
import { FormLayout } from '@sif/soknad-ui';
import { useEffect, useMemo } from 'react';

import { toBostedUtlandStegFormValues, toBostedUtlandStegSøknadsdata } from './bostedUtlandStegUtils';
import { BostedUtlandFormFields, BostedUtlandFormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<BostedUtlandFormValues>();

const stepId = SøknadStepId.BOSTED_UTLAND;

const getMinDate = () => {
    const minDate = getDateToday();
    minDate.setFullYear(minDate.getFullYear() - 5);
    minDate.setHours(0, 0, 0, 0);
    return minDate;
};

const getMaxDate = () => {
    const maxDate = getDateToday();
    maxDate.setHours(23, 59, 59, 999);
    return maxDate;
};

export const BostedUtlandForm = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('bostedUtlandForm');
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
    const minDate = useMemo(() => getMinDate(), []);
    const maxDate = useMemo(() => getMaxDate(), []);
    const { trigger } = methods;
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

    useEffect(() => {
        trigger(BostedUtlandFormFields.bosteder);
    }, [harBoddIUtlandetSiste5år, trigger]);

    const oppdaterBosteder = (oppdaterteBosteder: BostedUtlandFormValues[typeof BostedUtlandFormFields.bosteder]) => {
        methods.setValue(BostedUtlandFormFields.bosteder, oppdaterteBosteder);
        methods.trigger(BostedUtlandFormFields.bosteder);
        lagreSøknadSteg(stepId, methods.getValues());
    };

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Questions>
                <YesOrNoQuestion
                    name={BostedUtlandFormFields.harBoddIUtlandetSiste5år}
                    legend={text('bostedUtlandSteg.spørsmål.harBoddIUtlandetSiste5år')}
                    validate={validateField(BostedUtlandFormFields.harBoddIUtlandetSiste5år, getYesOrNoValidator())}
                />
                {harBoddIUtlandetSiste5år === YesOrNo.YES && (
                    <VStack gap="space-16">
                        <Heading size="xsmall" level="3">
                            <AppText id="bostedUtlandSteg.bosteder.tittel" />
                        </Heading>
                        <BostedUtlandListAndDialog
                            minDate={minDate}
                            maxDate={maxDate}
                            bosteder={bosteder}
                            addButtonId={BostedUtlandFormFields.bosteder}
                            addButtonLabel={<AppText id="bostedUtlandSteg.bosteder.leggTil" />}
                            onChange={oppdaterBosteder}
                        />
                    </VStack>
                )}
            </FormLayout.Questions>
        </AppForm>
    );
};
