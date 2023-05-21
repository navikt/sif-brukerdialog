import { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { date1YearAgo, DateRange, dateToday } from '@navikt/sif-common-utils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import BostedUtlandListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/bosted-utland/BostedUtlandListAndDialog';
import { fraværDagToFraværDateRange, fraværPeriodeToDateRange } from '@navikt/sif-common-forms-ds/lib/forms/fravær';
import FraværDagerListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/fravær/FraværDagerListAndDialog';
import FraværPerioderListAndDialog from '@navikt/sif-common-forms-ds/lib/forms/fravær/FraværPerioderListAndDialog';
import { getFraværDagerValidator, getFraværPerioderValidator } from './fraværFieldValidations';
import { FraværDag, FraværPeriode } from '@navikt/sif-common-forms-ds/lib/forms/fravær/types';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/lib/forms/utenlandsopphold/types';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds/lib/components/getTypedFormComponents';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import actionsCreator from '../../context/action/actionCreator';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import SøknadStep from '../../SøknadStep';
import fraværStepUtils, { getFraværStepInitialValues, getFraværSøknadsdataFromFormValues } from './FraværStepUtils';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import FraværStepInfo from './FraværStepInfo';
import { Alert } from '@navikt/ds-react';
import { FormikValuesObserver } from '@navikt/sif-common-formik-ds/lib';

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
    const intl = useIntl();
    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.FRAVÆR;
    const step = getSøknadStepConfigForStep(søknadsdata, stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

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
        }
    );

    const harUtvidetRettFor =
        søknadsdata.dineBarn && søknadsdata.dineBarn.type === 'alleBarnEldre12år'
            ? søknadsdata.dineBarn.harUtvidetRettFor
            : [];

    const fraværDagerFromSøknadsdata =
        søknadsdata &&
        søknadsdata.fravaer &&
        (søknadsdata.fravaer.type === 'harKunDelvisFravær' || søknadsdata.fravaer.type === 'harFulltOgDelvisFravær')
            ? søknadsdata.fravaer.fraværDager
            : [];

    const fraværPerioderFromSøknadsdata =
        søknadsdata &&
        søknadsdata.fravaer &&
        (søknadsdata.fravaer.type === 'harKunFulltFravær' || søknadsdata.fravaer.type === 'harFulltOgDelvisFravær')
            ? søknadsdata.fravaer.fraværPerioder
            : [];

    const [årstall, setÅrstall] = useState<number | undefined>();
    const [gyldigTidsrom, setGyldigTidsrom] = useState<DateRange>(
        fraværStepUtils.getTidsromFromÅrstall(
            fraværStepUtils.getÅrstallFromFravær(fraværDagerFromSøknadsdata, fraværPerioderFromSøknadsdata)
        )
    );
    const updateÅrstall = useCallback(
        (årstall: number | undefined) => {
            setÅrstall(årstall);
            setGyldigTidsrom(fraværStepUtils.getTidsromFromÅrstall(årstall));
        },
        [setÅrstall]
    );
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
                    const førsteOgSisteDagMedFravær = fraværStepUtils.getPeriodeBoundaries(fraværPerioder, fraværDager);

                    const kanIkkeFortsette =
                        harPerioderMedFravær === YesOrNo.NO && harDagerMedDelvisFravær === YesOrNo.NO;
                    const harRegistrertFravær = fraværDager.length + fraværPerioder.length > 0;
                    const søkerHarBarnMedUtvidetRett = harUtvidetRettFor.length > 0;
                    const minDateForFravær = harRegistrertFravær ? gyldigTidsrom.from : date1YearAgo;
                    const maxDateForFravær = harRegistrertFravær ? gyldigTidsrom.to : dateToday;
                    return (
                        <>
                            <FormikValuesObserver
                                onChange={() => {
                                    const nyttÅrstall = fraværStepUtils.getÅrstallFromFravær(
                                        fraværDager,
                                        fraværPerioder
                                    );
                                    if (nyttÅrstall !== årstall) {
                                        updateÅrstall(nyttÅrstall);
                                    }
                                }}
                            />
                            <PersistStepFormValues stepId={stepId} />
                            <Form
                                formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}
                                includeValidationSummary={true}
                                submitPending={isSubmitting}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <FormBlock>
                                    <FraværStepInfo.IntroVeileder />
                                </FormBlock>
                                <FormBlock>
                                    <Block title={intlHelper(intl, 'step.fravaer.dager.tittel')}>
                                        <p>
                                            {søkerHarBarnMedUtvidetRett ? (
                                                <FormattedMessage id="step.fravaer.dager.info.harBarnMedUtvidetRett" />
                                            ) : (
                                                <FormattedMessage id="step.fravaer.dager.info" />
                                            )}
                                        </p>
                                        <FormBlock>
                                            <YesOrNoQuestion
                                                name={FraværFormFields.harPerioderMedFravær}
                                                legend={intlHelper(intl, 'step.fravaer.spm.harPerioderMedFravær')}
                                                validate={getYesOrNoValidator()}
                                            />
                                        </FormBlock>
                                        {/* DAGER MED FULLT FRAVÆR*/}
                                        {harPerioderMedFravær === YesOrNo.YES && (
                                            <>
                                                <FormBlock margin="l">
                                                    <FraværPerioderListAndDialog<FraværFormFields>
                                                        name={FraværFormFields.fraværPerioder}
                                                        periodeDescription={<FraværStepInfo.Tidsbegrensning />}
                                                        minDate={minDateForFravær}
                                                        maxDate={maxDateForFravær}
                                                        validate={getFraværPerioderValidator({ fraværDager, årstall })}
                                                        labels={{
                                                            listTitle: intlHelper(
                                                                intl,
                                                                'step.fravaer.harPerioderMedFravær.listTitle'
                                                            ),
                                                            addLabel: intlHelper(
                                                                intl,
                                                                'step.fravaer.harPerioderMedFravær.addLabel'
                                                            ),
                                                            modalTitle: intlHelper(
                                                                intl,
                                                                'step.fravaer.harPerioderMedFravær.modalTitle'
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
                                                legend={intlHelper(intl, 'step.fravaer.spm.harDagerMedDelvisFravær')}
                                                validate={getYesOrNoValidator()}
                                            />
                                        </FormBlock>
                                        {/* DAGER MED DELVIS FRAVÆR*/}
                                        {harDagerMedDelvisFravær === YesOrNo.YES && (
                                            <>
                                                <FormBlock margin="l">
                                                    <FraværDagerListAndDialog<FraværFormFields>
                                                        name={FraværFormFields.fraværDager}
                                                        dagDescription={<FraværStepInfo.Tidsbegrensning />}
                                                        minDate={minDateForFravær}
                                                        maxDate={maxDateForFravær}
                                                        validate={getFraværDagerValidator({ fraværPerioder, årstall })}
                                                        labels={{
                                                            listTitle: intlHelper(
                                                                intl,
                                                                'step.fravaer.harDagerMedDelvisFravær.listTitle'
                                                            ),
                                                            addLabel: intlHelper(
                                                                intl,
                                                                'step.fravaer.harDagerMedDelvisFravær.addLabel'
                                                            ),
                                                            modalTitle: intlHelper(
                                                                intl,
                                                                'step.fravaer.harDagerMedDelvisFravær.modalTitle'
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
                                                    <FormattedMessage id="step.fravaer.måVelgeSituasjon" />
                                                </Alert>
                                            </FormBlock>
                                        )}
                                    </Block>
                                </FormBlock>
                                {kanIkkeFortsette === false && (
                                    <>
                                        <Block title={intlHelper(intl, 'step.fravaer.utenlandsopphold.tittel')}>
                                            <YesOrNoQuestion
                                                name={FraværFormFields.perioder_harVærtIUtlandet}
                                                legend={intlHelper(
                                                    intl,
                                                    'step.fravaer.har_du_oppholdt_deg_i_utlandet_for_dager_du_soker_ok.spm'
                                                )}
                                                validate={getYesOrNoValidator()}
                                            />
                                            {perioder_harVærtIUtlandet === YesOrNo.YES && (
                                                <FormBlock margin="l">
                                                    <BostedUtlandListAndDialog<FraværFormFields>
                                                        name={FraværFormFields.perioder_utenlandsopphold}
                                                        minDate={førsteOgSisteDagMedFravær.min || gyldigTidsrom.from}
                                                        maxDate={førsteOgSisteDagMedFravær.max || gyldigTidsrom.to}
                                                        labels={{
                                                            addLabel: intlHelper(
                                                                intl,
                                                                'step.fravaer.utenlandsopphold.addLabel'
                                                            ),
                                                            modalTitle: intlHelper(
                                                                intl,
                                                                'step.fravaer.utenlandsopphold.modalTitle'
                                                            ),
                                                        }}
                                                        validate={getListValidator({ required: true })}
                                                    />
                                                </FormBlock>
                                            )}
                                        </Block>
                                    </>
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
