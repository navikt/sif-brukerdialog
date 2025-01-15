import { Alert, Box, VStack } from '@navikt/ds-react';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { FormikInputGroup, getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { getListValidator, getStringValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
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
    getKursStepInitialValues,
    getKursSøknadsdataFromFormValues,
    getSøknadsperiodeFromKursperioderFormValues,
} from './kursStepUtils';
import { Enkeltdato } from '@navikt/sif-common-forms-ds/src';
import ReisedagerFormPart from './kursperioder-form-part/ReisedagerFormPart';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

export enum KursFormFields {
    opplæringsinstitusjon = 'opplæringsinstitusjon',
    kursperioder = 'kursperioder',
    reiserUtenforKursdager = 'reiserUtenforKursdager',
    reisedager = 'reisedager',
    reisedagerBeskrivelse = 'reisedagerBeskrivelse',
    skalTaUtFerieIPerioden = 'skalTaUtFerieIPerioden',
    ferieuttak = 'ferieuttak',
}

export interface KursFormValues {
    [KursFormFields.opplæringsinstitusjon]?: string;
    [KursFormFields.kursperioder]: Partial<KursperiodeFormValues>[];
    [KursFormFields.reisedager]?: Enkeltdato[];
    [KursFormFields.reisedagerBeskrivelse]?: string;
    [KursFormFields.skalTaUtFerieIPerioden]?: YesOrNo;
    [KursFormFields.ferieuttak]?: Ferieuttak[];
    [KursFormFields.reiserUtenforKursdager]?: YesOrNo;
}

const { FormikWrapper, Form, TextField, YesOrNoQuestion } = getTypedFormComponents<
    KursFormFields,
    KursFormValues,
    ValidationError
>();

const KursStep = () => {
    const { intl, text } = useAppIntl();

    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.KURS;
    const step = getSøknadStepConfigForStep(stepId);

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
                                <VStack gap={'8'}>
                                    <SifGuidePanel>
                                        <p>
                                            <AppText id="steg.kurs.counsellorPanel.avsnitt.1" />
                                        </p>
                                        <p>
                                            <AppText id="steg.kurs.counsellorPanel.avsnitt.2" />
                                        </p>
                                        <p>
                                            <AppText id="steg.kurs.counsellorPanel.avsnitt.3" />
                                        </p>
                                    </SifGuidePanel>

                                    <VStack gap={'4'}>
                                        <TextField
                                            label={text('steg.kurs.opplæringsinstitusjon.label')}
                                            name={KursFormFields.opplæringsinstitusjon}
                                            description={text('steg.kurs.opplæringsinstitusjon.description')}
                                            min={2}
                                            max={50}
                                            validate={getStringValidator({
                                                required: true,
                                                minLength: 2,
                                                maxLength: 50,
                                            })}
                                        />
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
                                            return ranges &&
                                                ranges.length > 1 &&
                                                dateRangeUtils.dateRangesCollide(ranges)
                                                ? 'kursperioderOverlapper'
                                                : undefined;
                                        }}>
                                        <KursperioderFormPart gyldigSøknadsperiode={gyldigSøknadsperiode} />
                                    </FormikInputGroup>

                                    <YesOrNoQuestion
                                        name={KursFormFields.reiserUtenforKursdager}
                                        legend={text('steg.kurs.reiserUtenforKursdager.label')}
                                        validate={getYesOrNoValidator()}
                                        description={
                                            <ExpandableInfo
                                                title={text('steg.kurs.reiserUtenforKursdager.info.tittel')}>
                                                <AppText id="steg.kurs.reiserUtenforKursdager.info.tekst" />
                                            </ExpandableInfo>
                                        }
                                    />
                                    {reiserUtenforKursdager ? (
                                        <FormLayout.QuestionBleedTop>
                                            {søknadsperiode ? (
                                                <ReisedagerFormPart
                                                    disabledDateRanges={disabledDateRanges}
                                                    søknadsperiode={søknadsperiode}
                                                />
                                            ) : (
                                                <Alert variant="info">
                                                    Du må legge inn en søknadsperiode før du kan legge til reisedager.
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
                                                            <>
                                                                <Box>
                                                                    Du kan kun velge dager som du har søkt om
                                                                    opplæringspenger for.
                                                                </Box>
                                                                <Box>
                                                                    Feriedager utenfor søknadsperioden trenger du ikke
                                                                    legge til.
                                                                </Box>
                                                            </>
                                                        ),
                                                    }}
                                                    name={KursFormFields.ferieuttak}
                                                    minDate={søknadsperiode?.from || gyldigSøknadsperiode.from}
                                                    maxDate={søknadsperiode?.to || gyldigSøknadsperiode.to}
                                                    disabledDateRanges={disabledDateRanges}
                                                    validate={getListValidator({ required: true })}
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
