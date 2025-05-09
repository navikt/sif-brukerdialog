import { Alert, VStack } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { FormikInputGroup, getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { getIntlFormErrorHandler } from '@navikt/sif-common-formik-ds';
import { Ferieuttak } from '@navikt/sif-common-forms-ds/src';
import FerieuttakListAndDialog from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/FerieuttakListAndDialog';
import { FormLayout } from '@navikt/sif-common-ui';
import { dateRangeUtils, getDateRangesBetweenDateRangesWithinDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { AppText, useAppIntl } from '../../../i18n';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { getBarnetsFødselsdato, getTillattSøknadsperiode } from '../../../utils/søknadsperiodeUtils';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { KursperiodeFormValues } from './kursperioder-form-part/KursperiodeQuestions';
import KursperioderFormPart from './kursperioder-form-part/KursperioderFormPart';
import {
    getDateRangesFromKursperiodeFormValues,
    getFerieperioderValidator,
    getKursStepInitialValues,
    getKursSøknadsdataFromFormValues,
    getSøknadsperiodeFromKursperioderFormValues,
} from './kursStepUtils';
import { Enkeltdato } from '@navikt/sif-common-forms-ds/src';
import ReisedagerFormPart from './ReisedagerFormPart';
import GodkjentHelseinstitusjonInfo from './GodkjentHelseinstitusjonInfo';
import ReiseInfo from './ReiseInfo';
import { useMemo } from 'react';

export enum KursFormFields {
    valgtOpplæringsinstitusjon = 'valgtOpplæringsinstitusjon',
    annenInstitusjon = 'annenInstitusjon',
    navnAnnenInstitusjon = 'navnAnnenInstitusjon',
    kursperioder = 'kursperioder',
    reiserUtenforKursdager = 'reiserUtenforKursdager',
    reisedager = 'reisedager',
    reisedagerBeskrivelse = 'reisedagerBeskrivelse',
    skalTaUtFerieIPerioden = 'skalTaUtFerieIPerioden',
    ferieuttak = 'ferieuttak',
}

export interface KursFormValues {
    [KursFormFields.valgtOpplæringsinstitusjon]?: string;
    [KursFormFields.annenInstitusjon]?: boolean;
    [KursFormFields.navnAnnenInstitusjon]?: string;
    [KursFormFields.kursperioder]: Partial<KursperiodeFormValues>[];
    [KursFormFields.reisedager]?: Enkeltdato[];
    [KursFormFields.reisedagerBeskrivelse]?: string;
    [KursFormFields.skalTaUtFerieIPerioden]?: YesOrNo;
    [KursFormFields.ferieuttak]?: Ferieuttak[];
    [KursFormFields.reiserUtenforKursdager]?: YesOrNo;
}

const { FormikWrapper, Form, YesOrNoQuestion, Combobox, Checkbox, TextField } = getTypedFormComponents<
    KursFormFields,
    KursFormValues,
    ValidationError
>();

const KursStep = () => {
    const { intl, text } = useAppIntl();

    const {
        state: { søknadsdata, institusjoner },
    } = useSøknadContext();

    const institusjonsnavn = institusjoner.map((institusjon) => institusjon.navn);
    const stepId = StepId.KURS;
    const step = getSøknadStepConfigForStep(stepId, søknadsdata);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const onValidSubmitHandler = (values) => {
        const kursSøknadsdata = getKursSøknadsdataFromFormValues(values, institusjoner);
        if (kursSøknadsdata) {
            clearStepFormValues(stepId);
            return [
                actionsCreator.setSøknadKurs(kursSøknadsdata),
                actionsCreator.syncArbeidstidMedKursperioder(kursSøknadsdata),
            ];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState({ ...state });
        },
    );

    const gyldigSøknadsperiode = getTillattSøknadsperiode(getBarnetsFødselsdato(søknadsdata.omBarnet));

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getKursStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values, setFieldValue }) => {
                    const søknadsperiode = useMemo(
                        () => getSøknadsperiodeFromKursperioderFormValues(values.kursperioder),
                        [values.kursperioder],
                    );

                    const kursperioder = useMemo(
                        () => getDateRangesFromKursperiodeFormValues(values.kursperioder),
                        [values.kursperioder],
                    );

                    const disabledDateRanges = useMemo(() => {
                        if (søknadsperiode) {
                            return getDateRangesBetweenDateRangesWithinDateRange(
                                søknadsperiode.from,
                                søknadsperiode.to,
                                kursperioder,
                            );
                        }
                        return [];
                    }, [søknadsperiode, kursperioder]);

                    const reiserUtenforKursdager = values[KursFormFields.reiserUtenforKursdager] === YesOrNo.YES;

                    const annenInstitusjon = values[KursFormFields.annenInstitusjon] === true;

                    const handleOnAnnenInstitusjonChange = (checked: boolean) => {
                        if (checked) {
                            setFieldValue(KursFormFields.valgtOpplæringsinstitusjon, '');
                        } else {
                            setFieldValue(KursFormFields.navnAnnenInstitusjon, '');
                        }
                    };

                    return (
                        <>
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'steg.kurs.validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                submitDisabled={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <VStack gap={'8'}>
                                    <SifGuidePanel>
                                        <p>
                                            <AppText id="steg.kurs.counsellorPanel.avsnitt.1" />
                                        </p>
                                        <p>
                                            <AppText id="steg.kurs.counsellorPanel.avsnitt.2" />
                                        </p>
                                        <GodkjentHelseinstitusjonInfo />
                                    </SifGuidePanel>

                                    <VStack gap={'1'}>
                                        <Combobox
                                            name={KursFormFields.valgtOpplæringsinstitusjon}
                                            allowNewValues={false}
                                            label={text('steg.kurs.opplæringsinstitusjon.label')}
                                            options={institusjonsnavn}
                                            shouldAutocomplete={false}
                                            maxLength={90}
                                            minLength={2}
                                            disabled={annenInstitusjon}
                                            isMultiSelect={false}
                                            initialValue={values[KursFormFields.valgtOpplæringsinstitusjon]}
                                            onSelect={(evt) => {
                                                if (evt.currentTarget.value !== '') {
                                                    setFieldValue(KursFormFields.annenInstitusjon, false);
                                                    setFieldValue(KursFormFields.navnAnnenInstitusjon, '');
                                                }
                                            }}
                                            validate={
                                                annenInstitusjon
                                                    ? undefined
                                                    : getStringValidator({
                                                          required: true,
                                                          minLength: 2,
                                                          maxLength: 100,
                                                      })
                                            }
                                            // description={
                                            //     <ReadMore
                                            //         header={text('steg.kurs.opplæringsinstitusjon.readMore.header')}>
                                            //         <Box marginBlock="0 4">
                                            //             <AppText id="steg.kurs.opplæringsinstitusjon.readMore.content" />
                                            //         </Box>
                                            //     </ReadMore>
                                            // }
                                        />
                                        <Checkbox
                                            name={KursFormFields.annenInstitusjon}
                                            label={'Annen institusjon'}
                                            afterOnChange={(checked) => handleOnAnnenInstitusjonChange(checked)}
                                        />
                                        {annenInstitusjon && (
                                            <TextField
                                                className="mt-4"
                                                name={KursFormFields.navnAnnenInstitusjon}
                                                label="Navn på annen institusjon"
                                                validate={getStringValidator({
                                                    required: true,
                                                    minLength: 2,
                                                    maxLength: 100,
                                                })}
                                                disabled={!values[KursFormFields.annenInstitusjon]}
                                                maxLength={100}
                                            />
                                        )}
                                    </VStack>

                                    <FormikInputGroup
                                        id="kursperioder"
                                        legend="Kursperioder"
                                        hideLegend={true}
                                        name={KursFormFields.kursperioder}
                                        errorPropagation={false}
                                        validate={(perioder: KursperiodeFormValues[]) => {
                                            const ranges = perioder
                                                .map((periode) => {
                                                    const from = ISODateToDate(periode.fom);
                                                    const to = ISODateToDate(periode.tom);
                                                    return from && to ? { from, to } : undefined;
                                                })
                                                .filter((range) => dateRangeUtils.isDateRange(range));
                                            if (!ranges || ranges.length === 0) {
                                                return undefined;
                                            }
                                            /** Perioder overlapper */
                                            if (dateRangeUtils.dateRangesCollide(ranges)) {
                                                return 'kursperioderOverlapper';
                                            }
                                            return undefined;
                                        }}>
                                        <KursperioderFormPart gyldigSøknadsperiode={gyldigSøknadsperiode} />
                                    </FormikInputGroup>

                                    <YesOrNoQuestion
                                        name={KursFormFields.reiserUtenforKursdager}
                                        legend={text('steg.kurs.reiserUtenforKursdager.label')}
                                        validate={getYesOrNoValidator()}
                                        description={<ReiseInfo />}
                                    />
                                    {reiserUtenforKursdager ? (
                                        <FormLayout.QuestionBleedTop>
                                            {søknadsperiode ? (
                                                <ReisedagerFormPart
                                                    reisedager={values[KursFormFields.reisedager] || []}
                                                    disabledDateRanges={disabledDateRanges}
                                                    søknadsperiode={søknadsperiode}
                                                    kursperioder={kursperioder}
                                                />
                                            ) : (
                                                <Alert variant="info">
                                                    <AppText id="steg.kurs.reisedager.førPeriodeLagtTil" />
                                                </Alert>
                                            )}
                                        </FormLayout.QuestionBleedTop>
                                    ) : null}

                                    <YesOrNoQuestion
                                        name={KursFormFields.skalTaUtFerieIPerioden}
                                        legend={text('steg.kurs.skalTaUtFerieIPerioden.label')}
                                        validate={getYesOrNoValidator()}
                                    />

                                    {values[KursFormFields.skalTaUtFerieIPerioden] === YesOrNo.YES && (
                                        <FormLayout.QuestionBleedTop>
                                            <FormLayout.Panel>
                                                <FerieuttakListAndDialog
                                                    labels={{
                                                        addLabel: text('steg.kurs.ferie.addLabel'),
                                                        modalTitle: text('steg.kurs.ferie.modalTitle'),
                                                        listTitle: text('steg.kurs.ferie.listTitle'),
                                                        modalDescription: (
                                                            <AppText id="steg.kurs.ferie.modalDescription" />
                                                        ),
                                                    }}
                                                    name={KursFormFields.ferieuttak}
                                                    minDate={søknadsperiode?.from || gyldigSøknadsperiode.from}
                                                    maxDate={søknadsperiode?.to || gyldigSøknadsperiode.to}
                                                    disabledDateRanges={disabledDateRanges}
                                                    validate={getFerieperioderValidator(kursperioder)}
                                                />
                                            </FormLayout.Panel>
                                        </FormLayout.QuestionBleedTop>
                                    )}
                                </VStack>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default KursStep;
