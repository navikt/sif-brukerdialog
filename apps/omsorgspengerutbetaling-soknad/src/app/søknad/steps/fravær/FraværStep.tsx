import { Alert, Heading } from '@navikt/ds-react';
import { useEffect } from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { FormikValuesObserver } from '@navikt/sif-common-formik-ds';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/src/components/getTypedFormComponents';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import BostedUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/bosted-utland/BostedUtlandListAndDialog';
import { fraværDagToFraværDateRange, fraværPeriodeToDateRange } from '@navikt/sif-common-forms-ds/src/forms/fravær';
import FraværDagerListAndDialog from '@navikt/sif-common-forms-ds/src/forms/fravær/FraværDagerListAndDialog';
import FraværPerioderListAndDialog from '@navikt/sif-common-forms-ds/src/forms/fravær/FraværPerioderListAndDialog';
import { FraværDag, FraværPeriode } from '@navikt/sif-common-forms-ds/src/forms/fravær/types';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { date1YearAgo, dateToday } from '@navikt/sif-common-utils';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { usePersistTempFormValues } from '../../../hooks/usePersistTempFormValues';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import { AppText, useAppIntl } from '../../../i18n';
import { StepId } from '../../../types/StepId';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import actionsCreator from '../../context/action/actionCreator';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import SøknadStep from '../../SøknadStep';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { getFraværDagerValidator, getFraværPerioderValidator } from './fraværFieldValidations';
import FraværStepInfo from './FraværStepInfo';
import fraværStepUtils, { getFraværStepInitialValues, getFraværSøknadsdataFromFormValues } from './FraværStepUtils';
import OmsorgsdagerInfo from './OmsorgsdagerInfo';
import { useFraværsperiodeDetaljer } from './useFraværsperiodeDetaljer';

export enum FraværFormFields {
    harPerioderMedFravær = 'harPerioderMedFravær',
    harDagerMedDelvisFravær = 'harDagerMedDelvisFravær',
    fraværPerioder = 'fraværPerioder',
    fraværDager = 'fraværDager',
    perioder_harVærtIUtlandet = 'perioder_harVærtIUtlandet',
    perioder_utenlandsopphold = 'perioder_utenlandsopphold',
}

export interface FraværFormValues {
    [FraværFormFields.harPerioderMedFravær]: YesOrNo;
    [FraværFormFields.fraværPerioder]: FraværPeriode[];
    [FraværFormFields.harDagerMedDelvisFravær]: YesOrNo;
    [FraværFormFields.fraværDager]: FraværDag[];
    [FraværFormFields.perioder_harVærtIUtlandet]: YesOrNo;
    [FraværFormFields.perioder_utenlandsopphold]: Utenlandsopphold[];
}

const { FormikWrapper, Form, YesOrNoQuestion } = getTypedFormComponents<
    FraværFormFields,
    FraværFormValues,
    ValidationError
>();

