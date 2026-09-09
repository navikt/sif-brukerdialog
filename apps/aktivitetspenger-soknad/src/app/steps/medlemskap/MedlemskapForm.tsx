import { AppText } from '@app/i18n';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStepForm } from '@sif/soknad-app';
import { MedlemskapSøknadsdata } from '@app/types/Soknadsdata';
import { dateToISODate, getDateToday } from '@sif/utils';
import { getListValidator } from '@navikt/sif-validation';
import { useSifValidate, YesOrNo } from '@sif/rhf';
import { SøknadStep, useMellomlagring, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { FormLayout, SifGuidePanel } from '@sif/soknad-ui';
import { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { toMedlemskapStegFormValues, toMedlemskapStegSøknadsdata } from './medlemskapStegUtils';
import { MedlemskapFormFields, MedlemskapFormValues } from './types';
import dayjs from 'dayjs';
import { Todo } from '../../components/Todo';
import { HarBoddINorgeSporsmal } from './sporsmal/HarBoddINorgeSporsmal';
import { BostederUtlandSporsmal } from './sporsmal/BostederUtlandSporsmal';
import { HarJobbetUtenforNorgeSporsmal } from './sporsmal/HarJobbetUtenforNorgeSporsmal';
import { ArbeidsstederUtlandSporsmal } from './sporsmal/ArbeidsstederUtlandSporsmal';
import { HarJobbetINorgeSporsmal } from './sporsmal/HarJobbetINorgeSporsmal';

const stepId = SøknadStepId.BOSTED_UTLAND;

const getMinDate = () => {
    return dateToISODate(dayjs(getDateToday()).subtract(5, 'year'));
};

export const MedlemskapForm = () => {
    const { validateField } = useSifValidate('bostedUtlandForm');

    const { lagretData, commit, draftFormValues } = useStepData<MedlemskapSøknadsdata, MedlemskapFormValues>(stepId);
    const methods = useForm<MedlemskapFormValues>({
        defaultValues: draftFormValues ?? toMedlemskapStegFormValues(lagretData),
        shouldUnregister: true,
    });
    useSaveSøknadFormValues(stepId, methods.getValues);
    const { lagre } = useMellomlagring();

    const onSubmit = (data: MedlemskapFormValues) => commit(toMedlemskapStegSøknadsdata(data));

    const minDate = useMemo(() => getMinDate(), []);
    const maxDate = useMemo(() => getDateToday(), []);
    const { trigger } = methods;

    const harBoddINorge = methods.watch(MedlemskapFormFields.harBoddINorge);
    const harJobbetINorge = methods.watch(MedlemskapFormFields.harJobbetINorge);
    const harJobbetUtenforNorge = methods.watch(MedlemskapFormFields.harJobbetUtenforNorge);
    const bostederUtenforNorge = methods.watch(MedlemskapFormFields.bostederUtenforNorge);
    const arbeidsstederUtenforNorge = methods.watch(MedlemskapFormFields.arbeidsstederUtenforNorge);

    const isMounted = useRef(false);

    methods.register(MedlemskapFormFields.bostederUtenforNorge, {
        validate: (value) => {
            if (harBoddINorge === YesOrNo.NO) {
                return validateField(
                    MedlemskapFormFields.bostederUtenforNorge,
                    getListValidator({ minItems: 1, required: true }),
                )(value);
            }
        },
    });
    methods.register(MedlemskapFormFields.arbeidsstederUtenforNorge, {
        validate: (value) => {
            if (harJobbetUtenforNorge === YesOrNo.YES) {
                return validateField(
                    MedlemskapFormFields.arbeidsstederUtenforNorge,
                    getListValidator({ minItems: 1, required: true }),
                )(value);
            }
        },
    });

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        trigger(MedlemskapFormFields.bostederUtenforNorge);
    }, [harBoddINorge, trigger]);

    const oppdaterBosteder = (
        oppdaterteBosteder: MedlemskapFormValues[typeof MedlemskapFormFields.bostederUtenforNorge],
    ) => {
        methods.setValue(MedlemskapFormFields.bostederUtenforNorge, oppdaterteBosteder);
        methods.trigger(MedlemskapFormFields.bostederUtenforNorge);
        void lagre();
    };

    const oppdaterArbeidssteder = (
        oppdaterteArbeidssteder: MedlemskapFormValues[typeof MedlemskapFormFields.arbeidsstederUtenforNorge],
    ) => {
        methods.setValue(MedlemskapFormFields.arbeidsstederUtenforNorge, oppdaterteArbeidssteder);
        methods.trigger(MedlemskapFormFields.arbeidsstederUtenforNorge);
        void lagre();
    };

    const vis = (field: MedlemskapFormFields) => {
        switch (field) {
            case MedlemskapFormFields.harJobbetUtenforNorge:
                return (
                    harBoddINorge === YesOrNo.YES || (harBoddINorge === YesOrNo.NO && harJobbetINorge === YesOrNo.YES)
                );
            case MedlemskapFormFields.harJobbetINorge:
                return harBoddINorge === YesOrNo.NO;

            case MedlemskapFormFields.bostederUtenforNorge:
                return (
                    (harBoddINorge === YesOrNo.NO && harJobbetINorge === YesOrNo.NO) ||
                    (harBoddINorge === YesOrNo.NO &&
                        harJobbetINorge !== YesOrNo.YES &&
                        harJobbetUtenforNorge === YesOrNo.YES)
                );

            case MedlemskapFormFields.arbeidsstederUtenforNorge:
                return harJobbetUtenforNorge === YesOrNo.YES;
            default:
                return false;
        }
    };

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={false}>
                <Todo spacing={false}>
                    Tekster og spørsmål er i hovedsak hentet fra AAP, og kan bli justert. Spørsmål om jobb i utlandet er
                    ikke tatt inn enda.
                </Todo>
                <SifGuidePanel>
                    <AppText id="medlemskapSteg.veileder.tekst.1" />
                </SifGuidePanel>
                <FormLayout.Content>
                    <FormLayout.Questions>
                        <HarBoddINorgeSporsmal />

                        {harBoddINorge === YesOrNo.YES ? (
                            <>
                                <HarJobbetUtenforNorgeSporsmal harJobbetINorge={harJobbetINorge === YesOrNo.YES} />
                            </>
                        ) : (
                            <>
                                {/* Jobbet i Norge */}
                                {vis(MedlemskapFormFields.harJobbetINorge) && <HarJobbetINorgeSporsmal />}

                                {/* Jobbet utenfor Norge */}
                                {vis(MedlemskapFormFields.harJobbetUtenforNorge) && (
                                    <HarJobbetUtenforNorgeSporsmal harJobbetINorge={harJobbetINorge === YesOrNo.YES} />
                                )}
                            </>
                        )}
                        {/* Bosteder utenfor Norge */}
                        {vis(MedlemskapFormFields.bostederUtenforNorge) && (
                            <BostederUtlandSporsmal
                                minDate={minDate}
                                maxDate={maxDate}
                                bostederUtenforNorge={bostederUtenforNorge}
                                onChange={oppdaterBosteder}
                            />
                        )}

                        {/* Arbeidssteder utenfor Norge */}
                        {vis(MedlemskapFormFields.arbeidsstederUtenforNorge) && (
                            <ArbeidsstederUtlandSporsmal
                                minDate={minDate}
                                maxDate={maxDate}
                                arbeidsstederUtenforNorge={arbeidsstederUtenforNorge}
                                onChange={oppdaterArbeidssteder}
                            />
                        )}
                    </FormLayout.Questions>
                </FormLayout.Content>
            </SøknadStepForm>
        </SøknadStep>
    );
};
