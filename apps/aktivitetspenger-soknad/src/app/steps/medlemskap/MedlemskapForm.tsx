import { AppText } from '@app/i18n';
import { MedlemskapSøknadsdata } from '@app/types/Soknadsdata';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { BodyLong, VStack } from '@navikt/ds-react';
import { SøknadStep, SøknadStepForm, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { FormLayout, SifGuidePanel } from '@sif/soknad-ui';
import { dateToISODate, getDateToday, yesOrNoToBoolean } from '@sif/utils';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { toMedlemskapStegFormValues, toMedlemskapStegSøknadsdata } from './medlemskapStegUtils';
import { getMedlemskapSynlighet } from './medlemskapSynlighet';
import { ArbeidsstederUtlandSporsmal } from './sporsmal/ArbeidsstederUtlandSporsmal';
import { BostederUtlandSporsmal } from './sporsmal/BostederUtlandSporsmal';
import { HarBoddINorgeSporsmal } from './sporsmal/HarBoddINorgeSporsmal';
import { HarJobbetINorgeSporsmal } from './sporsmal/HarJobbetINorgeSporsmal';
import { HarJobbetUtenforNorgeSporsmal } from './sporsmal/HarJobbetUtenforNorgeSporsmal';
import { MedlemskapFormValues } from './types';

const stepId = SøknadStepId.MEDLEMSKAP;

const getMinDate = () => {
    return dateToISODate(dayjs(getDateToday()).subtract(5, 'year'));
};

export const MedlemskapForm = () => {
    const { lagretData, commit, draftFormValues } = useStepData<MedlemskapSøknadsdata, MedlemskapFormValues>(stepId);
    const methods = useForm<MedlemskapFormValues>({
        defaultValues: draftFormValues ?? toMedlemskapStegFormValues(lagretData),
        shouldUnregister: true,
    });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const onSubmit = (data: MedlemskapFormValues) => commit(toMedlemskapStegSøknadsdata(data));

    const minDate = useMemo(() => getMinDate(), []);
    const maxDate = useMemo(() => getDateToday(), []);

    const harBoddINorge = methods.watch('harBoddINorge');
    const harJobbetINorge = methods.watch('harJobbetINorge');
    const harJobbetUtenforNorge = methods.watch('harJobbetUtenforNorge');

    const harJobbetINorgeSvar = yesOrNoToBoolean(harJobbetINorge);

    const synlig = getMedlemskapSynlighet({
        harBoddINorge: yesOrNoToBoolean(harBoddINorge),
        harJobbetINorge: harJobbetINorgeSvar,
        harJobbetUtenforNorge: yesOrNoToBoolean(harJobbetUtenforNorge),
    });

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit}>
                <FormLayout.Content>
                    <SifGuidePanel>
                        <VStack gap="space-16">
                            <BodyLong>
                                <AppText id="medlemskapSteg.veileder.tekst.1" />
                            </BodyLong>
                            <BodyLong>
                                <AppText id="medlemskapSteg.veileder.tekst.2" />
                            </BodyLong>
                        </VStack>
                    </SifGuidePanel>
                    <FormLayout.Questions>
                        {/* Bodd i Norge */}
                        <HarBoddINorgeSporsmal />

                        {/* Jobbet i Norge */}
                        {synlig.harJobbetINorge && <HarJobbetINorgeSporsmal />}

                        {/* Jobbet utenfor Norge */}
                        {synlig.harJobbetUtenforNorge && (
                            <HarJobbetUtenforNorgeSporsmal harJobbetINorge={harJobbetINorgeSvar} />
                        )}

                        {/* Bosteder utenfor Norge */}
                        {synlig.bostederUtenforNorge && <BostederUtlandSporsmal minDate={minDate} maxDate={maxDate} />}

                        {/* Arbeidssteder utenfor Norge */}
                        {synlig.arbeidsstederUtenforNorge && (
                            <ArbeidsstederUtlandSporsmal minDate={minDate} maxDate={maxDate} />
                        )}
                    </FormLayout.Questions>
                </FormLayout.Content>
            </SøknadStepForm>
        </SøknadStep>
    );
};
