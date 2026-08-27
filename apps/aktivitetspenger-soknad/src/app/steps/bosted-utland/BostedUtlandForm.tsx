import { AppText, useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStepForm } from '@sif/soknad-app';
import { BostedUtlandSøknadsdata } from '@app/types/Soknadsdata';
import { BodyLong, Heading, ReadMore, VStack } from '@navikt/ds-react';
import { dateToISODate, getDateToday } from '@sif/utils';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate, YesOrNo } from '@sif/rhf';
import { SøknadStep, useMellomlagring, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { BostedUtlandListAndDialog } from '@sif/soknad-forms';
import { FormLayout, SifGuidePanel } from '@sif/soknad-ui';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { toBostedUtlandStegFormValues, toBostedUtlandStegSøknadsdata } from './bostedUtlandStegUtils';
import { BostedUtlandFormFields, BostedUtlandFormValues } from './types';
import dayjs from 'dayjs';
import { Todo } from '../../components/Todo';

const { YesOrNoQuestion } = createSifFormComponents<BostedUtlandFormValues>();

const stepId = SøknadStepId.BOSTED_UTLAND;

const getMinDate = () => {
    return dateToISODate(dayjs(getDateToday()).subtract(5, 'year'));
};

export const BostedUtlandForm = () => {
    const { text } = useAppIntl();
    const { validateField } = useSifValidate('bostedUtlandForm');

    const { lagretData, commit, draftFormValues } = useStepData<BostedUtlandSøknadsdata, BostedUtlandFormValues>(
        stepId,
    );
    const methods = useForm<BostedUtlandFormValues>({
        defaultValues: draftFormValues ?? toBostedUtlandStegFormValues(lagretData),
    });
    useSaveSøknadFormValues(stepId, methods.getValues);
    const { lagre } = useMellomlagring();

    const onSubmit = (data: BostedUtlandFormValues) => commit(toBostedUtlandStegSøknadsdata(data));

    const minDate = useMemo(() => getMinDate(), []);
    const maxDate = useMemo(() => getDateToday(), []);
    const { trigger } = methods;
    const harBoddINorge = methods.watch(BostedUtlandFormFields.harBoddINorge);
    const bosteder = methods.watch(BostedUtlandFormFields.bosteder);

    methods.register(BostedUtlandFormFields.bosteder, {
        validate: (value) => {
            if (harBoddINorge === YesOrNo.NO) {
                return validateField(
                    BostedUtlandFormFields.bosteder,
                    getListValidator({ minItems: 1, required: true }),
                )(value);
            }
        },
    });

    useEffect(() => {
        trigger(BostedUtlandFormFields.bosteder);
    }, [harBoddINorge, trigger]);

    const oppdaterBosteder = (oppdaterteBosteder: BostedUtlandFormValues[typeof BostedUtlandFormFields.bosteder]) => {
        methods.setValue(BostedUtlandFormFields.bosteder, oppdaterteBosteder);
        methods.trigger(BostedUtlandFormFields.bosteder);
        void lagre();
    };

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={false}>
                <Todo spacing={false}>
                    Tekster og spørsmål er i hovedsak hentet fra AAP, og kan bli justert. Spørsmål om jobb i utlandet er
                    ikke tatt inn enda.
                </Todo>
                <SifGuidePanel>
                    <AppText id="bostedUtlandSteg.veileder.tekst.1" />
                </SifGuidePanel>
                <FormLayout.Content>
                    <FormLayout.Questions>
                        <YesOrNoQuestion
                            name={BostedUtlandFormFields.harBoddINorge}
                            legend={text('bostedUtlandSteg.spørsmål.harBoddINorge')}
                            validate={validateField(BostedUtlandFormFields.harBoddINorge, getYesOrNoValidator())}
                            description={
                                <ReadMore header={text('bostedUtlandSteg.spørsmål.readMore.tittel')}>
                                    <AppText id="bostedUtlandSteg.spørsmål.readMore.tekst" />
                                </ReadMore>
                            }
                        />
                        {harBoddINorge === YesOrNo.NO && (
                            <FormLayout.Panel bleedTop={true}>
                                <VStack gap="space-16">
                                    <Heading size="xsmall" level="3">
                                        <AppText id="bostedUtlandSteg.bosteder.tittel" />
                                    </Heading>
                                    <BodyLong>
                                        <AppText id="bostedUtlandSteg.bosteder.info.1" />
                                    </BodyLong>
                                    <BostedUtlandListAndDialog
                                        minDate={minDate}
                                        maxDate={maxDate}
                                        bosteder={bosteder}
                                        addButtonId={BostedUtlandFormFields.bosteder}
                                        addButtonLabel={<AppText id="bostedUtlandSteg.bosteder.leggTil" />}
                                        onChange={oppdaterBosteder}
                                    />
                                </VStack>
                            </FormLayout.Panel>
                        )}
                    </FormLayout.Questions>
                </FormLayout.Content>
            </SøknadStepForm>
        </SøknadStep>
    );
};
