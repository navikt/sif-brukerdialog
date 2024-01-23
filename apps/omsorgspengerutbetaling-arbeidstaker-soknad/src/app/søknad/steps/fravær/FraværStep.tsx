import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
    getFraværStepInitialValues,
    getFraværSøknadsdataFromFormValues,
    getOrganisasjonsnummerKey,
} from './fraværStepUtils';
import { useCallback, useState } from 'react';
import { FraværMap } from '../../../types/FraværTypes';
import {
    DateRange,
    FormikValuesObserver,
    ValidationError,
    YesOrNo,
    getTypedFormComponents,
} from '@navikt/sif-common-formik-ds';
import { useSøknadContext } from '../../context/hooks/useSøknadContext';
import { StepId } from '../../../types/StepId';
import { getSøknadStepConfig, getSøknadStepConfigForStep } from '../../søknadStepConfig';
import { useStepNavigation } from '../../../hooks/useStepNavigation';
import { useStepFormValuesContext } from '../../context/StepFormValuesContext';
import { useSøknadsdataStatus } from '../../../hooks/useSøknadsdataStatus';
import actionsCreator from '../../context/action/actionCreator';
import { useOnValidSubmit } from '../../../hooks/useOnValidSubmit';
import { SøknadContextState } from '../../../types/SøknadContextState';
import { lagreSøknadState } from '../../../utils/lagreSøknadState';
import { date1YearAgo, dateToday } from '@navikt/sif-common-utils';
import { Utenlandsopphold } from '@navikt/sif-common-forms-ds/src/forms/utenlandsopphold/types';
import { ArbeidforholdSøknadsdata } from '../../../types/søknadsdata/SituasjonSøknadsdata';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import FormSection from '../../../components/form-section/FormSection';
import { Office1 } from '@navikt/ds-icons';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import BostedUtlandListAndDialog from '@navikt/sif-common-forms-ds/src/forms/bosted-utland/BostedUtlandListAndDialog';
import SøknadStep from '../../SøknadStep';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import PersistStepFormValues from '../../../components/persist-step-form-values/PersistStepFormValues';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import {
    getAlleFraværDager,
    getAlleFraværDagerFromSøknadsdata,
    getAlleFraværPerioder,
    getAlleFraværPerioderFromSøknadsdata,
    getTidsromFromÅrstall,
    getÅrstallFromFravær,
} from '../../../utils/fraværUtils';
import ArbeidsforholdFravær from './form-parts/ArbeidsforholdFravær';

export enum FraværStepFormFields {
    fravær = 'fravær',
    perioderHarVærtIUtlandet = 'perioderHarVærtIUtlandet',
    perioderUtenlandsopphold = 'perioderUtenlandsopphold',
}

export interface FraværStepFormValues {
    [FraværStepFormFields.fravær]: FraværMap;
    [FraværStepFormFields.perioderHarVærtIUtlandet]: YesOrNo;
    [FraværStepFormFields.perioderUtenlandsopphold]: Utenlandsopphold[];
}

const { FormikWrapper, Form, YesOrNoQuestion } = getTypedFormComponents<
    FraværStepFormFields,
    FraværStepFormValues,
    ValidationError
>();

