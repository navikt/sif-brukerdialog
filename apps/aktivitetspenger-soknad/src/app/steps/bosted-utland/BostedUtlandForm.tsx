import { AppText } from '@app/i18n';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStepForm } from '@sif/soknad-app';
import { BostedUtlandSøknadsdata } from '@app/types/Soknadsdata';
import { dateToISODate, getDateToday } from '@sif/utils';
import { getListValidator } from '@navikt/sif-validation';
import { useSifValidate, YesOrNo } from '@sif/rhf';
import { SøknadStep, useMellomlagring, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { FormLayout, SifGuidePanel } from '@sif/soknad-ui';
import { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { toBostedUtlandStegFormValues, toBostedUtlandStegSøknadsdata } from './bostedUtlandStegUtils';
import { BostedUtlandFormFields, BostedUtlandFormValues } from './types';
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

export const BostedUtlandForm = () => {
    const { validateField } = useSifValidate('bostedUtlandForm');

    const { lagretData, commit, draftFormValues } = useStepData<BostedUtlandSøknadsdata, BostedUtlandFormValues>(
        stepId,
    );
    const methods = useForm<BostedUtlandFormValues>({
        defaultValues: draftFormValues ?? toBostedUtlandStegFormValues(lagretData),
        shouldUnregister: true,
    });
    useSaveSøknadFormValues(stepId, methods.getValues);
    const { lagre } = useMellomlagring();

    const onSubmit = (data: BostedUtlandFormValues) => commit(toBostedUtlandStegSøknadsdata(data));

    const minDate = useMemo(() => getMinDate(), []);
    const maxDate = useMemo(() => getDateToday(), []);
    const { trigger } = methods;

    const harBoddINorge = methods.watch(BostedUtlandFormFields.harBoddINorge);
    const harJobbetINorge = methods.watch(BostedUtlandFormFields.harJobbetINorge);
    const harJobbetUtenforNorge = methods.watch(BostedUtlandFormFields.harJobbetUtenforNorge);
    const bostederUtenforNorge = methods.watch(BostedUtlandFormFields.bostederUtenforNorge);
    const arbeidsstederUtenforNorge = methods.watch(BostedUtlandFormFields.arbeidsstederUtenforNorge);

    const isMounted = useRef(false);

    methods.register(BostedUtlandFormFields.bostederUtenforNorge, {
        validate: (value) => {
            if (harBoddINorge === YesOrNo.NO) {
                return validateField(
                    BostedUtlandFormFields.bostederUtenforNorge,
                    getListValidator({ minItems: 1, required: true }),
                )(value);
            }
        },
    });
    methods.register(BostedUtlandFormFields.arbeidsstederUtenforNorge, {
        validate: (value) => {
            if (harJobbetUtenforNorge === YesOrNo.YES) {
                return validateField(
                    BostedUtlandFormFields.arbeidsstederUtenforNorge,
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
        trigger(BostedUtlandFormFields.bostederUtenforNorge);
    }, [harBoddINorge, trigger]);

    const oppdaterBosteder = (
        oppdaterteBosteder: BostedUtlandFormValues[typeof BostedUtlandFormFields.bostederUtenforNorge],
    ) => {
        methods.setValue(BostedUtlandFormFields.bostederUtenforNorge, oppdaterteBosteder);
        methods.trigger(BostedUtlandFormFields.bostederUtenforNorge);
        void lagre();
    };

    const oppdaterArbeidssteder = (
        oppdaterteArbeidssteder: BostedUtlandFormValues[typeof BostedUtlandFormFields.arbeidsstederUtenforNorge],
    ) => {
        methods.setValue(BostedUtlandFormFields.arbeidsstederUtenforNorge, oppdaterteArbeidssteder);
        methods.trigger(BostedUtlandFormFields.arbeidsstederUtenforNorge);
        void lagre();
    };

    const vis = (field: BostedUtlandFormFields) => {
        switch (field) {
            case BostedUtlandFormFields.harJobbetUtenforNorge:
                return (
                    harBoddINorge === YesOrNo.YES || (harBoddINorge === YesOrNo.NO && harJobbetINorge === YesOrNo.YES)
                );
            case BostedUtlandFormFields.harJobbetINorge:
                return harBoddINorge === YesOrNo.NO;

            case BostedUtlandFormFields.bostederUtenforNorge:
                return (
                    (harBoddINorge === YesOrNo.NO && harJobbetINorge === YesOrNo.NO) ||
                    (harBoddINorge === YesOrNo.NO &&
                        harJobbetINorge !== YesOrNo.YES &&
                        harJobbetUtenforNorge === YesOrNo.YES)
                );

            case BostedUtlandFormFields.arbeidsstederUtenforNorge:
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
                    <AppText id="bostedUtlandSteg.veileder.tekst.1" />
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
                                {vis(BostedUtlandFormFields.harJobbetINorge) && <HarJobbetINorgeSporsmal />}

                                {/* Jobbet utenfor Norge */}
                                {vis(BostedUtlandFormFields.harJobbetUtenforNorge) && (
                                    <HarJobbetUtenforNorgeSporsmal harJobbetINorge={harJobbetINorge === YesOrNo.YES} />
                                )}
                            </>
                        )}
                        {/* Bosteder utenfor Norge */}
                        {vis(BostedUtlandFormFields.bostederUtenforNorge) && (
                            <BostederUtlandSporsmal
                                minDate={minDate}
                                maxDate={maxDate}
                                bostederUtenforNorge={bostederUtenforNorge}
                                onChange={oppdaterBosteder}
                            />
                        )}

                        {/* Arbeidssteder utenfor Norge */}
                        {vis(BostedUtlandFormFields.arbeidsstederUtenforNorge) && (
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
