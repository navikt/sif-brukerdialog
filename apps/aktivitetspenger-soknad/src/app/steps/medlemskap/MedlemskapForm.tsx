import { AppText } from '@app/i18n';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { SøknadStepForm } from '@sif/soknad-app';
import { MedlemskapSøknadsdata } from '@app/types/Soknadsdata';
import { dateToISODate, getDateToday } from '@sif/utils';
import { getListValidator } from '@navikt/sif-validation';
import { useSifValidate } from '@sif/rhf';
import { SøknadStep, useMellomlagring, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { FormLayout, SifGuidePanel } from '@sif/soknad-ui';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { getMedlemskapSynlighet, yesOrNoToBoolean } from './medlemskapSynlighet';
import { toMedlemskapStegFormValues, toMedlemskapStegSøknadsdata } from './medlemskapStegUtils';
import { MedlemskapFormFields, MedlemskapFormValues } from './types';
import dayjs from 'dayjs';
import { HarBoddINorgeSporsmal } from './sporsmal/HarBoddINorgeSporsmal';
import { BostederUtlandSporsmal } from './sporsmal/BostederUtlandSporsmal';
import { HarJobbetUtenforNorgeSporsmal } from './sporsmal/HarJobbetUtenforNorgeSporsmal';
import { ArbeidsstederUtlandSporsmal } from './sporsmal/ArbeidsstederUtlandSporsmal';
import { HarJobbetINorgeSporsmal } from './sporsmal/HarJobbetINorgeSporsmal';

const stepId = SøknadStepId.MEDLEMSKAP;

const getMinDate = () => {
    return dateToISODate(dayjs(getDateToday()).subtract(5, 'year'));
};

export const MedlemskapForm = () => {
    const { validateField } = useSifValidate('medlemskapForm');

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
    const { unregister } = methods;

    const harBoddINorge = methods.watch(MedlemskapFormFields.harBoddINorge);
    const harJobbetINorge = methods.watch(MedlemskapFormFields.harJobbetINorge);
    const harJobbetUtenforNorge = methods.watch(MedlemskapFormFields.harJobbetUtenforNorge);
    const bostederUtenforNorge = methods.watch(MedlemskapFormFields.bostederUtenforNorge);
    const arbeidsstederUtenforNorge = methods.watch(MedlemskapFormFields.arbeidsstederUtenforNorge);

    const harJobbetINorgeSvar = yesOrNoToBoolean(harJobbetINorge);

    const synlig = getMedlemskapSynlighet({
        harBoddINorge: yesOrNoToBoolean(harBoddINorge),
        harJobbetINorge: harJobbetINorgeSvar,
        harJobbetUtenforNorge: yesOrNoToBoolean(harJobbetUtenforNorge),
    });

    const visBostederUtenforNorge = synlig.bostederUtenforNorge;
    const visArbeidsstederUtenforNorge = synlig.arbeidsstederUtenforNorge;

    if (visBostederUtenforNorge) {
        methods.register(MedlemskapFormFields.bostederUtenforNorge, {
            validate: validateField(
                MedlemskapFormFields.bostederUtenforNorge,
                getListValidator({ minItems: 1, required: true }),
            ),
        });
    }
    if (visArbeidsstederUtenforNorge) {
        methods.register(MedlemskapFormFields.arbeidsstederUtenforNorge, {
            validate: validateField(
                MedlemskapFormFields.arbeidsstederUtenforNorge,
                getListValidator({ minItems: 1, required: true }),
            ),
        });
    }

    useEffect(() => {
        if (!visBostederUtenforNorge) {
            unregister(MedlemskapFormFields.bostederUtenforNorge);
        }
        if (!visArbeidsstederUtenforNorge) {
            unregister(MedlemskapFormFields.arbeidsstederUtenforNorge);
        }
    }, [unregister, visArbeidsstederUtenforNorge, visBostederUtenforNorge]);

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

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={false}>
                <FormLayout.Content>
                    <SifGuidePanel>
                        <AppText id="medlemskapSteg.veileder.tekst.1" />
                    </SifGuidePanel>
                    <FormLayout.Questions>
                        <HarBoddINorgeSporsmal />

                        {/* Jobbet i Norge */}
                        {synlig.harJobbetINorge && <HarJobbetINorgeSporsmal />}

                        {/* Jobbet utenfor Norge */}
                        {synlig.harJobbetUtenforNorge && (
                            <HarJobbetUtenforNorgeSporsmal harJobbetINorge={harJobbetINorgeSvar === true} />
                        )}

                        {/* Bosteder utenfor Norge */}
                        {synlig.bostederUtenforNorge && (
                            <BostederUtlandSporsmal
                                minDate={minDate}
                                maxDate={maxDate}
                                bostederUtenforNorge={bostederUtenforNorge}
                                onChange={oppdaterBosteder}
                            />
                        )}

                        {/* Arbeidssteder utenfor Norge */}
                        {synlig.arbeidsstederUtenforNorge && (
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