const FraværStep: React.FC = () => {
    const intl = useIntl();

    const {
        state: { søknadsdata },
    } = useSøknadContext();

    const stepId = StepId.FRAVÆR;
    const step = getSøknadStepConfigForStep(stepId);

    const { goBack } = useStepNavigation(step);

    const { stepFormValues, clearStepFormValues } = useStepFormValuesContext();

    const { invalidSteps } = useSøknadsdataStatus(stepId, getSøknadStepConfig());
    const hasInvalidSteps = invalidSteps.length > 0;

    const onValidSubmitHandler = (values: FraværStepFormValues) => {
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

    const { situasjon } = søknadsdata;

    if (!situasjon) {
        return undefined;
    }

    const arbeidsforholdliste = Object.values(situasjon).filter(
        (forhold) => forhold.type !== 'harIkkeHattFravær' && forhold.type !== 'harHattFraværMedLønn',
    );

    const fraværDagerFromSøknadsdata =
        søknadsdata && søknadsdata.fravær?.fravær ? getAlleFraværDagerFromSøknadsdata(søknadsdata.fravær.fravær) : [];

    const fraværPerioderFromSøknadsdata =
        søknadsdata && søknadsdata.fravær ? getAlleFraværPerioderFromSøknadsdata(søknadsdata.fravær?.fravær) : [];

    //TODO
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [årstall, setÅrstall] = useState<number | undefined>();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [gyldigTidsrom, setGyldigTidsrom] = useState<DateRange>(
        getTidsromFromÅrstall(getÅrstallFromFravær(fraværDagerFromSøknadsdata, fraværPerioderFromSøknadsdata)),
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const updateÅrstall = useCallback(
        (årstall: number | undefined) => {
            setÅrstall(årstall);
            setGyldigTidsrom(getTidsromFromÅrstall(årstall));
        },
        [setÅrstall],
    );

    return (
        <SøknadStep stepId={stepId}>
            <FormikWrapper
                initialValues={getFraværStepInitialValues(søknadsdata, stepFormValues[stepId])}
                onSubmit={handleSubmit}
                renderForm={({ values }) => {
                    if (!values.fravær) {
                        return undefined;
                    }
                    const fravær = values.fravær;

                    const fraværDager = getAlleFraværDager(fravær);
                    const fraværPerioder = getAlleFraværPerioder(fravær);
                    const harRegistrertFravær = fraværDager.length + fraværPerioder.length > 0;
                    const minDateForFravær = harRegistrertFravær ? gyldigTidsrom.from : date1YearAgo;
                    const maxDateForFravær = harRegistrertFravær ? gyldigTidsrom.to : dateToday;

                    return (
                        <>
                            <FormikValuesObserver
                                onChange={() => {
                                    const nyttÅrstall = getÅrstallFromFravær(fraværDager, fraværPerioder);
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
                                submitDisabled={isSubmitting || hasInvalidSteps}
                                onBack={goBack}
                                runDelayedFormValidation={true}>
                                <FormBlock>
                                    <SifGuidePanel>
                                        <FormattedMessage id={'step.fravær.info.1'} />
                                        <Block margin={'m'}>
                                            <FormattedMessage
                                                id={'step.fravær.info.2'}
                                                values={{
                                                    strong: (msg): React.ReactNode => <strong>{msg}</strong>,
                                                }}
                                            />
                                        </Block>
                                    </SifGuidePanel>
                                </FormBlock>
                                {arbeidsforholdliste && arbeidsforholdliste.length > 0 && (
                                    <FormBlock margin="xxl">
                                        {arbeidsforholdliste.map((forhold: ArbeidforholdSøknadsdata) => {
                                            return (
                                                <FormBlock
                                                    margin="l"
                                                    key={forhold.organisasjonsnummer}
                                                    data-testid="arbeidsforhold-liste">
                                                    <FormSection
                                                        titleTag="h2"
                                                        title={forhold.navn || forhold.organisasjonsnummer}
                                                        titleIcon={<Office1 role="presentation" aria-hidden={true} />}>
                                                        <ArbeidsforholdFravær
                                                            fravær={
                                                                fravær[
                                                                    getOrganisasjonsnummerKey(
                                                                        forhold.organisasjonsnummer,
                                                                    )
                                                                ]
                                                            }
                                                            parentFieldName={`${
                                                                FraværStepFormFields.fravær
                                                            }.${getOrganisasjonsnummerKey(
                                                                forhold.organisasjonsnummer,
                                                            )}`}
                                                            minDateForFravær={minDateForFravær}
                                                            maxDateForFravær={maxDateForFravær}
                                                            årstall={årstall}
                                                        />
                                                    </FormSection>
                                                </FormBlock>
                                            );
                                        })}
                                    </FormBlock>
                                )}

                                <FormSection title={intlHelper(intl, 'step.fravær.utenlandsopphold.tittel')}>
                                    <YesOrNoQuestion
                                        name={FraværStepFormFields.perioderHarVærtIUtlandet}
                                        legend={intlHelper(intl, 'step.fravær.værtIUtlandet.spm')}
                                        validate={getYesOrNoValidator()}
                                        data-testid="utenlandsopphold"
                                    />

                                    {values.perioderHarVærtIUtlandet === YesOrNo.YES && (
                                        <FormBlock margin="m">
                                            <BostedUtlandListAndDialog<FraværStepFormFields>
                                                name={FraværStepFormFields.perioderUtenlandsopphold}
                                                minDate={date1YearAgo}
                                                maxDate={dateToday}
                                                labels={{
                                                    addLabel: intlHelper(
                                                        intl,
                                                        'step.fravær.værtIUtlandet.leggTilLabel',
                                                    ),
                                                    modalTitle: intlHelper(
                                                        intl,
                                                        'step.fravær.værtIUtlandet.modalTittel',
                                                    ),
                                                }}
                                                validate={getListValidator({ required: true })}
                                            />
                                        </FormBlock>
                                    )}
                                </FormSection>
                            </Form>
                        </>
                    );
                }}
            />
        </SøknadStep>
    );
};

export default FraværStep;