const FraværStep = () => {
    const appIntl = useAppIntl();
    const { text, intl } = appIntl;
    const {
        state: { søknadsdata, tempFormData },
    } = useSøknadContext();

    const stepId = StepId.FRAVÆR;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const { invalidSteps } = useSøknadsdataStatus(stepId, getSøknadStepConfig(søknadsdata));
    const hasInvalidSteps = invalidSteps.length > 0;

    const onValidSubmitHandler = (values: FraværFormValues) => {
        const fraværSøknadsdata = getFraværSøknadsdataFromFormValues(values);
        if (fraværSøknadsdata) {
            clearStepFormValues(stepId);
            return [actionsCreator.setSøknadFravær(fraværSøknadsdata)];
        }
        return [];
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        stepId,
        (state: SøknadContextState) => {
            return lagreSøknadState(state);
        },
    );

    const { årstall, gyldigTidsrom, setFraværsår } = useFraværsperiodeDetaljer(søknadsdata.fravaer);

    const { persistTempFormValues } = usePersistTempFormValues();

    useEffect(() => {
        if (tempFormData?.stepId === StepId.DINE_BARN) {
            persistTempFormValues();
        }
    }, [persistTempFormValues, tempFormData]);

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getFraværStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({
                    values: {
                        harPerioderMedFravær,
                        harDagerMedDelvisFravær,
                        perioder_harVærtIUtlandet,
                        fraværDager = [],
                        fraværPerioder = [],
                    },
                }) => {
                    const førsteOgSisteDagMedFravær = søknadsdata.fravaer?.førsteOgSisteDagMedFravær;
                    const kanIkkeFortsette =
                        harPerioderMedFravær === YesOrNo.NO && harDagerMedDelvisFravær === YesOrNo.NO;
                    const harRegistrertFravær = fraværDager.length + fraværPerioder.length > 0;
                    const minDateForFravær = harRegistrertFravær ? gyldigTidsrom.from : date1YearAgo;
                    const maxDateForFravær = harRegistrertFravær ? gyldigTidsrom.to : dateToday;
                    return (
                        <>
                            <FormikValuesObserver
                                onChange={() => {
                                    const nyttÅrstall = fraværStepUtils.getÅrstallFromFravær(
                                        fraværDager,
                                        fraværPerioder,
                                    );
                                    if (nyttÅrstall !== årstall) {
                                        setFraværsår(nyttÅrstall);
                                    }
                                }}
                            />
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}
                                submitDisabled={isSubmitting || hasInvalidSteps || kanIkkeFortsette}>
                                <SifGuidePanel>
                                    <OmsorgsdagerInfo dineBarn={søknadsdata.dineBarn} />
                                </SifGuidePanel>

                                <FormBlock>
                                    <FormBlock>
                                        <Block margin="m">
                                            <YesOrNoQuestion
                                                name={FraværFormFields.harPerioderMedFravær}
                                                legend={text('step.fravaer.spm.harPerioderMedFravær')}
                                                validate={getYesOrNoValidator()}
                                                data-testid="harPerioderMedFravær"
                                            />
                                        </Block>
                                        {/* DAGER MED FULLT FRAVÆR*/}
                                        {harPerioderMedFravær === YesOrNo.YES && (
                                            <>
                                                <FormBlock margin="l">
                                                    <FraværPerioderListAndDialog<FraværFormFields>
                                                        name={FraværFormFields.fraværPerioder}
                                                        periodeDescription={FraværStepInfo.Tidsbegrensning(appIntl)}
                                                        minDate={minDateForFravær}
                                                        maxDate={maxDateForFravær}
                                                        validate={getFraværPerioderValidator({ fraværDager, årstall })}
                                                        labels={{
                                                            listTitle: text(
                                                                'step.fravaer.harPerioderMedFravær.listTitle',
                                                            ),
                                                            addLabel: text(
                                                                'step.fravaer.harPerioderMedFravær.addLabel',
                                                            ),
                                                            modalTitle: text(
                                                                'step.fravaer.harPerioderMedFravær.modalTitle',
                                                            ),
                                                        }}
                                                        dateRangesToDisable={[
                                                            ...fraværPerioder.map(fraværPeriodeToDateRange),
                                                            ...fraværDager.map(fraværDagToFraværDateRange),
                                                        ]}
                                                        helgedagerIkkeTillat={true}
                                                    />
                                                </FormBlock>
                                            </>
                                        )}
                                        <FormBlock>
                                            <YesOrNoQuestion
                                                name={FraværFormFields.harDagerMedDelvisFravær}
                                                legend={text('step.fravaer.spm.harDagerMedDelvisFravær')}
                                                validate={getYesOrNoValidator()}
                                                data-testid="harDagerMedDelvisFravær"
                                            />
                                        </FormBlock>
                                        {/* DAGER MED DELVIS FRAVÆR*/}
                                        {harDagerMedDelvisFravær === YesOrNo.YES && (
                                            <>
                                                <FormBlock margin="l">
                                                    <FraværDagerListAndDialog<FraværFormFields>
                                                        name={FraværFormFields.fraværDager}
                                                        dagDescription={FraværStepInfo.Tidsbegrensning(appIntl, true)}
                                                        minDate={minDateForFravær}
                                                        maxDate={maxDateForFravær}
                                                        validate={getFraværDagerValidator({ fraværPerioder, årstall })}
                                                        labels={{
                                                            listTitle: text(
                                                                'step.fravaer.harDagerMedDelvisFravær.listTitle',
                                                            ),
                                                            addLabel: text(
                                                                'step.fravaer.harDagerMedDelvisFravær.addLabel',
                                                            ),
                                                            modalTitle: text(
                                                                'step.fravaer.harDagerMedDelvisFravær.modalTitle',
                                                            ),
                                                        }}
                                                        dateRangesToDisable={[
                                                            ...fraværDager.map(fraværDagToFraværDateRange),
                                                            ...fraværPerioder.map(fraværPeriodeToDateRange),
                                                        ]}
                                                        helgedagerIkkeTillatt={true}
                                                        maksArbeidstidPerDag={24}
                                                    />
                                                </FormBlock>
                                            </>
                                        )}
                                        {kanIkkeFortsette && (
                                            <FormBlock margin="xxl">
                                                <Alert variant="warning">
                                                    <AppText id="step.fravaer.måVelgeSituasjon" />
                                                </Alert>
                                            </FormBlock>
                                        )}
                                    </FormBlock>
                                </FormBlock>
                                {kanIkkeFortsette === false && (
                                    <FormBlock margin="xl">
                                        <Heading level="2" size="medium">
                                            <AppText id="step.fravaer.utenlandsopphold.tittel" />
                                        </Heading>
                                        <Block margin="l">
                                            <YesOrNoQuestion
                                                name={FraværFormFields.perioder_harVærtIUtlandet}
                                                legend={text(
                                                    'step.fravaer.har_du_oppholdt_deg_i_utlandet_for_dager_du_soker_ok.spm',
                                                )}
                                                validate={getYesOrNoValidator()}
                                                data-testid="perioder_harVærtIUtlandet"
                                            />
                                        </Block>

                                        {perioder_harVærtIUtlandet === YesOrNo.YES && (
                                            <FormBlock margin="m">
                                                <BostedUtlandListAndDialog<FraværFormFields>
                                                    name={FraværFormFields.perioder_utenlandsopphold}
                                                    minDate={førsteOgSisteDagMedFravær?.from || gyldigTidsrom.from}
                                                    maxDate={førsteOgSisteDagMedFravær?.to || gyldigTidsrom.to}
                                                    labels={{
                                                        addLabel: text('step.fravaer.utenlandsopphold.addLabel'),
                                                        modalTitle: text('step.fravaer.utenlandsopphold.modalTitle'),
                                                    }}
                                                    validate={getListValidator({ required: true })}
                                                />
                                            </FormBlock>
                                        )}
                                    </FormBlock>
                                )}
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default FraværStep;
