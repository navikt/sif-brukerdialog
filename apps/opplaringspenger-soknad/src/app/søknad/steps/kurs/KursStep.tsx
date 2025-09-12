import { Alert, Box, ReadMore } from '@navikt/ds-react';
import {
    FormikInputGroup,
    getIntlFormErrorHandler,
    getTypedFormComponents,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
import { Enkeltdato, Ferieuttak, UtenlandsoppholdEnkel } from '@navikt/sif-common-forms-ds/src';
import FerieuttakListAndDialog from '@navikt/sif-common-forms-ds/src/forms/ferieuttak/FerieuttakListAndDialog';
import UtenlandsoppholdListAndDialog from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/UtenlandsoppholdListAndDialog';
import { FormLayout } from '@navikt/sif-common-ui';
import { dateRangeUtils, getDateRangesBetweenDateRangesWithinDateRange, ISODateToDate } from '@navikt/sif-common-utils';
import { getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
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
import GodkjentHelseinstitusjonInfo from './GodkjentHelseinstitusjonInfo';
import { KursperiodeFormValues } from './kursperioder-form-part/KursperiodeQuestions';
import KursperioderFormPart from './kursperioder-form-part/KursperioderFormPart';
import {
    getDateRangesFromKursperiodeFormValues,
    getFerieperioderValidator,
    getKursStepInitialValues,
    getKursSøknadsdataFromFormValues,
    getSøknadsperiodeFromKursperioderFormValues,
    getUtenlandsoppholdValidator,
} from './kursStepUtils';
import ReisedagerFormPart from './ReisedagerFormPart';
import ReiseInfo from './ReiseInfo';

export enum KursFormFields {
    opplæringsinstitusjon = 'opplæringsinstitusjon',
    kursperioder = 'kursperioder',
    reiserUtenforKursdager = 'reiserUtenforKursdager',
    reisedager = 'reisedager',
    reisedagerBeskrivelse = 'reisedagerBeskrivelse',
    skalTaUtFerieIPerioden = 'skalTaUtFerieIPerioden',
    ferieuttak = 'ferieuttak',
    skalOppholdeSegIUtlandetIPerioden = 'skalOppholdeSegIUtlandetIPerioden',
    utenlandsoppholdIPerioden = 'utenlandsoppholdIPerioden',
}

export interface KursFormValues {
    [KursFormFields.opplæringsinstitusjon]?: string;
    [KursFormFields.kursperioder]: Array<Partial<KursperiodeFormValues>>;
    [KursFormFields.reisedager]?: Enkeltdato[];
    [KursFormFields.reisedagerBeskrivelse]?: string;
    [KursFormFields.skalTaUtFerieIPerioden]?: YesOrNo;
    [KursFormFields.ferieuttak]?: Ferieuttak[];
    [KursFormFields.reiserUtenforKursdager]?: YesOrNo;
    [KursFormFields.skalOppholdeSegIUtlandetIPerioden]?: YesOrNo;
    [KursFormFields.utenlandsoppholdIPerioden]?: UtenlandsoppholdEnkel[];
}

const { FormikWrapper, Form, YesOrNoQuestion, Combobox } = getTypedFormComponents<
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
        const kursSøknadsdata = getKursSøknadsdataFromFormValues(values);
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
                renderForm={({ values }) => {
                    const søknadsperiode = getSøknadsperiodeFromKursperioderFormValues(values.kursperioder);
                    const kursperioder = getDateRangesFromKursperiodeFormValues(values.kursperioder);
                    const reiserUtenforKursdager = values[KursFormFields.reiserUtenforKursdager] === YesOrNo.YES;
                    const skalOppholdeSegIUtlandetIPerioden =
                        values[KursFormFields.skalOppholdeSegIUtlandetIPerioden] === YesOrNo.YES;

                    const disabledDateRanges = søknadsperiode
                        ? getDateRangesBetweenDateRangesWithinDateRange(
                              søknadsperiode.from,
                              søknadsperiode.to,
                              kursperioder,
                          )
                        : [];

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
                                <FormLayout.Guide>
                                    <AppText id="steg.kurs.counsellorPanel.avsnitt.1" />

                                    <p>
                                        <AppText id="steg.kurs.counsellorPanel.avsnitt.2" />
                                    </p>
                                    <GodkjentHelseinstitusjonInfo />
                                </FormLayout.Guide>

                                <FormLayout.Questions>
                                    <Combobox
                                        name={KursFormFields.opplæringsinstitusjon}
                                        allowNewValues={true}
                                        label={text('steg.kurs.opplæringsinstitusjon.label')}
                                        options={institusjonsnavn}
                                        shouldAutocomplete={false}
                                        maxLength={90}
                                        minLength={2}
                                        isMultiSelect={false}
                                        initialValue={values[KursFormFields.opplæringsinstitusjon]}
                                        validate={getStringValidator({
                                            required: true,
                                            minLength: 2,
                                            maxLength: 100,
                                        })}
                                        description={
                                            <ReadMore header={text('steg.kurs.opplæringsinstitusjon.readMore.header')}>
                                                <Box marginBlock="0 4">
                                                    <AppText id="steg.kurs.opplæringsinstitusjon.readMore.content" />
                                                </Box>
                                            </ReadMore>
                                        }
                                    />

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

                                    <YesOrNoQuestion
                                        legend={text('steg.kurs.utenlandsopphold.spm')}
                                        name={KursFormFields.skalOppholdeSegIUtlandetIPerioden}
                                        validate={getYesOrNoValidator()}
                                    />

                                    {skalOppholdeSegIUtlandetIPerioden && (
                                        <FormLayout.Panel bleedTop={true}>
                                            <UtenlandsoppholdListAndDialog<KursFormFields>
                                                name={KursFormFields.utenlandsoppholdIPerioden}
                                                minDate={søknadsperiode?.from || gyldigSøknadsperiode.from}
                                                maxDate={søknadsperiode?.to || gyldigSøknadsperiode.to}
                                                variant="enkel"
                                                labels={{
                                                    modalTitle: text('steg.kurs.utenlandsopphold.modalTitle'),
                                                    listTitle: text('steg.kurs.utenlandsopphold.listTitle'),
                                                    addLabel: text('steg.kurs.utenlandsopphold.addLabel'),
                                                }}
                                                disabledDateRanges={disabledDateRanges}
                                                validate={getUtenlandsoppholdValidator(kursperioder)}
                                            />
                                        </FormLayout.Panel>
                                    )}
                                </FormLayout.Questions>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default KursStep;
